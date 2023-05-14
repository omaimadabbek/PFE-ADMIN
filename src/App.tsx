import { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import Overview from './content/overview/index';
import Swal from 'sweetalert2';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import io from 'socket.io-client';
import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import router from './Router';

function App() {
  const [user, setuser] = useState('');

  useEffect(() => {
    var email = localStorage.getItem('Email');
    if (email) {
      setuser(email);
    }
    if (user) {
      const socket = io(`${process.env.REACT_APP_API_URL}`);

      socket.on('connection', function (data) {
        socket.emit('ready for data', {
          user: 'omaima'
        });
      });
      socket.on('Nouvelle commande', (data) => {
        Swal.fire({
          title: ' Nouvelle commande ' + data.message,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      });
      socket.on('disconnect', function () {
        socket.disconnect();
      });
    }
  }, [user]);

  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {user ? content : <Overview />}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
