import { useState } from 'react';
import InputText from '../../components/molecules/inputs/InputText';
import SmartForm from '../../components/organisms/form/SmartForm';
import * as Yup from 'yup';
import { Button, Stack } from '@mui/material';
import SymptomService from './SymptomService';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import HttpException from '../../services/HttpException';
import Loading from '../../components/molecules/Loading';
import { SymptomLevel } from '../../interfaces/Symptom';
import ConfirmButton from '../../components/molecules/ConfirmButton';

const validationSchema: Yup.AnyObjectSchema = Yup.object({
  level: Yup.string().required('Obrigatório'),
  resume: Yup.string().required('Obrigatório'),
  advisement: Yup.string().required('Obrigatório'),
});

interface ISymptomsForm {
  service?: SymptomService;
  symptomLevel: ISymtomLevelKey;
  onSave?: (symptomLevel: ISymtomLevelKey) => void;
}

export interface ISymtomLevelKey extends SymptomLevel {
  key: string;
}

export default function SymptomLevelForm({
  service = new SymptomService(),
  symptomLevel,
  onSave,
}: ISymptomsForm) {
  const { enqueueSnackbar } = useSnackbar();
  const { symptomId } = useParams<any>();

  const [isLoading, setIsloading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>();

  const onSubmit = (success: any, error: any) => {
    setErrors(error);
    if (success) {
      if (symptomLevel?._id) {
        updtadeSymptomLevel({ ...symptomLevel, ...success });
      } else {
        createSymptomLevel(success);
      }
    }
  };

  const createSymptomLevel = (newSymptomLevel: ISymtomLevelKey) => {
    if (symptomId) {
      setIsloading(true);
      service
        .createSymptomLevel(symptomId, newSymptomLevel)
        .then(() => {
          if (onSave) onSave(newSymptomLevel);
          enqueueSnackbar('Novo profissional cadastrado', {
            variant: 'success',
          });
        })
        .catch((e: HttpException) => {
          enqueueSnackbar(e.message, { variant: 'error' });
        })
        .finally(() => {
          setIsloading(false);
        });
    }
  };

  const updtadeSymptomLevel = (
    symptomLevelData: ISymtomLevelKey,
    isDeactivate = false,
  ) => {
    if (symptomId) {
      setIsloading(true);
      service
        .updateSymptomLevel(symptomId, {
          ...symptomLevelData,
          ...(isDeactivate && { endedAt: new Date() }),
        })
        .then(() => {
          if (onSave) onSave(symptomLevelData);
          enqueueSnackbar('Sintoma atualizado', { variant: 'success' });
        })
        .catch((e: HttpException) => {
          enqueueSnackbar(e.message, { variant: 'error' });
        })
        .finally(() => {
          setIsloading(false);
        });
    }
  };

  const deactivateSymptomLevel = (symptomLevelData: ISymtomLevelKey) => {
    updtadeSymptomLevel(symptomLevelData, true);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Stack spacing={3} width={800}>
      <SmartForm onSubmit={onSubmit} validationSchema={validationSchema}>
        <Stack spacing={3}>
          <InputText
            readOnly
            name="level"
            label="Nivel"
            error={errors}
            defaultValue={symptomLevel?.level}
          />
          <InputText
            name="resume"
            label="Detalhe do nivel do sintoma"
            error={errors}
            defaultValue={symptomLevel?.resume}
          />
          <InputText
            rows={10}
            name="advisement"
            label="Recomendação para o paciente"
            error={errors}
            defaultValue={symptomLevel?.advisement}
          />
          <ConfirmButton
            color="warning"
            onClick={() => deactivateSymptomLevel(symptomLevel)}
            dialogTitle="Desativar sintoma"
            dialogMessage="Esta ação não podera ser desfeita. Deseja confirmar a desativação deste sintoma?"
          >
            Desativar
          </ConfirmButton>
          <Button type="submit">Alterar sintoma</Button>
        </Stack>
      </SmartForm>
    </Stack>
  );
}
