import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Main from './pages/main';
import Create from './pages/create';
import Index from './pages/single';

function App() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Box sx={{ p: '16px 0' }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item xs={8}>
                <Typography variant="h4" component={NavLink} to="/" color="white">
                  React Home Task for the Hamilton Project
                </Typography>
              </Grid>
              <Grid item>
                <Button color="secondary" variant="contained" component={NavLink} to="/create">create</Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </AppBar>
      <Container maxWidth="lg">
        <div>
          <Routes>
            <Route index element={<Main />} />
            <Route path="/create" element={<Create />} />
            <Route path="/:id" element={<Index />} />
          </Routes>
        </div>
      </Container>

    </>
  );
}
export default App;
