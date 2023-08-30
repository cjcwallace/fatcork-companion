import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginFormScreen from './login-form/LoginForm';
import LoginOrRegisterScreen from './screens/LoginOrRegisterScreen';
import RegisterFormScreen from './register-form/RegisterForm';

const Stack = createNativeStackNavigator();

export default function AuthenticationStack() {
  return (
    <Stack.Navigator initialRouteName="LoginOrRegisterScreen">
      <Stack.Screen
        name="LoginOrRegisterScreen"
        component={LoginOrRegisterScreen}
      />
      <Stack.Screen name="RegisterScreen" component={RegisterFormScreen} />
      <Stack.Screen name="LoginScreen" component={LoginFormScreen} />
    </Stack.Navigator>
  );
}
