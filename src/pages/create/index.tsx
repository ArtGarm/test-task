import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Input from '../../components/Input';
import AddingField from './addingField';

const defaultValues = {
  title: '',
  description: '',
  numberOfPlayers: 0,
  entryFee: 0,
  prizeDistribution: null,
};

const EmptyPrizeDistribution = {
  place: 0,
  prize: 0,
};
function CreatePage() {
  const { control, handleSubmit } = useForm({
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({ name: 'prizeDistribution', control });

  const submitForm = (val) => {
    console.log(val);
  };

  return (
    <Box sx={{ p: '32px 0' }}>
      <form onSubmit={handleSubmit(submitForm)}>
        <Card variant="outlined" sx={{ p: '16px', maxWidth: '400px' }}>
          <Typography variant="h5">Create </Typography>
          <Input name="title" control={control} label="Title" />
          <Input name="description" control={control} label="Description" rows={5} />
          <Input name="numberOfPlayers" control={control} label="Number of Players" type="number" />
          <Input name="entryFee" control={control} label="Entry Fee" type="number" />

          {fields.map((field, index) => <AddingField key={field.id} index={index} control={control} handleRemove={() => remove(index)} />)}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button color="secondary" variant="contained" onClick={() => append(EmptyPrizeDistribution)}> add more </Button>
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button type="submit" variant="contained">Save</Button>
            </Grid>
          </Grid>
        </Card>
      </form>

    </Box>
  );
}

export default CreatePage;
