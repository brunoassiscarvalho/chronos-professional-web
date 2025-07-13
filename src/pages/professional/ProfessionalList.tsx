import { Search } from '@mui/icons-material';
import {
  Grid,
  TextField,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Button,
  ListItemButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Content from '../../components/organisms/Content';
import { IProfessionalBasic } from '../../interfaces/Professional';
import ProfessionalService from './ProfessionalService';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { literalPosition } from '../../utils/TypeEnums';

interface IProfessionalList {
  service?: ProfessionalService;
}

export default function ProfessionalList({
  service = new ProfessionalService(),
}: IProfessionalList) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [professionals, setProfessionals] = useState<IProfessionalBasic[]>();

  useEffect(() => {
    service
      .getProfessionals()
      .then((res) => {
        setProfessionals(res);
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  return (
    <Content
      title="Tele Atendimento"
      withoutGoBack
      isLoading={isLoading}
      loadingListSize={9}
      maxWidth={1000}
    >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            name="search"
            placeholder="Nome ou CPF"
            InputProps={{
              startAdornment: <Search />,
            }}
          >
            {' '}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => navigate('/main/novo-profissional')}>
            {' '}
            + Profissional
          </Button>
        </Grid>
        {professionals?.map((professional: IProfessionalBasic) => (
          <Grid key={professional._id} item xs={12}>
            <ListItemButton
              alignItems="flex-start"
              onClick={() => navigate(`/main/profissional/${professional._id}`)}
            >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={professional.name}
                secondary={literalPosition(professional.position)}
              ></ListItemText>
            </ListItemButton>
            <Divider />
          </Grid>
        ))}
      </Grid>
    </Content>
  );
}
