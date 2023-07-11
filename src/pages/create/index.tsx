import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Input from '../../components/Input';
import AddingField from './addingField';
import Totals from './totals';
import schema from './validation'
import storage from '../../helpers'


const EmptyPrizeDistribution = {
  place: 0,
  prize: 0,
  winners: 0,
  percentage: false
};

const defaultValues = {
  title: '',
  description: '',
  numberOfPlayers: 0,
  entryFee: 0,
  prizeDistribution: [EmptyPrizeDistribution],
};


function CreatePage() {
  const navigate = useNavigate();
  const { control, handleSubmit, formState } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues
  });
  const { fields, append, remove } = useFieldArray({ name: 'prizeDistribution', control });

  const submitForm = (val) => {
    storage.saveToLocalStorage(val)
    navigate('/')
  };

  return (
    <Box sx={{ p: '32px 0' }}>
      <form onSubmit={handleSubmit(submitForm)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card variant="outlined" sx={{ p: '16px'}}>
              <Typography variant="h5">Create Tournament</Typography>
              <Input name="title" control={control} label="Title" />
              <Input name="description" control={control} label="Description" rows={5} />
              <Input name="numberOfPlayers" control={control} label="Number of Players" type="number" />
              <Input name="entryFee" control={control} label="Entry Fee" type="number" />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined" sx={{ p: '16px' }}>
              <Typography variant="h5">Prize Distribution</Typography>
              {fields.map((field, index) => <AddingField key={field.id} index={index} control={control} handleRemove={() => remove(index)} />)}
              {formState.errors.prizeDistribution && formState.isSubmitted ? (<Grid container>
                  <Grid item>
                    <Typography color="error">{formState.errors.prizeDistribution?.message}</Typography>
                  </Grid>
                </Grid>) : null}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button color="secondary" variant="contained" onClick={() => append(EmptyPrizeDistribution)}> add more </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Totals control={control} />
          </Grid>
        </Grid>
      </form>

    </Box>
  );
}

export default CreatePage;
