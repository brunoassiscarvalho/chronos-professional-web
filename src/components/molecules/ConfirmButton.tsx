import {
  Button as MUIButton,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  PropTypes,
  Radio,
  RadioGroup,
} from '@mui/material';
import { ReactNode, useState } from 'react';

interface Button {
  onClick?: () => void;
  onCancel?: () => void;
  dialogMessage?: string;
  dialogTitle?: string;
  children: ReactNode;
  label?: string;
  color?: ButtonProps['color'];
  fullWidth?: boolean;
}

export default function ConfirmButton({
  children,
  label,
  color = 'primary',
  onClick,
  fullWidth,
  onCancel,
  dialogMessage,
  dialogTitle,
}: Button) {
  const [open, setOpen] = useState<boolean>(false);

  function clickButton() {
    setOpen(true);
  }

  function confirmModal() {
    if (onClick) onClick();
    setOpen(false);
  }

  function cancelModal() {
    if (onCancel) onCancel();
    setOpen(false);
  }

  return (
    <>
      <MUIButton
        fullWidth={fullWidth}
        variant="contained"
        color={color}
        onClick={clickButton}
      >
        {children || label}
      </MUIButton>
      <Dialog
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        open={open}
      >
        <DialogTitle id="confirmation-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent dividers>{dialogMessage}</DialogContent>
        <DialogActions>
          <MUIButton
            autoFocus
            variant="contained"
            onClick={confirmModal}
            color="primary"
          >
            Sim
          </MUIButton>
          <MUIButton variant="contained" onClick={cancelModal} color="inherit">
            Não
          </MUIButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
