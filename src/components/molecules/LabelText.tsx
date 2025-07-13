import { Grid, Typography } from '@mui/material';

interface ILabelText {
  label: string;
  text: string | number;
}

const firstColumnSize = 6;
const secondColumnSize = 6;

export default function LabelText({ label, text }: ILabelText) {
  return (
    <>
      <Grid item xs={firstColumnSize}>
        <Typography textAlign="right">{label}</Typography>
      </Grid>
      <Grid item xs={secondColumnSize}>
        <b>{text}</b>
      </Grid>
    </>
  );
}
