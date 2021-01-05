import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  svg {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${rotate} 2s linear infinite;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    margin-right: 10px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    text-decoration: none;
    color: #7159c1;
  }

  select {
    outline: 0;
    width: 70px;
    height: 20px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #7159c1;
    color: #7159c1;
    background: transparent;
  }

  select option:checked {
    background: #7159c1;
    color: #fff;
  }
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    line-height: 1.4;
    color: #666;
    text-align: justify;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;
      }

      a {
        color: #333;
        text-decoration: none;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        line-height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const Footer = styled.footer`
  form {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: 0;
      background: #7159c1;
      border-radius: 50%;
      transition: background 0.2s linear;
    }

    button:hover {
      background: #523e96;
    }

    button:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }
`;
