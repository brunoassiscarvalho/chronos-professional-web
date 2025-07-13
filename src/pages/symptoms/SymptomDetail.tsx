import { useEffect, useState } from 'react';
import Content from '../../components/organisms/Content';
import {
  Accordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps,
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import SymptomService from './SymptomService';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { Symptom } from '../../interfaces/Symptom';
import {
  ArrowForwardIosSharp,
  Delete,
  Edit,
  ExpandMore,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import DialogModal from '../../components/organisms/DialogModal';
import HttpException from '../../services/HttpException';
import SymptomsLevelForm, { ISymtomLevelKey } from './SymptomLevelForm';
import { keyGenerator } from '../../utils/Common';

interface SymptomLevelsKey extends Symptom {
  levels?: ISymtomLevelKey[];
}

interface ISymptomsForm {
  service?: SymptomService;
}

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharp sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function SymptomDetail({
  service = new SymptomService(),
}: ISymptomsForm) {
  const { enqueueSnackbar } = useSnackbar();
  const { symptomId } = useParams<{ symptomId: string }>();

  const [symptom, setSymptom] = useState<SymptomLevelsKey>();
  const [symptomLevel, setSymptomLevel] = useState<ISymtomLevelKey>();
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    if (symptomId)
      service
        .getSymptom(symptomId)
        .then((res: Symptom) => {
          const levelsWithKey: ISymtomLevelKey[] =
            res?.levels?.map((item) => ({ ...item, key: keyGenerator() })) ||
            [];
          setSymptom({ ...res, levels: levelsWithKey });
        })
        .catch((e: HttpException) => {
          enqueueSnackbar(e.message, { variant: 'error' });
        })
        .finally(() => {
          setIsloading(false);
        });
  }, [symptomId]);

  const onSaveSymptomLevel = (symptomLevelItem: ISymtomLevelKey) => {
    const currentSymptomLevel = Number(symptomLevelItem.level);
    if (!symptom) return;
    const prevSymptom: SymptomLevelsKey = { ...symptom };

    if (prevSymptom?.levels)
      if (!prevSymptom.levels?.length) {
        prevSymptom.levels = [{ ...symptomLevelItem }];
      } else if (currentSymptomLevel === prevSymptom.levels?.length + 1) {
        prevSymptom.levels.push(symptomLevelItem);
      } else if (currentSymptomLevel <= prevSymptom.levels?.length) {
        prevSymptom.levels = prevSymptom.levels.reduce(
          (prevSymtomLevel, currentSymtomLevelItem, index) => {
            if (Number(currentSymtomLevelItem.level) === currentSymptomLevel) {
              prevSymtomLevel[index] = {
                ...symptomLevelItem,
                key: keyGenerator(),
              };
            }
            return prevSymtomLevel;
          },
          prevSymptom.levels,
        );
      }
    setSymptom({ ...prevSymptom });
    setSymptomLevel(undefined);
  };

  return (
    <Content
      title="Cadastro de sintomas"
      isLoading={isLoading}
      loadingListSize={5}
      maxWidth={1000}
    >
      <Stack spacing={3}>
        <Typography variant="h4">{symptom?.title}</Typography>
        <Typography>{symptom?.description}</Typography>
        <Box>
          {symptom?.levels?.map(
            ({ _id, level, resume, advisement, key }: ISymtomLevelKey) => (
              <Accordion key={key}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>{`Nível ${level} - ${resume}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={3}>
                    <Typography>{advisement}</Typography>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={3}
                    >
                      <Button
                        color="secondary"
                        onClick={() =>
                          setSymptomLevel({
                            _id,
                            level,
                            resume,
                            advisement,
                            key,
                          })
                        }
                        startIcon={<Edit />}
                      >
                        Editar
                      </Button>
                    </Stack>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ),
          )}
        </Box>
        <Box>
          <Button
            onClick={() =>
              setSymptomLevel({
                resume: '',
                advisement: '',
                level: symptom?.levels?.length ? symptom.levels.length + 1 : 1,
                key: keyGenerator(),
              })
            }
          >
            + Nivel
          </Button>
        </Box>
      </Stack>
      <DialogModal
        title="Alteração de sintoma"
        open={!!symptomLevel}
        onClose={() => setSymptomLevel(undefined)}
      >
        {symptomLevel && (
          <SymptomsLevelForm
            symptomLevel={symptomLevel}
            onSave={onSaveSymptomLevel}
          />
        )}
      </DialogModal>
    </Content>
  );
}
