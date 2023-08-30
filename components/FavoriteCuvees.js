import {
  Image,
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
  image: {
    height: 256,
    resizeMode: 'contain',
    paddingLeft: 0,
  },
});

export default function FavoriteCuvees() {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(favoriteCuveesReducer, initialState);

  return (
    <View height={256} paddingLeft={20} paddingRight={20}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.buttonText}>Favorites</Text>
        <Pressable marginLeft="auto">
          <Text style={styles.buttonText}>View All</Text>
        </Pressable>
      </View>
      <ScrollView horizontal styles={styles.scrollView}>
        {state.favorites.map((_favorite) => (
          <Image
            key={`img_${_favorite}`}
            source={placeholder}
            style={styles.image}
          />
        ))}
      </ScrollView>
    </View>
  );
}
