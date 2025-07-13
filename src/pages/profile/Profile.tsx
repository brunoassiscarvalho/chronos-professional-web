import { Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import ConfirmButton from '../../components/molecules/ConfirmButton';
import PatientDisplay from '../../components/molecules/PatientDisplay';
import Content from '../../components/organisms/Content';
import { IProfessionalLogged } from '../../interfaces/Professional';
import HttpException from '../../services/HttpException';
import { getUser } from '../../utils/Api';
import ProfessionalService from './ProfileService';

interface IProfile {
  service?: ProfessionalService;
}

export default function Profile({
  service = new ProfessionalService(),
}: IProfile) {
  const { enqueueSnackbar } = useSnackbar();

  const professional: IProfessionalLogged = getUser();
  const [isLoading, setIsloading] = useState<boolean>(false);

  const sendMailNewPass = () => {
    setIsloading(true);
    service
      .sendMailChangePass()
      .then((res) => {
        enqueueSnackbar('O email foi enviado', { variant: 'success' });
      })
      .catch((err: HttpException) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <Content
      title="Perfil"
      isLoading={isLoading}
      loadingListSize={9}
      maxWidth={500}
    >
      <Stack spacing={3}>
        {/* <PatientDisplay {...professional} /> */}
        <ConfirmButton
          onClick={sendMailNewPass}
          dialogMessage="Vamos enviar um email para alterar a senha. Deseja confirmar?"
        >
          {' '}
          Alterar senha
        </ConfirmButton>
      </Stack>
    </Content>
  );
}
