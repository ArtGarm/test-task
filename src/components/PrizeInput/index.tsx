import React from 'react';
import TextField from '@mui/material/TextField';
import { Control, useController } from 'react-hook-form';
import Box from '@mui/material/Box';
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PercentIcon from '@mui/icons-material/Percent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface Props {
  control: Control<any>
  label: string
  name: string
  percentFieldName: string
  rows?: number
  type?: string
}

function PrizeInput({ name, percentFieldName, control, label, type, rows }: Props) {
  const { field, fieldState } = useController({ name, control });
  const percentField = useController({ name: percentFieldName, control });

  const handleChange = (e) => {
    if(type === 'number') {
      const regex = /^[0-9\b]+$/;
      if (e.target.value === "" || regex.test(e.target.value)) {
        field.onChange(e.target.value);
      }
    } else {
      field.onChange(e)
    }
  };

  return (
    <Box sx={{ p: '8px 0' }}>
      <TextField
        fullWidth
        value={field.value || ''}
        name={field.name}
        onChange={handleChange}
        label={label}
        variant="outlined"
        error={!!fieldState.error}
        type={'text'}
        helperText={fieldState.error?.message}
        multiline={!!rows}
        rows={rows}
        size="small"
        InputProps={{
          endAdornment: <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => percentField.field.onChange({ target: { value: !percentField.field.value }})}
              onMouseDown={() => percentField.field.onChange({ target: { value: !percentField.field.value }})}
              edge="end"
            >
              {percentField.field.value ? <PercentIcon /> : <AttachMoneyIcon />}
            </IconButton>
          </InputAdornment>
        }}
      />
    </Box>
  );
}

PrizeInput.defaultProps = {
  rows: undefined,
  type: 'text',
};

export default PrizeInput;
