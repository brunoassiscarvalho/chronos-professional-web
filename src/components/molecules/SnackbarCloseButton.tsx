import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { SnackbarKey, useSnackbar } from 'notistack';

interface ISnackbarCloseButton {
  snacKey: SnackbarKey;
}

export default function SnackbarCloseButton({
  snacKey,
}: ISnackbarCloseButton): JSX.Element {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton onClick={() => closeSnackbar(snacKey)}>
      <Close />
    </IconButton>
  );
}
