import { VolumeUp } from '@mui/icons-material';
import {
  Box,
  FormHelperText,
  Grid,
  Input,
  Slider,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { IFormItem } from '../../organisms/form/FormItem';

interface ISliderSteps extends IFormItem {
  defaultValue?: number;
  step?: number;
  min?: number;
  max?: number;
  valueLabelDisplay?: any;
}

export default function SliderSteps({
  label,
  defaultValue = 0,
  step = 1,
  min = 0,
  max = 10,
  name,
  valueLabelDisplay = 'off',
  error,
}: ISliderSteps) {
  const errorMessage = error && error[name];

  const defaultValueNormalized = defaultValue || min;

  const [value, setValue] = useState<number | string | Array<number | string>>(
    defaultValueNormalized,
  );

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  return (
    <Box width="100%">
      <Typography id="input-slider" gutterBottom sx={{ paddingBottom: 5 }}>
        {label}
      </Typography>
      <Slider
        name={name}
        valueLabelDisplay={valueLabelDisplay}
        step={step}
        min={min}
        max={max}
        marks
        value={typeof value === 'number' ? value : 0}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
      />
      <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
    </Box>
  );
}
