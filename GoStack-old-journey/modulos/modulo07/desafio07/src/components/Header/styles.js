import styled from 'styled-components/native';

import logo from '../../assets/Logo.png';

export const Container = styled.View`
  background: transparent;
  width: 100%;
  height: 84px;
  flex-direction: row;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const LogoContainer = styled.TouchableOpacity``;

export const Logo = styled.Image.attrs({
  source: logo,
  reziseMode: 'cover',
})`
  width: 185px;
  height: 24px;
`;

export const BasketContainer = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const ItemCount = styled.Text`
  position: absolute;
  text-align: center;
  top: -8px;
  right: -8px;
  min-width: 18px;
  min-height: 18px;
  background: #7159c1;
  color: #fff;
  padding: 2px;
  font-size: 12px;
  border-radius: 9px;
  overflow: hidden;
`;
