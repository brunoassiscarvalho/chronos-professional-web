import { Skeleton, Stack } from '@mui/material';

interface ISkeletonList {
  width?: number | string;
  height?: number | string;
  lines?: number;
}

export default function SkeletonList({
  width = '100%',
  height = 55,
  lines = 2,
}: ISkeletonList) {
  return (
    <Stack spacing={3}>
      {Array(lines)
        .fill('skeleton')
        .map((item, index) => (
          <Skeleton
            key={item + index}
            variant="rectangular"
            width={width}
            height={height}
          />
        ))}
    </Stack>
  );
}
