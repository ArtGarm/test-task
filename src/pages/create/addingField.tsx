import React from 'react';
import { Control } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Input from '../../components/Input';

interface Props {
  index: number
  control: Control<any>
  handleRemove: () => void
}

function AddingField({ index, control, handleRemove }: Props) {
  return (
    <Grid container alignContent="center" spacing={2}>
      <Grid item xs={5}>
        <Input name={`prizeDistribution.${index}.place`} control={control} label="Place" type="number" />
      </Grid>
      <Grid item xs={5}>
        <Input name={`prizeDistribution.${index}.prize`} control={control} label="Prize" type="number" />
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={handleRemove} color="error" size="large">
          <DeleteForeverIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default AddingField;
