import * as SecureStore from 'expo-secure-store';

import {
  authActionTypes,
  cuveeActionTypes,
  inventoryActionTypes,
  vendorActionTypes,
} from './actions';

import { SecureStoreEnum } from '../../utils/SecureStore';

console.log('in here');
export const authReducer = (state, action) => {
  console.log(`auth start state = ${JSON.stringify(state)}`);
  console.log(`auth start action = ${JSON.stringify(action)}`);
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
      // SecureStore.setItemAsync(SecureStoreEnum.USER, action.payload.user.id);
      return {
        ...state,
        isAuthenticated: true,
        user: {
          id: action.payload.id,
          firstName: action.payload.first_name,
          lastName: action.payload.last_name,
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
      // SecureStore.setItemAsync(SecureStoreEnum.USER, action.payload.user.id);
      console.log(`register state = ${JSON.stringify(state)}`);
      console.log(`register action = ${JSON.stringify(action)}`);
      return {
        ...state,
        isAuthenticated: true,
        user: {
          id: action.payload.id,
          firstName: action.payload.first_name,
          lastName: action.payload.last_name,
          email: action.payload.email,
        },
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export const inventoryReducer = (state, action) => {
  console.log(` type = ${action.type}`);
  switch (action.type) {
    case inventoryActionTypes.REQUEST:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case inventoryActionTypes.SUCCESS:
      console.log('inventory success');
      return {
        ...state,
        isFetching: false,
        cuvees: action.payload,
      };
    case inventoryActionTypes.FAILURE:
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    default:
      return state;
  }
};

export const cuveeReducer = (state, action) => {
  console.log(` type = ${action.type}`);
  switch (action.type) {
    case cuveeActionTypes.REQUEST:
      console.log('cuvee request');
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case cuveeActionTypes.SUCCESS:
      console.log('cuvee success');
      return {
        ...state,
        isFetching: false,
        cuvee: action.payload,
      };
    case cuveeActionTypes.FAILURE:
      console.log('cuvee failure');
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
      console.log('vendor request');
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case vendorActionTypes.SUCCESS:
      console.log('vendor success');
      return {
        ...state,
        isFetching: false,
        vendors: action.payload,
      };
    case vendorActionTypes.FAILURE:
      console.log('vendor failure');
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    default:
      return state;
  }
};
