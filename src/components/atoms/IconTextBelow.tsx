import {
  Box,
  Typography,
  useMediaQuery,
  Theme,
  Breakpoint,
} from '@mui/material';
import { memo } from 'react';

interface IIconTextBelow {
  title: string;
  Icon: any;
  color?: string;
  hideText?: Breakpoint;
}

export default memo(function IconTextBelow({
  title,
  Icon,
  color = 'black',
  hideText,
}: IIconTextBelow) {
  const isSmall: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  const hideTextBreakPoint: boolean =
    !!hideText &&
    useMediaQuery((theme: Theme) => theme.breakpoints.down(hideText));

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexWrap="wrap"
      paddingBottom={isSmall ? 5 : 3}
      color={color}
    >
      <Icon fill={color} width={'100%'} height={40} />
      {!hideTextBreakPoint && (
        <Typography sx={{ paddingTop: 2, color: 'secondary.main' }}>
          {title}
        </Typography>
      )}
    </Box>
  );
});
