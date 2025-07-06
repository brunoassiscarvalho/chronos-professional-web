import { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Paper,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import LoginService from './LoginService';
import HttpException from '../../services/HttpException';
import { useSnackbar } from 'notistack';
import SmartForm from '../../components/organisms/form/SmartForm';
import { logoUrl } from '../../utils/Constants';
import { setSession } from '../../utils/Api';
import InputText from '../../components/molecules/inputs/InputText';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random?trees)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
}));

interface ILogin {
  loginService?: LoginService;
}

export default function Login({
  loginService = new LoginService(),
}: ILogin): JSX.Element {
  const classes = useStyles();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [isSending, setIsSending] = useState(false);

  const loginHandler = (data: any) => {
    console.log(data);
    setIsSending(true);
    loginService
      .login(data)
      .then((res) => {
        setSession(res);
        navigate('/main');
      })
      .catch((e: HttpException) => {
        // if (e.internalCode === 'LOGIN002') navigate('external/resend-mail-avalidation');
        enqueueSnackbar(e.message, { variant: 'error' });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Stack padding={10} spacing={3}>
          <Box component="img" src={logoUrl} />
          <Typography component="h1" variant="h5">
            Escritório
          </Typography>
          {!isSending ? (
            <SmartForm onSubmit={loginHandler}>
              <Stack padding={10} spacing={3}>
                <InputText
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  validations={{ required: 'Obrigatório' }}
                />
                <InputText
                  name="password"
                  label="Senha"
                  type="password"
                  autoComplete="current-password"
                  validations={{ required: 'Obrigatório' }}
                />
                <Button type="submit">Entrar</Button>
                <Button
                  color="secondary"
                  onClick={() => navigate('/external/new-user')}
                >
                  Novo
                </Button>
              </Stack>
            </SmartForm>
          ) : (
            <Box display="flex" paddingTop={10} justifyContent="center">
              <CircularProgress />
            </Box>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
