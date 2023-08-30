/* eslint-disable no-unused-vars */

import {
  StatusBar,
  Text,
  View,
} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

export default function HomeScreen() {
  const bryanEmailText = 'Archive of Bryan\'s emails to members/email subscribers?';
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Text>Welcome to fatcork!</Text>
      <Text />
      <Text />
      <Text />
      <Text />
      <Text>Ideas:</Text>
      <Text>Event calendar</Text>
      <Text>Current members only deals</Text>
      <Text>Staff Favorites</Text>
      <Text>{bryanEmailText}</Text>
    </View>
  );
}
