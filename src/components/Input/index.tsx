import React from 'react';
import TextField from '@mui/material/TextField';
import { Control, useController } from 'react-hook-form';
import Box from '@mui/material/Box';

interface Props {
  control: Control<any>
  label: string
  name: string
  rows?: number
  type?: string
}

function Input({
  name, control, label, type, rows,
}: Props) {
  const { field, fieldState } = useController({ name, control });

  return (
    <Box sx={{ p: '8px 0' }}>
      <TextField
        fullWidth
        value={field.value}
        name={field.name}
        onChange={field.onChange}
        label={label}
        variant="outlined"
        error={!!fieldState.error}
        type={type || 'text'}
        helperText={fieldState.error?.message}
        multiline={!!rows}
        rows={rows}
        size="small"
      />
    </Box>
  );
}

Input.defaultProps = {
  rows: undefined,
  type: 'text',
};

export default Input;
