/* eslint-disable import/no-extraneous-dependencies */

import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { BACKEND_URL } from '../config';
import AuthContext from '../store/global/state';
import styles from './styles';
import { validationSchema } from './validation';

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

export default function RegisterForm() {
  const { dispatch } = React.useContext(AuthContext);

  const initialState = {
    isSubmitting: false,
    errorMessage: null,
  };
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = React.useState(initialState);

  const handleFormSubmit = (values) => {
    console.log('handle submit');
    setData({
      isSubmitting: true,
      errorMessage: null,
    });
    fetch(`${BACKEND_URL}api/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log(`resjson = ${JSON.stringify(res.json())}`);
          return fetch(`${BACKEND_URL}api/api-token-auth/`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          });
        }
        throw res;
      })
      .then((resJson) => {
        console.log(`token json = ${resJson}`);
        dispatch({
          type: 'REGISTER',
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

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      {/* eslint-disable react/style-prop-object */}
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>fatcork SignUp</Text>
        </View>
        {/* https://formik.org/docs/overview */}
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values) => {
            // onSubmitHandler(values, actions);
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
            // https://github.com/APSL/react-native-keyboard-aware-scroll-view
            <KeyboardAwareScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.formGroup}>
                <Text style={styles.label}>First Name</Text>

                <TextInput
                  style={styles.input}
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                />

                <ErrorMessage
                  errorValue={touched.firstName && errors.firstName}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Last Name</Text>

                <TextInput
                  style={styles.input}
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Email Address</Text>

                <TextInput
                  style={styles.input}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                />

                <ErrorMessage errorValue={touched.email && errors.email} />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Password</Text>

                <TextInput
                  style={styles.input}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  autoCapitalize="none"
                  secureTextEntry
                />

                <ErrorMessage
                  errorValue={touched.password && errors.password}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Confirm Password</Text>

                <TextInput
                  style={styles.input}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  autoCapitalize="none"
                  secureTextEntry
                />

                <ErrorMessage
                  errorValue={touched.confirmPassword && errors.confirmPassword}
                />
              </View>
              <View>
                <Button
                  title="Submit"
                  style={styles.input}
                  onPress={handleSubmit}
                />
              </View>
              {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>SUBMIT</Text>
              </TouchableOpacity> */}
            </KeyboardAwareScrollView>
          )}
        </Formik>
      </SafeAreaView>
    </>
  );
}
