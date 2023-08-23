/* eslint-disable import/no-extraneous-dependencies */

import {
  Button,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { BACKEND_URL } from '../config';
import AuthContext from '../store/global/state';
import styles from './styles';
import validationSchema from './validation';

export function ErrorMessage({ errorValue }) {
  return errorValue ? (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{errorValue}</Text>
    </View>
  ) : null;
}
ErrorMessage.propTypes = {
  errorValue: PropTypes.string.isRequired,
};

export default function LoginForm() {
  const { dispatch } = React.useContext(AuthContext);

  const initialState = {
    isSubmitting: false,
    errorMessage: null,
  };
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = React.useState(initialState);

  // function handleInputChange (event) {
  //   setData({
  //     ...data,
  //     [event.target.name]: event.target.value
  //   });
  // };

  const handleFormSubmit = (values) => {
    console.log('handle submit');
    setData({
      isSubmitting: true,
      errorMessage: null,
    });
    fetch(`${BACKEND_URL}api/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((resJson) => {
        dispatch({
          type: 'LOGIN',
          payload: resJson,
        });
      })
      .catch((error) => {
        setData({
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };

  // async function onSubmitHandler(values) {
  //   console.log(values);
  //   let response = await fetch(BACKEND_URL + "api/login", {
  //     method: "POST",
  //     headers: {
  //       "Accept": "application/json",
  //       "content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: values["email"],
  //       password: values["password"],
  //     }),
  //   })
  //   .then((response) => response.json())
  //   .catch((error) => {
  //     console.error(error);
  //   });
  //   console.log('response')
  //   console.log(response)
  //   console.log('token')
  //   let token = await fetch(BACKEND_URL + 'api/api-token-auth/', {
  //     method: 'POST',
  //     headers: {
  //       "Accept": "application/json",
  //       "content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: values['email'],
  //       password: values['password'],
  //     }),
  //   })
  //   .then(response => response.json())
  //   .then(data => (
  //     console.log(data)
  //     // save(values['email'], data['token']);
  //   ))
  //   .catch(error => {
  //     console.error(error);
  //   });
  // }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => {
        handleFormSubmit(values);
      }}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        values,
        errors,
        touched,
        handleSubmit,
        handleBlur,
      }) => (
        <View style={styles.container}>
          <View>
            <TextInput
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Email"
              style={styles.input}
            />
            <ErrorMessage
              errorValue={touched.email && errors.email}
            />
          </View>
          <View>
            <TextInput
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholder="Password"
              secureTextEntry
              style={styles.input}
            />
            <ErrorMessage
              errorValue={touched.password && errors.password}
            />
          </View>
          <View>
            <Button
              title="Login"
              style={styles.input}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>
  );
}
