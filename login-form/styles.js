import { Platform, StyleSheet, ViewStyle } from 'react-native';

import Constants from 'expo-constants';

const HEADER_BACKGROUND = '#3498db';
const CONTENT_BACKGROUND = '#f9f9f9';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

export default styles;
