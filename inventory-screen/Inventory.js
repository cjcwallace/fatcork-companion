// import * as SecureStore from 'expo-secure-store';

import {
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { BACKEND_URL } from '../config';
import AuthContext from '../store/global/state';
import { cuveeReducer } from '../store/global/reducer';
import styles from './styles';

// import { SecureStoreEnum } from '../utils/SecureStore';

const initialState = {
  cuvees: [],
  isFetching: false,
  hasError: false,
};

// const reducer = (state, action) => {
//   { console.log(` type = ${action.type}`); }
//   switch (action.type) {
//     case 'FETCH_CUVEE_REQUEST':
//       return {
//         ...state,
//         isFetching: true,
//         hasError: false,
//       };
//     case 'FETCH_CUVEE_SUCCESS':
//       { console.log('success'); }
//       return {
//         ...state,
//         isFetching: false,
//         cuvees: action.payload,
//       };
//     case 'FETCH_CUVEE_FAILURE':
//       return {
//         ...state,
//         hasError: true,
//         isFetching: false,
//       };
//     default:
//       return state;
//   }
// };

export default function CuveeList() {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(cuveeReducer, initialState);

  // const cuveeList = React.useMemo(
  //   ()
  // )

  // const [value, onChangeValue] = React.useState('Your value here');

  React.useEffect(() => {
    console.log(` token ${authState.token}`);
    dispatch({
      type: 'FETCH_CUVEE_REQUEST',
    });
    fetch(`${BACKEND_URL}cuvee_list/`, {
      headers: {
        Authorization: ` Token ${authState.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((resJson) => {
        dispatch({
          type: 'FETCH_CUVEE_SUCCESS',
          payload: resJson,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: 'FETCH_CUVEE_FAILURE',
        });
      });
  }, [authState.token]);

  // eslint-disable-next-line global-require
  const placeholder = require('../assets/Single-bottle-filler.png');

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {console.log(`isfetching ${state.isFetching}`)}
          {console.log(`cuvees ${state.cuvees[0]}`)}
          {state.isFetching ? (
            <Text>LOADING...</Text>
          ) : (
            <View style={styles.cuveeList}>
              {state.cuvees?.map((_cuvee) => (
                <View style={styles.bottleView} key={`cuvee${_cuvee.id}`}>
                  <Image
                    key={`img${_cuvee.id}`}
                    source={_cuvee.image_src ? { uri: _cuvee.image_src } : placeholder}
                    style={styles.imageLogo}
                  />
                  <Text style={styles.bottleName} key={`title${_cuvee.id}`}>{_cuvee.title}</Text>
                </View>
              ))}
            </View>
          )}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}
