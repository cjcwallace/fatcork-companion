import {
  Button,
  View,
} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

export default function LoginOrRegisterScreen({ navigation }) {
  return (
    <View>
      <Button
        onPress={() => navigation.navigate('RegisterScreen')}
        title="Register"
      >
        Register
      </Button>
      <Button onPress={() => navigation.navigate('LoginScreen')} title="Login">
        Login
      </Button>
    </View>
  );
}
LoginOrRegisterScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
