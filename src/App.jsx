import { Box, Button, Checkbox, Grid, Input, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';


const App = () => {

  const [checked, setChecked] = useState(false)
  
  const handleChange = (evento) => {
    setChecked(!checked)
  }
  if (checked) {
  (async () => {

    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdLCJzdWJzY3JpYmUiOlsiaHR0cHM6Ly9leGFtcGxlLmNvbS9teS1wcml2YXRlLXRvcGljIiwie3NjaGVtZX06Ly97K2hvc3R9L2RlbW8vYm9va3Mve2lkfS5qc29ubGQiLCIvLndlbGwta25vd24vbWVyY3VyZS9zdWJzY3JpcHRpb25zey90b3BpY317L3N1YnNjcmliZXJ9Il0sInBheWxvYWQiOnsidXNlciI6Imh0dHBzOi8vZXhhbXBsZS5jb20vdXNlcnMvZHVuZ2xhcyIsInJlbW90ZUFkZHIiOiIxMjcuMC4wLjEifX19.KKPIikwUzRuB3DTpVw6ajzwSChwFw5omBMmMcWKiDcM'
    const url = new URL("https://localhost/.well-known/mercure");
    url.searchParams.append("topic", "https://example.com/my-private-topic");

    const eventSource = new EventSourcePolyfill(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    let granted = false;
    if (Notification.permission === 'granted') {
      granted = true;
    }
  
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      console.log(permission)
      granted = permission === 'granted' ? true : false;
    }

    if (granted) {
    eventSource.onmessage = (e) => {
      let ultimoId = e.lastEventId

      new Notification('Notificando o usuário', {
        body: `${e.data}`
      })
    };
    }
    })()
  }

    const registerSw = async () => {
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration
  }

    const main = async () => {
    await registerSw()
  }

return (
  <Box >
    <form>
      <Typography>Mensagem</Typography>
      <TextField id='outlined_basic' label="Mensagem" variant='outlined'/>
      <Button variant='contained'>Enviar</Button>

      <Typography>Você deseja receber notificações push?</Typography>
      <Button onClick={main}>Register Service Worker</Button>
      <Checkbox
        checked={checked}
        onChange={handleChange}
      />
    </form>
  </Box>
  );
};

export default App;
