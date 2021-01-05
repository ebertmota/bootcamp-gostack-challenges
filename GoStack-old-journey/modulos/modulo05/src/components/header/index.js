import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { ThemeSwitch, SwitchContainer } from './styles';

function Header({ toggleTheme }) {
  const { title } = useContext(ThemeContext);
  return (
    <SwitchContainer>
      <ThemeSwitch
        checked={title === 'dark'}
        onChange={toggleTheme}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        offColor="#382c60"
        onColor="#7159c1"
      />
    </SwitchContainer>
  );
}

Header.propTypes = {
  toggleTheme: PropTypes.string.isRequired,
};

export default Header;
