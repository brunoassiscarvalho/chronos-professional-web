import { Search, Wysiwyg } from '@mui/icons-material';
import {
  Grid,
  Skeleton,
  Box,
  TextField,
  ListItem,
  Stack,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '../../components/molecules/IconButton';
import Content from '../../components/organisms/Content';
import { IPatientBasicData } from '../../interfaces/Patient';

export default function LaboratoryList() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [laboratorys, setLaboratorys] = useState<IPatientBasicData[]>();

  return (
    <Content title="Laboratorios" withoutGoBack>
      {isLoading ? (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width="100%" height={80} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width="100%" height={80} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width="100%" height={80} />
            </Grid>
          </Grid>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '50%' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  sx={{ width: '50%' }}
                  name="search"
                  placeholder="Razão social, nome fantazia ou CNPJ"
                  InputProps={{
                    startAdornment: <Search />,
                  }}
                >
                  {' '}
                </TextField>
                <Button onClick={() => navigate('new')}>+ Laboratório</Button>
              </Grid>
              {laboratorys?.map((laboratory) => (
                <>
                  <Grid item xs={12}>
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <Stack direction="row" spacing={2}>
                          <IconButton
                            onClick={() =>
                              navigate(`${laboratory._id}/anamnese`)
                            }
                            label="Anamnese"
                          >
                            <Wysiwyg />
                          </IconButton>
                          <IconButton
                            onClick={() => navigate(laboratory._id)}
                            label="Visualizar"
                          >
                            <Search />
                          </IconButton>
                        </Stack>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText>
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{ paddingTop: 1 }}
                        >
                          <Typography variant="h6">
                            {laboratory.name}
                          </Typography>
                        </Box>
                      </ListItemText>
                    </ListItem>
                    <Divider />
                  </Grid>
                </>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Content>
  );
}
