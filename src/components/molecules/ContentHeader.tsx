import { ArrowBack } from '@mui/icons-material';
import { Grid, Typography, Link as MUILink, } from '@mui/material';

import { useNavigate } from 'react-router-dom';


interface IContentHeader {
  title: string,
  previous?: () => void,
  withoutGoBack?: boolean
}


export default function ContentHeader({ previous, title, withoutGoBack = false }: IContentHeader): JSX.Element {

  const navigate = useNavigate();
  if (!previous) previous = () => navigate(-1);

  return (

    <Grid container spacing={6}>
      <Grid item xs={2} md={2} sm={2}>
        {!withoutGoBack && <MUILink color="inherit" onClick={previous} component="button" variant="body2">
          <ArrowBack />
        </MUILink>}
      </Grid>
      <Grid item xs={8} md={8} sm={8}>
        <Typography variant="h5" color="textPrimary" gutterBottom>{title}</Typography>
      </Grid>
      <Grid item xs={2} md={2} sm={2}>
      </Grid>
    </Grid>);
}




