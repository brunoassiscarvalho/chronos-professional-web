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
import { Symptom } from '../../interfaces/Symptom';
import SymptomService from './SymptomService';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

interface ISymptomList {
  service?: SymptomService;
}

export default function SymptomList({
  service = new SymptomService(),
}: ISymptomList) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [symptom, setSymptom] = useState<Symptom[]>();
  useEffect(() => {
    service
      .getSymptoms()
      .then((res) => {
        setSymptom(res);
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
          <Button onClick={() => navigate('/main/novo-sintoma')}>
            {' '}
            + Sintoma
          </Button>
        </Grid>
        {symptom?.map((symptomItem: Symptom) => (
          <Grid
            key={symptomItem._id}
            item
            xs={12}
            onClick={() => navigate(`/main/sintoma/${symptomItem._id}`)}
          >
            <ListItemButton alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={symptomItem.title}
                secondary={symptomItem.description}
              ></ListItemText>
            </ListItemButton>
            <Divider />
          </Grid>
        ))}
      </Grid>
    </Content>
  );
}
