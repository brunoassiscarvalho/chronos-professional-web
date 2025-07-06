import Content from '../../components/organisms/Content';
import { Box, Button, Stack } from '@mui/material';
import SmartForm from '../../components/organisms/form/SmartForm';
import InputText from '../../components/molecules/inputs/InputText';
import { logoUrl } from '../../utils/Constants';
import UserService from './ProfessionalService';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import * as Yup from 'yup';
import HttpException from '../../services/HttpException';

interface INewUser {
  service?: UserService;
}
export default function NewUser({ service = new UserService() }: INewUser) {
  const [result, setResult] = useState<boolean>();

  const { enqueueSnackbar } = useSnackbar();

  const validationSchema: Yup.AnyObjectSchema = Yup.object({
    email: Yup.string()
      .email('Formato de email inválido')
      .required('Obrigatório'),
    phone: Yup.string().required('Obrigatório'),
    password: Yup.string().required('Obrigatório'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
      .required('Obrigatório'),
  });

  const createNewUser = (newUser: any) => {
    console.log({ newUser });
    service
      .createProfessional(newUser)
      .then(() => {
        setResult(true);
      })
      .catch((e: HttpException) => {
        enqueueSnackbar(e.message, { variant: 'error' });
      });
  };

  return (
    <Content title="Cadastro">
      <Stack spacing={5}>
        <Box component="img" src={logoUrl} />
        {result ? (
          <>Certo!!!</>
        ) : (
          <SmartForm onSubmit={createNewUser} resolver={validationSchema}>
            <InputText name="name" label="Nome" />
            <InputText name="email" type="email" label="Email" />
            <InputText name="phone" format="tel" label="Telefone" />
            <InputText name="cep" format="cep" label="CEP" />
            <InputText name="password" type="password" label="Senha" />
            <InputText
              name="passwordConfirmation"
              type="password"
              label="Confirme a senha"
            />
            <Button type="submit">Cadastrar</Button>
          </SmartForm>
        )}
      </Stack>
    </Content>
  );
}
