import { NavigationActions } from 'react-navigation';

function navigate(routeName, params) {
  NavigationActions.navigate({
    routeName,
    params,
  });
}

export default {
  navigate,
};
