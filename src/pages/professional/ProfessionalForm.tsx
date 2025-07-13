import { Button, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import InputText from '../../components/molecules/inputs/InputText';
import InputSelect from '../../components/molecules/selects/InputSelect';
import Content from '../../components/organisms/Content';
import SmartForm from '../../components/organisms/form/SmartForm';
import { IProfessional } from '../../interfaces/Professional';
import HttpException from '../../services/HttpException';
import { arrayPositions, arrayRoles } from '../../utils/TypeEnums';
import UserService from './ProfessionalService';

const validationSchema: Yup.AnyObjectSchema = Yup.object({
  name: Yup.string().required('Obrigatório'),
  email: Yup.string()
    .email('Formato de email inválido')
    .required('Obrigatório'),
  phone: Yup.string().required('Obrigatório'),
  cep: Yup.string().required('Obrigatório'),
  position: Yup.string().required('Obrigatório'),
  role: Yup.string().required('Obrigatório'),
});

interface INewUser {
  service?: UserService;
}
export default function ProfessionalForm({
  service = new UserService(),
}: INewUser) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { professionalId } = useParams<any>();

  const [professional, setProfessional] = useState<IProfessional>();
  const [errors, setErrors] = useState<any>();
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    if (professionalId) {
      service
        .getProfessional(professionalId)
        .then((res) => {
          setProfessional(res);
        })
        .catch((e: HttpException) => {
          enqueueSnackbar(e.message, { variant: 'error' });
        })
        .finally(() => {
          setIsloading(false);
        });
    } else {
      setIsloading(false);
    }
  }, [professionalId]);

  function submitForm(success: any, error: any) {
    setErrors(error);
    if (success) {
      if (professionalId) updateUser({ _id: professionalId, ...success });
      else createNewUser(success);
    }
  }

  const createNewUser = (newUser: any) => {
    setIsloading(true);
    service
      .createProfessional(newUser)
      .then(() => {
        navigate(-1);
        enqueueSnackbar('Novo profissional cadastrado', { variant: 'success' });
      })
      .catch((e: HttpException) => {
        enqueueSnackbar(e.message, { variant: 'error' });
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  const updateUser = (newUser: any) => {
    setIsloading(true);
    service
      .updateProfessional(newUser)
      .then(() => {
        navigate(-1);
        enqueueSnackbar('Alteração realizada', { variant: 'success' });
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
      title="Cadastro de profissional"
      isLoading={isLoading}
      loadingListSize={9}
      maxWidth={500}
    >
      <SmartForm onSubmit={submitForm} validationSchema={validationSchema}>
        <Stack spacing={3}>
          <InputText
            name="name"
            label="Nome"
            error={errors}
            defaultValue={professional?.name}
          />
          {!professionalId && (
            <InputText
              name="email"
              type="email"
              label="Email"
              error={errors}
              defaultValue={professional?.email}
            />
          )}
          <InputText
            name="phone"
            format="phone"
            label="Telefone"
            error={errors}
            defaultValue={professional?.phone}
          />
          <InputText
            name="cep"
            format="cep"
            label="CEP"
            error={errors}
            defaultValue={professional?.cep}
          />
          <InputSelect
            label="Posição"
            name="position"
            options={arrayPositions}
            error={errors}
            defaultValue={professional?.position}
          />
          <InputSelect
            label="Papel de acesso"
            name="role"
            options={arrayRoles}
            error={errors}
            defaultValue={professional?.role}
          />
          <Button type="submit">Cadastrar</Button>
        </Stack>
      </SmartForm>
    </Content>
  );
}
