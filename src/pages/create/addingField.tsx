import React from 'react';
import {Control, useController} from 'react-hook-form';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Input from '../../components/Input';
import PrizeInput from "../../components/PrizeInput";

interface Props {
  index: number
  control: Control<any>
  handleRemove: () => void
}

function AddingField({ index, control, handleRemove }: Props) {
  return (
    <Grid container alignContent="center" spacing={2}>
      <Grid item xs={3}>
        <Input name={`prizeDistribution.${index}.place`} control={control} label="Place" type="number" />
      </Grid>
      <Grid item xs={3}>
        <PrizeInput
          name={`prizeDistribution.${index}.prize`}
          percentFieldName={`prizeDistribution.${index}.percentage`}
          control={control}
          label="Prize"
          type="number"
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          name={`prizeDistribution.${index}.winners`}
          control={control}
          label="Winners"
          type="number"
        />
      </Grid>
      <Grid item xs={3}>
        <IconButton onClick={handleRemove} color="error" size="large">
          <DeleteForeverIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default AddingField;
