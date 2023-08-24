// import * as SecureStore from 'expo-secure-store';

import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { BACKEND_URL } from '../config';
import AuthContext from '../store/global/state';
import { cuveeReducer } from '../store/global/reducer';
import styles from './styles';

// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const initialState = {
  cuvee: [],
  isFetching: false,
  hasError: false,
};

// eslint-disable-next-line global-require
const placeholder = require('../assets/Single-bottle-filler.png');

// import { SecureStoreEnum } from '../utils/SecureStore';
export default function CuveeScreen({ route }) {
  console.log(`route params = ${JSON.stringify(route.params)}`);
  const { itemId } = route.params;

  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(cuveeReducer, initialState);

  React.useEffect(() => {
    console.log(` token ${authState.token}`);
    dispatch({
      type: 'FETCH_CUVEE_REQUEST',
    });
    fetch(`${BACKEND_URL}cuvee/${itemId}`, {
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
        console.log(`cuvee = ${JSON.stringify(resJson)}`);
        dispatch({
          type: 'FETCH_CUVEE_SUCCESS',
          payload: resJson,
        });
      })
      .catch((error) => {
        console.log(`error = ${JSON.stringify(error)}`);
        dispatch({
          type: 'FETCH_CUVEE_FAILURE',
        });
      });
  }, [authState.token, itemId]);

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" />
      <SafeAreaView style={styles.cuveeContainer}>
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {console.log(`isfetching ${state.isFetching}`)}
          {console.log(`cuvee ${JSON.stringify(state.cuvee)}`)}
          {state.isFetching ? (
            <Text>LOADING...</Text>
          ) : (
            <View key={`cuvee_${state.cuvee.id}`} style={styles.cuveeView}>
              <Image
                key={`img_${state.cuvee.id}`}
                source={state.cuvee.image_src ? { uri: state.cuvee.image_src } : placeholder}
                style={styles.singleCuveeMainImage}
              />
              <Text style={styles.cuveeDetail} key={`title_${state.cuvee.id}`}>
                title
                {state.cuvee.title}
              </Text>
              <Text style={styles.cuveeDetail} key={`vendor_${state.cuvee.id}`}>
                vendor
                {state.cuvee.vendor}
              </Text>
              <Text style={styles.cuveeDetail} key={`vintage_${state.cuvee.id}`}>
                title
                {state.cuvee.vintage}
              </Text>
              <Text style={styles.cuveeDetail} key={`see_${state.cuvee.id}`}>
                see
                {state.cuvee.see}
              </Text>
              <Text style={styles.cuveeDetail} key={`smell_${state.cuvee.id}`}>
                smell
                {state.cuvee.smell}
              </Text>
              <Text style={styles.cuveeDetail} key={`taste_${state.cuvee.id}`}>
                taste
                {state.cuvee.taste}
              </Text>
              <Text style={styles.cuveeDetail} key={`pair_${state.cuvee.id}`}>
                pair
                {state.cuvee.pair}
              </Text>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>ADD REVIEW</Text>
              </Pressable>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>ADD TO FAVORITES</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
CuveeScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      itemId: PropTypes.number.isRequired,
    }),
  }).isRequired,
};
