import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React from 'react';
import AuthContext from '../store/global/state';
import { favoriteCuveesReducer } from '../store/global/reducer';

const initialState = {
  favorites: [0, 1, 2, 3, 4, 5, 6, 7],
  isFetching: false,
  hasError: false,
};

const placeholder = require('../assets/Single-bottle-filler.png');

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
    // horizontal: true,
  },
  text: {
    fontSize: 42,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

const review = 'Review';

export default function CuveeReviews() {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(favoriteCuveesReducer, initialState);

  return (
    <View height={100} paddingLeft={20} paddingRight={20}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.buttonText}>Reviews</Text>
        <Pressable marginLeft="auto">
          <Text style={styles.buttonText}>View All</Text>
        </Pressable>
      </View>
      <ScrollView styles={styles.scrollView} showsHorizontalScrollIndicator={false}>
        {state.favorites.map((_favorite) => (
          <Text
            key={`img_${_favorite}`}
            source={placeholder}
          >
            {review}
            {_favorite}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
