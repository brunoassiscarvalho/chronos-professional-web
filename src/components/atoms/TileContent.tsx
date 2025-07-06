import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface ITileContent {
  children: ReactNode;
  color?: string;
  minHeight?: number
}

export default function TileContent({ children, minHeight = 200, color = 'background.default' }: ITileContent) {
  return (
    <Box sx={{ backgroundColor: color , width: '100%', padding: 2, minHeight: minHeight }}>
      {children}
    </Box>);
}