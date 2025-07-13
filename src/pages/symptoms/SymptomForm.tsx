import { useEffect, useState } from 'react';
import InputText from '../../components/molecules/inputs/InputText';
import Content from '../../components/organisms/Content';
import SmartForm from '../../components/organisms/form/SmartForm';
import * as Yup from 'yup';
import { Button, Stack } from '@mui/material';
import SymptomService from './SymptomService';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import HttpException from '../../services/HttpException';
import { Symptom } from '../../interfaces/Symptom';

const validationSchema: Yup.AnyObjectSchema = Yup.object({
  title: Yup.string().required('Obrigatório'),
  description: Yup.string().required('Obrigatório'),
});

interface ISymptomsForm {
  service?: SymptomService;
}

export default function SymptomsForm({
  service = new SymptomService(),
}: ISymptomsForm) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { symptomId } = useParams<any>();

  const [symptom, setSymptom] = useState<Symptom>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>();

  useEffect(() => {
    if (symptomId)
      service
        .getSymptom(symptomId)
        .then((res: Symptom) => {
          setSymptom(res);
        })
        .catch((e: HttpException) => {
          enqueueSnackbar(e.message, { variant: 'error' });
        })
        .finally(() => {
          setIsloading(false);
        });
  }, [symptomId]);

  const onSubmit = (success: any, error: any) => {
    setErrors(error);
    if (success) createNewSymptom(success);
  };

  const createNewSymptom = (newSymptom: any) => {
    service
      .createSymptom(newSymptom)
      .then((res) => {
        enqueueSnackbar('Novo Sintoma cadastrado', { variant: 'success' });
        navigate(`/main/sintoma/${res._id}`);
      })
      .catch((e: HttpException) => {
        enqueueSnackbar(e.message, { variant: 'error' });
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <Content
      title="Cadastro de sintomas"
      withoutGoBack
      isLoading={isLoading}
      loadingListSize={5}
      maxWidth={500}
    >
      <SmartForm onSubmit={onSubmit} validationSchema={validationSchema}>
        <Stack spacing={3}>
          <InputText
            name="title"
            label="Título"
            error={errors}
            defaultValue={symptom?.title}
          />
          <InputText
            rows={6}
            name="description"
            label="Descrição"
            error={errors}
            defaultValue={symptom?.description}
          />
          <Button type="submit">Cadastrar novo sintoma</Button>
        </Stack>
      </SmartForm>
    </Content>
  );
}
