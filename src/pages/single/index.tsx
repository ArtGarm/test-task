import React from 'react';
import { useParams } from 'react-router-dom';
import storage from "../../helpers";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

function Index() {
  const { id } = useParams<{ id: string }>();
  const data = storage.getSingleFromLocalStorage(parseInt(id));

  if(!parseInt(id) || !data) {
    return <Typography>Not exist</Typography>
  }

  return (
    <Box sx={{ p: '32px 0' }}>
      <Card variant="outlined" sx={{ p: '16px'}}>
        <Typography variant={'h4'} gutterBottom>Tournament: {data.title}</Typography>
        <Grid container>
          <Grid item xs={2}>
            <Typography>Title</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography>{data.title}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Description</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography>{data.description}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Number of Players</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography>{data.numberOfPlayers}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Entry Fee</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography>{data.entryFee}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Prize Distribution</Typography>
          </Grid>
          <Grid item xs={10}>
            {data.prizeDistribution.map(pz => (
              <Card variant="outlined" sx={{ p: '16px', m: '0 0 12px'}} key={`${pz.place} + ${pz.prize}`}>
                <Grid container>
                  <Grid item xs={2}>
                    <Typography>Place</Typography>
                  </Grid>
                  <Grid item xs={10}>{pz.place}</Grid>
                  <Grid item xs={2}>
                    <Typography>Prize</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    {pz.prize} {pz.percentage ? '%' : '$'}
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Winners</Typography>
                  </Grid>
                  <Grid item xs={10}>{pz.winners}</Grid>
                </Grid>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default Index;
