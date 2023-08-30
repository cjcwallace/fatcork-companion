/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import * as SecureStore from 'expo-secure-store';

import React, { useReducer } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AuthContext from './store/global/state';
import AuthenticationStack from './auth-navigator';
import TabNavigator from './app-navigator';
import { authReducer } from './store/global/reducer';

// eslint-disable-next-line import/no-extraneous-dependencies

const debug = true;

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
  },
  token: null,
};

if (debug === true) {
  initialState.user = {
    id: 1,
    firstName: 'Cameron',
    lastName: 'Wallace',
    email: 'cmrnwllc@gmail.com',
  };
  initialState.isAuthenticated = true;
  initialState.token = '003ef2d2695ee9855fa66fab24660fbf4e7c4b5c';
}

export default function App() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // React.useEffect(() => {
  //   // Fetch the token from storage then navigate to our appropriate place
  //   const bootstrapAsync = async () => {
  //     let userToken;

  //     try {
  //       userToken = await SecureStore.getItemAsync(SecureStoreEnum.TOKEN);
  //     } catch (e) {
  //       // Restoring token failed
  //     }

  //     // After restoring token, we may need to validate it in production apps

  //     // This will switch to the App screen or Auth screen and this loading
  //     // screen will be unmounted and thrown away.
  //     dispatch({ type: 'RESTORE_TOKEN', token: userToken });
  //   };

  //   bootstrapAsync();
  // }, []);

  const authContext = React.useMemo(() => ({
    state, dispatch,
  }), [state, dispatch]);

  console.log(`app state => ${JSON.stringify(state)}`);

  return (
    <AuthContext.Provider
      value={authContext}
    >
      <NavigationContainer>
        {!state.isAuthenticated ? <AuthenticationStack /> : <TabNavigator props={state} />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
