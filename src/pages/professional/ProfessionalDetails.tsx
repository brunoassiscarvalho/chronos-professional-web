import { Box, Button, Divider, Grid, Stack, Tab, Tabs } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import Content from '../../components/organisms/Content';
import {
  IProfessional,
  IProfessionalLogged,
} from '../../interfaces/Professional';
import ProfessionalService from './ProfessionalService';
import ProfessionalDisplay from '../../components/molecules/ProfessionalDisplay';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import HttpException from '../../services/HttpException';
import ConfirmButton from '../../components/molecules/ConfirmButton';
import { getUser } from '../../utils/Api';

interface ProfessionalsList {
  professionalIdProp?: IProfessional['_id'];
  service?: ProfessionalService;
}

export default function ProfessionalDetails({
  professionalIdProp,
  service = new ProfessionalService(),
}: ProfessionalsList) {
  const navigate = useNavigate();
  const user: IProfessionalLogged = getUser();

  const { enqueueSnackbar } = useSnackbar();
  const { professionalId = professionalIdProp } = useParams<string>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [professional, setProfessional] = useState<IProfessional>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (professionalId)
      service
        .getProfessional(professionalId)
        .then((res) => {
          setProfessional(res);
        })
        .catch((err: HttpException) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        })
        .finally(() => {
          setIsloading(false);
        });
    else {
      setIsloading(false);
    }
  }, [professionalId]);

  const resetProfessionalPass = () => {
    if (professional?.email)
      service
        .sendResetPassEmail(professional.email)
        .then(() => {
          enqueueSnackbar('O email para troca de senha foi enviado', {
            variant: 'success',
          });
        })
        .catch((err: HttpException) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        })
        .finally(() => {
          setIsloading(false);
        });
  };

  const resendMailValidation = () => {
    if (professional?.email)
      service
        .resendMailValidation(professional.email)
        .then(() => {
          enqueueSnackbar('O email de validação foi enviado', {
            variant: 'success',
          });
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
      title="Profissional"
      isLoading={isLoading}
      loadingListSize={9}
      maxWidth={500}
    >
      {professional ? (
        <Stack spacing={3}>
          <ProfessionalDisplay {...professional} />
          <Divider />
          {user.role === 'admin' && (
            <>
              <Button onClick={() => navigate('edit')}>Alterar dados</Button>

              <ConfirmButton
                onClick={resetProfessionalPass}
                dialogMessage="Um email para a troca de senha será enviado para o profissional. Deseja confirmar?"
                dialogTitle="Trocar senha do profissional"
              >
                {' '}
                Email de troca de senha
              </ConfirmButton>

              <ConfirmButton
                onClick={resendMailValidation}
                dialogMessage="Um email para validação será enviado para o profissional. Deseja confirmar?"
                dialogTitle="Validar email do profissional"
              >
                {' '}
                Validar email
              </ConfirmButton>
            </>
          )}

          {user.role === 'concierge' && (
            <Button
              onClick={() =>
                navigate(`/main/profissional/${professional._id}/agenda`)
              }
            >
              Marcar consulta
            </Button>
          )}
        </Stack>
      ) : (
        <>Erro</>
      )}
    </Content>
  );
}
