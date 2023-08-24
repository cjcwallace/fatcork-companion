// import * as SecureStore from 'expo-secure-store';
/* eslint-disable import/no-extraneous-dependencies */

import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { inventoryReducer } from '../store/global/reducer';
import styles from './styles';
import { BACKEND_URL } from '../config';
import AuthContext from '../store/global/state';

// import { SecureStoreEnum } from '../utils/SecureStore';

const initialState = {
  cuvees: [],
  isFetching: false,
  hasError: false,
};

export default function CuveeList() {
  const navigation = useNavigation();

  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(inventoryReducer, initialState);

  // const cuveeList = React.useMemo(
  //   ()
  // )

  // const [value, onChangeValue] = React.useState('Your value here');

  React.useEffect(() => {
    console.log(` token ${authState.token}`);
    dispatch({
      type: 'FETCH_INVENTORY_REQUEST',
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
          type: 'FETCH_INVENTORY_SUCCESS',
          payload: resJson,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: 'FETCH_INVENTORY_FAILURE',
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
          {console.log(`cuvees ${JSON.stringify(state.cuvees[0])}`)}
          {state.isFetching ? (
            <Text>LOADING...</Text>
          ) : (
            <View style={styles.cuveeList}>
              {state.cuvees?.map((_cuvee) => (
                <Pressable
                  key={`pressable_${_cuvee.id}`}
                  onPress={() => {
                    console.log(`pressed ${_cuvee.id}`);
                    navigation.navigate('CuveeScreen', {
                      itemId: _cuvee.id,
                      // otherParam: 'anything you want here',
                    });
                  }}
                  style={styles.bottleView}
                >
                  <View key={`cuvee_${_cuvee.id}`}>
                    <Image
                      key={`img_${_cuvee.id}`}
                      source={_cuvee.image_src ? { uri: _cuvee.image_src } : placeholder}
                      style={styles.imageLogo}
                    />
                    <Text style={styles.bottleName} key={`title_${_cuvee.id}`}>{_cuvee.title}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}

CuveeList.propTypes = {
  // navigation: PropTypes.func.isRequired,
};
