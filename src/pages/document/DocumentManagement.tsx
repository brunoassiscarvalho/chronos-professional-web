import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DocumentViewer from './DocumentViewer';
import { Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import PatientSelect from '../../components/molecules/selects/PatientSelect';
import { useOutletContext } from 'react-router-dom';
import { IPatient } from '../../interfaces/Patient';
import DocumentService from './DocumentService';
import { useSnackbar } from 'notistack';
import { IPaper } from '../../interfaces/Paper';
import HttpException from '../../services/HttpException';
import { ChangeEvent, SyntheticEvent, useState } from 'react';

interface IDocumentManagement {
  service?: DocumentService;
}

export default function DocumentManagement({
  service = new DocumentService(),
}: IDocumentManagement) {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState('1');
  const [paper, setPaper] = useState<IPaper>();

  const patient: IPatient = useOutletContext<IPatient>();

  const [selectedPatient, setSelectedPatient] = useState<IPatient>();

  const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaper((oldvalue: any) => ({
      ...oldvalue,
      [event.target.name]: event.target.value,
    }));
  };

  const saveDocument = () => {
    if (paper) {
      service
        .createDocument({ ...paper, patient: selectedPatient })
        .then((res: IPaper) => {
          setPaper(res);
        })
        .catch((err: HttpException) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        })
        .finally(() => {
          setIsloading(false);
        });
    }
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabValue}>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
            >
              <Tab label="Editar" value="1" />
              <Tab label="Visualizar" value="2" />
            </TabList>
          </Box>
          <Stack direction="row" spacing={3}>
            <Button onClick={saveDocument}>Salvar</Button>
            <Button>Concluir</Button>
          </Stack>
        </Box>
        <TabPanel value="1">
          <Stack spacing={3}>
            {!patient && (
              <PatientSelect
                onClick={(patient: IPatient) => setSelectedPatient(patient)}
              />
            )}
            <TextField
              fullWidth
              label="Titulo"
              name="title"
              value={paper?.title}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Texto"
              multiline
              name="text"
              rows={10}
              value={paper?.text}
              onChange={handleChange}
            />
          </Stack>
        </TabPanel>
        <TabPanel value="2">
          <DocumentViewer {...paper} patient={selectedPatient} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
