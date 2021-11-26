import React from 'react';
import { Outlet } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './App.css';

const useStyles = makeStyles({
  stack: {
    marginTop: '5rem',
    marginBottom: '3rem',
  },
});

function App() {
  const  classes = useStyles();

  return (
    <div className="App">
      <Box
        component="form"
        sx={{
          width: 500,
          maxWidth: '100%',
          mx: 'auto',
        }}
        noValidate
        autoComplete="off"
      >
        <Stack
          className={classes.stack}
          direction="row"
          spacing={1}
        >
          <Typography variant="h4" gutterBottom component="div">
            ☎️ Phonebook
          </Typography>
        </Stack>
        <Outlet />
      </Box >
    </div>
  );
}

export default App;
