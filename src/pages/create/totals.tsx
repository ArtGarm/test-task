import React from 'react';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {Control, useWatch} from "react-hook-form";
import Button from "@mui/material/Button";
import { Grid } from '@mui/material';

interface Props {
  control: Control<any>
}

const Totals = ({ control }: Props) => {
  const entryFee = useWatch({ name: 'entryFee', control });
  const numberOfPlayers = useWatch({ name: 'numberOfPlayers', control });
  const prizeDistribution = useWatch({ name: 'prizeDistribution', control });

  const total = entryFee * numberOfPlayers;
  const distributed = prizeDistribution.reduce((acc, d) => {
    if (d.percentage) {
      return acc + (total * d.prize/100) * d.winners
    }
    return acc + d.prize * d.winners
  }, 0);

  return (
    <Card variant="outlined" sx={{ p: '16px'}}>
      <Typography> Total amount = {total}</Typography>
      <Typography color={total - distributed >= 0 ? 'green' : 'error'}>
        Left to be distributed = {total - distributed}
      </Typography>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button type="submit" variant="contained">Save</Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Totals;