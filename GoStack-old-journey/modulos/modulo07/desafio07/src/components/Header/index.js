import React from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  LogoContainer,
  Logo,
  BasketContainer,
  ItemCount,
} from './styles';

function Header({ navigation }) {
  const cartSize = useSelector((state) => state.cart.length);

  return (
    <Container>
      <LogoContainer onPress={() => navigation.navigate('Main')}>
        <Logo />
      </LogoContainer>

      <BasketContainer onPress={() => navigation.navigate('Cart')}>
        <Icon name="shopping-basket" color="#FFF" size={24} />
        <ItemCount>{cartSize}</ItemCount>
      </BasketContainer>
    </Container>
  );
}

export default Header;
