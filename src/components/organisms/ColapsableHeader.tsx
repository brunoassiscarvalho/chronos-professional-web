import { Box } from '@mui/material';
import { useState, useEffect } from 'react';

export default function CollapsableHeader({ children }: any) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const computeProgress = () => {
      setProgress(document.documentElement.scrollTop);
    };
    window.addEventListener('scroll', computeProgress);
    return () => window.removeEventListener('scroll', computeProgress);
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 70,
        left: 238,
        backgroundColor: 'red',
        width: '100%',
        height: progress < 50 ? 100 : 50,
        zIndex: 500,
      }}
    >
      {children}
    </Box>
  );
}
