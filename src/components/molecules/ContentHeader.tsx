import { ArrowBack } from '@mui/icons-material';
import {
  Grid,
  Typography,
  Link as MUILink,
  Divider,
  Box,
  IconButton,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

interface IContentHeader {
  title: string;
  previous?: () => void;
  withoutGoBack?: boolean;
}

export default function ContentHeader({
  previous,
  title,
  withoutGoBack = false,
}: IContentHeader): JSX.Element {
  const navigate = useNavigate();
  if (!previous) previous = () => navigate(-1);

  return (
    <Box
      sx={{
        position: 'fixed',
        bgcolor: 'background.default',
        zIndex: 100,
        top: 72,
        width: '100%',
        height: 45,
        left: 0,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          paddingLeft: { lg: 20, sm: 13, md: 16, xs: 2 },
          paddingTop: 1,
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={2}>
            {!withoutGoBack && (
              <IconButton onClick={previous} color="primary">
                <ArrowBack />
              </IconButton>
            )}
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography textAlign="center" color="primary.main">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Box>
    </Box>
  );
}
