import { createTheme, Theme } from '@mui/material';
import { grey, green, lime, indigo } from '@mui/material/colors';
import { ptBR } from '@mui/material/locale';

const customTheme: Theme = createTheme(
  {
    components: {
      MuiButton: {
        defaultProps: {
          variant: 'contained',
        },
      },
    },
    palette: {
      primary: {
        main: '#195CA3',
        // light: '#C9DEA1',
      },
      secondary: {
        main: '#7FB11F',
        light: '#C9DEA1',
      },
      background: {
        default: '#FAFAFA',

        // default: '#D8EAB5',
        // paper: '#D8EAB5',
      },
    },
    typography: {
      // h5: {
      //   textAlign: 'center',
      // },
      // fontFamily: [
      //   'Geomanist Regular',
      //   'Geomanist Black',
      //   'Geomanist Book',
      //   'Geomanist Ultra',
      //   'Geomanist Thin',
      //   'Geomanist Light',
      //   'Geomanist Extra Light',
      //   'Geomanist Medium',
      //   'Geomanist Bold',
      // ].join(','),
    },
    // shape: {
    //   borderRadius: 2,
    // },
  },
  ptBR,
);

export default customTheme;
