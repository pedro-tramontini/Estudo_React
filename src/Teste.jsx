import { Box, Button, Checkbox, Grid, Input, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';


const App = () => {
return (
  <Box >
    <form>
      <Typography>Mensagem</Typography>
      <TextField id='outlined_basic' label="Mensagem" variant='outlined'/>
      <Button variant='contained'>Enviar</Button>
    </form>
  </Box>
  );
};

export default App;
