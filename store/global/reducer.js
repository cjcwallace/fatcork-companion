import * as SecureStore from 'expo-secure-store';

import { authActionTypes, cuveeActionTypes, vendorActionTypes } from './actions';

import { SecureStoreEnum } from '../../utils/SecureStore';

console.log('in here');
export const authReducer = (state, action) => {
  console.log(`state = ${JSON.stringify(state)}`);
  console.log(`action = ${JSON.stringify(action)}`);
  switch (action.type) {
    case authActionTypes.RESTORE_TOKEN:
      return {
        ...state,
        token: action.token,
        isLoading: false,
      };
    case authActionTypes.LOGIN:
      console.log(`login payload ${JSON.stringify(action.payload)}`);
      SecureStore.setItemAsync(SecureStoreEnum.TOKEN, action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        // user: action.payload.user,
        user: {
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
        },
        token: action.payload.token,
      };
    case authActionTypes.LOGOUT:
      SecureStore.setItemAsync(SecureStoreEnum.TOKEN, null);
      // SecureStore.setItemAsync(SecureStoreEnum.USER, null);
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case authActionTypes.REGISTER:
      SecureStore.setItemAsync(SecureStoreEnum.TOKEN, action.payload.token);
      // SecureStore.setItemAsync(SecureStoreEnum.USER, initialState.user);
      return {
        ...state,
        isAuthenticated: true,
        user: {
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
        },
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export const cuveeReducer = (state, action) => {
  console.log(` type = ${action.type}`);
  switch (action.type) {
    case cuveeActionTypes.REQUEST:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case cuveeActionTypes.SUCCESS:
      console.log('success');
      return {
        ...state,
        isFetching: false,
        cuvees: action.payload,
      };
    case cuveeActionTypes.FAILURE:
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    default:
      return state;
  }
};

export const vendorReducer = (state, action) => {
  console.log(` type = ${action.type}`);
  switch (action.type) {
    case vendorActionTypes.REQUEST:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case vendorActionTypes.SUCCESS:
      console.log('success');
      return {
        ...state,
        isFetching: false,
        vendors: action.payload,
      };
    case vendorActionTypes.FAILURE:
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    default:
      return state;
  }
};
