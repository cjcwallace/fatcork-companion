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
import styles from './styles';
import { vendorReducer } from '../store/global/reducer';

const initialState = {
  vendors: [],
  isFetching: false,
  hasError: false,
};

export default function VendorListScreen() {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(vendorReducer, initialState);

  React.useEffect(() => {
    console.log(` token ${authState.token}`);
    dispatch({
      type: 'FETCH_VENDOR_REQUEST',
    });
    fetch(`${BACKEND_URL}vendor_list/`, {
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
        console.log(resJson);
        dispatch({
          type: 'FETCH_VENDOR_SUCCESS',
          payload: resJson,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: 'FETCH_VENDOR_FAILURE',
        });
      });
  }, [authState.token]);

  // eslint-disable-next-line global-require
  const placeholder = require('../assets/Single-bottle-filler.png');

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {console.log(`isfetching ${state.isFetching}`)}
          {console.log(`vendors ${state.vendors[0]}`)}
          {state.isFetching ? (
            <Text>LOADING...</Text>
          ) : (
            <View style={styles.cuveeList}>
              {state.vendors?.map((_vendor) => (
                <View style={styles.bottleView} key={`vendor${_vendor.id}`}>
                  <Image
                    key={`img${_vendor.id}`}
                    source={_vendor.image_src ? { uri: _vendor.image_src } : placeholder}
                    style={styles.imageLogo}
                  />
                  <Text style={styles.bottleName} key={`title${_vendor.id}`}>{_vendor.name}</Text>
                </View>
              ))}
            </View>
          )}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}
