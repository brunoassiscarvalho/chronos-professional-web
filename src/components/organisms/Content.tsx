import { Box } from '@mui/material';
import { ReactNode } from 'react';
import ContentHeader from '../molecules/ContentHeader';

interface IContent {
  title?: string
  children: ReactNode;
  withoutGoBack?:boolean
}

export default function Content({ title, children, withoutGoBack=false }: IContent): JSX.Element {
  return (
    <Box sx={{ width: '100%' }}  >
      {title && <ContentHeader withoutGoBack={withoutGoBack} title={title} />}
      <Box sx={{ width: '100%', paddingTop:3 }}>
        {children}
      </Box>
    </Box>
  );
}