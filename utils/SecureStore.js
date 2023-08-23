import * as SecureStore from 'expo-secure-store';

export const SecureStoreEnum = Object.freeze({
  TOKEN: 'token',
  USER: 'user',
});

export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    alert(`🔐 Here's your value 🔐 \n${result}`);
    return result;
  }
  alert('No values stored under that key.');
  return null;
}
