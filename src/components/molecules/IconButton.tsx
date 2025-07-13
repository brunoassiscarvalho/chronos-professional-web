import { Delete, PhotoCamera } from '@mui/icons-material';
import {
  Typography,
  useMediaQuery,
  useTheme,
  IconButton as MUiIconButton,
  Tooltip,
  Button,
} from '@mui/material';

export const IconButton = ({ icon, label, onClick, children }: any) => {
  const theme = useTheme();
  const onlyIcon = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <div>
      {onlyIcon ? (
        <Tooltip title={label}>
          <MUiIconButton onClick={onClick}>{icon || children}</MUiIconButton>
        </Tooltip>
      ) : (
        <Button
          size="small"
          color="inherit"
          startIcon={icon || children}
          onClick={onClick}
        >
          {label}
        </Button>
      )}
    </div>
  );
};
