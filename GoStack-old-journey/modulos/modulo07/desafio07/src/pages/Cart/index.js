import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { formatPrice } from '../../utils/format';

import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  Products,
  Product,
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductTitle,
  ProductPrice,
  ProductDelete,
  ProductControls,
  ProductControlButton,
  ProductAmount,
  ProductSubtotal,
  TotalContainer,
  TotalAmount,
  TotalText,
  Order,
  OrderText,
  EmptyContainer,
  EmptyText,
} from './styles';

function Cart() {
  const total = useSelector((state) =>
    formatPrice(
      state.cart.reduce(
        (totalSum, product) => totalSum + product.price * product.amount,
        0
      )
    )
  );

  const products = useSelector((state) =>
    state.cart.map((cart) => ({
      ...cart,
      subtotal: formatPrice(cart.price * cart.amount),
      priceFormatted: formatPrice(cart.price),
    }))
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      {products.length ? (
        <>
          <Products>
            {products.map((product) => (
              <Product key={product.id}>
                <ProductInfo>
                  <ProductImage source={{ uri: product.image }} />
                  <ProductDetails>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductPrice>{product.priceFormatted}</ProductPrice>
                  </ProductDetails>
                  <ProductDelete
                    onPress={() =>
                      dispatch(CartActions.removeFromCart(product.id))
                    }
                  >
                    <Icon name="delete-forever" size={24} color="#7159c1" />
                  </ProductDelete>
                </ProductInfo>
                <ProductControls>
                  <ProductControlButton onPress={() => decrement(product)}>
                    <Icon
                      name="remove-circle-outline"
                      size={20}
                      color="#7159c1"
                    />
                  </ProductControlButton>
                  <ProductAmount value={`${product.amount}`} />
                  <ProductControlButton onPress={() => increment(product)}>
                    <Icon name="add-circle-outline" size={20} color="#7159c1" />
                  </ProductControlButton>
                  <ProductSubtotal>{product.subtotal}</ProductSubtotal>
                </ProductControls>
              </Product>
            ))}
          </Products>
          <TotalContainer>
            <TotalText>TOTAL</TotalText>
            <TotalAmount>{total}</TotalAmount>
            <Order>
              <OrderText>FINALIZAR PEDIDO</OrderText>
            </Order>
          </TotalContainer>
        </>
      ) : (
        <EmptyContainer>
          <Icon name="remove-shopping-cart" size={64} color="#eee" />
          <EmptyText>Seu carrinho está vazio.</EmptyText>
        </EmptyContainer>
      )}
    </Container>
  );

}

export default Cart;
