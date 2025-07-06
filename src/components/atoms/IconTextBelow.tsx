import { Box, Typography } from '@mui/material';
import { memo } from 'react';

interface IIconTextBelow {
  title: string;
  Icon?: any;
}

export default memo(function IconTextBelow({ title, Icon }: IIconTextBelow) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexWrap="wrap"
      padding={3}
      color="white"
    >
      <Icon fill="white" width={'100%'} height={50} />
      <Typography variant="button" sx={{ paddingTop: 2 }}>
        {title}
      </Typography>
    </Box>
  );
});
