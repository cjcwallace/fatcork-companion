import {
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CuveeReviews from '../components/CuveeReviews';
import DrankList from '../components/DrankList';
import FavoriteCuvees from '../components/FavoriteCuvees';

export default function ProfileScreen({ route, navigation }) {
  console.log(`profile route ${JSON.stringify(route)}`);
  const { ...params } = route.params;

  const welcomeText = `Welcome back ${params.user.firstName}!`;

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>{welcomeText}</Text>
        <FavoriteCuvees />
        <CuveeReviews />
        <DrankList />
      </ScrollView>
    </SafeAreaView>
  );
}

ProfileScreen.propTypes = {
  route: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    params: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
      isLoading: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }),
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
