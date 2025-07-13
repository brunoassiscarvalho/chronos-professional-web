import { Box, Grid, Stack } from '@mui/material';
import { ReactNode } from 'react';
import ContentHeader from '../molecules/ContentHeader';
import Loading from '../molecules/Loading';
import NoMatch from '../molecules/NoMatch';

interface IContent {
  title: string;
  children: ReactNode;
  withoutGoBack?: boolean;
  isLoading?: boolean;
  loading?: ReactNode;
  error?: string;
  maxWidth?: number | string;
  loadingListSize?: number;
  isCircularLoading?: boolean;
}

export default function Content({
  title,
  children,
  withoutGoBack = false,
  isLoading,
  maxWidth,
  loadingListSize = 3,
  loading,
  error,
  isCircularLoading,
}: IContent): JSX.Element {
  return (
    <Stack alignItems="center" spacing={3}>
      <ContentHeader withoutGoBack={withoutGoBack} title={title} />
      <Box sx={{ maxWidth: maxWidth, height: '100%', width: '100%' }}>
        {isLoading ? (
          loading || (
            <Loading
              listSize={loadingListSize}
              isCircular={isCircularLoading}
            />
          )
        ) : !error ? (
          children
        ) : (
          <NoMatch message="Não foi possivel encontrar as informações" />
        )}
      </Box>
    </Stack>
  );
}
