import styled from 'styled-components';

export const Container = styled.div`
  background: #d65a69;
  padding: 0 30px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      width: 55px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bol          <Switch
            onChange={toggleTheme}
            checked={title === 'dark'}
            checkedIcon={false}
            uncheckedIcon={false}
            height={20}
            width={45}
            handleDiameter={15}
            offColor={darken(0.2, '#d65a69')}
            onColor="blue"
          />;
      color: #fff;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const ToggleThemeContainer = styled.div`
  margin-right: 20px;
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #f8f8f8;
    }
  }
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
