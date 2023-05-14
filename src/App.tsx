import { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';



import Overview from './content/overview/index';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

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
