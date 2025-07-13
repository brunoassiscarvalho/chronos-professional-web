import { Box, CircularProgress } from '@mui/material';
import SkeletonList from './SkeletonList';

interface ILoading {
  isCircular?: boolean;
  listSize?: number;
}

export default function Loading({ isCircular, listSize }: ILoading) {
  return isCircular ? (
    <Box display="flex" paddingTop={10} justifyContent="center">
      <CircularProgress />
    </Box>
  ) : (
    <SkeletonList lines={listSize} />
  );
}
