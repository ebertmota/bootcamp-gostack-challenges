import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import { darken } from 'polished';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Notifications from '~/components/Notifications';
import logo from '~/assets/logo.svg';

import { Container, Content, Profile, ToggleThemeContainer } from './styles';

export default function Header({ toggleTheme }) {
  const profile = useSelector((state) => state.user.profile);

  const { title } = useContext(ThemeContext);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <ToggleThemeContainer>
            <Switch
              onChange={toggleTheme}
              checked={title === 'dark'}
              checkedIcon={false}
              uncheckedIcon={false}
              height={20}
              width={45}
              handleDiameter={15}
              onColor="#323232"
              offColor={darken(0.2, '#d65a69')}
            />
          </ToggleThemeContainer>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                profile.avatar.url ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Ebert Mota"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

Header.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
};
