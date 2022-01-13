import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type Props = {
  children: React.ReactNode;
};

const AppThemeProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (localStorage.getItem('darkMode') === 'on') {
      setDarkMode(true);
    } else if (localStorage.getItem('darkMode') === 'off') {
      setDarkMode(false);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export { AppThemeProvider };
