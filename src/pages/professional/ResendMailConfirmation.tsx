import Content from '../../components/organisms/Content';
import { Box, Button, Stack, Typography } from '@mui/material';
import SmartForm from '../../components/organisms/form/SmartForm';
import InputText from '../../components/molecules/inputs/InputText';
import { logoUrl } from '../../utils/Constants';
import UserService from './ProfessionalService';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

interface INewUser {
  service?: UserService;
}
export default function ResendMailConfirmation({
  service = new UserService(),
}: INewUser) {
  const [result, setResult] = useState<boolean>();

  const { enqueueSnackbar } = useSnackbar();

  const createNewUser = (newUser: any) => {
    service
      .sendVerificationMail(newUser)
      .then(() => {
        setResult(true);
      })
      .catch((e) => {
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
          <>
            <Typography variant="h5">
              Enviar novamente o email para confirmação
            </Typography>
            <SmartForm onSubmit={createNewUser}>
              <InputText
                name="email"
                type="email"
                label="Email"
                validations={{ required: 'Obrigatório' }}
              />
              <InputText
                name="password"
                type="password"
                label="Senha"
                validations={{ required: 'Obrigatório' }}
              />
              <Button type="submit">Enviar</Button>
            </SmartForm>
          </>
        )}
      </Stack>
    </Content>
  );
}
