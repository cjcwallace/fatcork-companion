import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import RegisterForm from './register-form/RegisterForm'
import CuveeList from './inventory-screen/Inventory';

export default function App() {
  return (
    <CuveeList />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
