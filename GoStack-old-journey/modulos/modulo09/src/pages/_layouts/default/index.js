import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import { Wrapper } from './styles';

import light from '~/styles/themes/light';
import dark from '~/styles/themes/dark';

export default function DefaultLayout({ children }) {
  const [theme, setTheme] = useState(light);

  // load theme if saved
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Header toggleTheme={toggleTheme} />
        {children}
      </Wrapper>
    </ThemeProvider>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
