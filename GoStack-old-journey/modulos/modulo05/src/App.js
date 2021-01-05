import React from 'react';
import { ThemeProvider } from 'styled-components';

import usePersistedState from './utils/usePersistedState';

import Header from './components/header';
import Routes from './routes';
import GlobalStyle from './styles/global';

import light from './styles/themes/light';
import dark from './styles/themes/dark';

function App() {
  const [theme, setTheme] = usePersistedState('theme', light);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header toggleTheme={toggleTheme} />
        <Routes />
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}

export default App;
