import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;

    button {
      border: 0;
      background: none;
    }

    strong {
      font-size: 24px;
      color: #666;
      margin: 0 15px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Time = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  height: 90px;
  background: #fff;
  border: ${(props) => (props.available ? '1px' : '3px')} solid
    ${(props) => (props.available ? 'rgba(0,0,0,.2)' : '#d65a69')};

  opacity: ${(props) => (props.past ? 0.6 : 1)};

  transition: all 0.2s linear;

  strong {
    display: block;
    color: ${(props) => (props.available ? '#999' : '#d65a69')};
    font-size: 20px;
    font-weight: normal;
  }

  span {
    color: ${(props) => (props.available ? '#999' : '#666')};
    display: block;
    margin-top: 3px;
    color: #666;
  }

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;
