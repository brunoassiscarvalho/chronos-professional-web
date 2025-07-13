import { VolumeUp } from '@mui/icons-material';
import { Box, Grid, Input, Slider, Typography } from '@mui/material';
import { useState } from 'react';
import { IFormItem } from '../../organisms/form/FormItem';

interface ISliderStepsInput extends IFormItem {
  defaultValue?: number;
  step?: number;
  min?: number;
  max?: number;
}

export default function SliderStepsInput({
  label,
  defaultValue = 0,
  step = 1,
  min = 0,
  max = 10,
  name,
}: ISliderStepsInput) {
  function valuetext(value: number) {
    return `${value} min`;
  }
  const defaultValueNormalized = defaultValue || min;

  const [value, setValue] = useState<number | string | Array<number | string>>(
    defaultValueNormalized,
  );

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };
  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        {label}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            step={step}
            min={min}
            max={max}
            marks
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item sx={{ display: 'flex' }}>
          <Input
            name={name}
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: step,
              min: min,
              max: max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
          <Typography>min</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
