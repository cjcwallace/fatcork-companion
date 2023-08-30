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
  errorValue: PropTypes.string,
};
ErrorMessage.defaultProps = {
  errorValue: null,
};

export default function RegisterForm() {
  const { dispatch } = React.useContext(AuthContext);

  const initialState = {
    firstName: null,
    lastName: null,
    email: null,
    id: null,
    token: null,
    isSubmitting: false,
    errorMessage: null,
  };
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = React.useState(initialState);

  async function callAPI(values, props) {
    const result = fetch(`${BACKEND_URL}${props.url}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: props.body,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .catch((error) => {
        setData({
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
    return result;
  }

  const handleFormSubmit = async (values) => {
    console.log('handle submit');
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    const register = await callAPI(values, {
      url: 'api/register',
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      }),
    });
    console.log(`register results ====== ${JSON.stringify(register)}`);
    const token = await callAPI(values, {
      url: 'api/api-token-auth/',
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    console.log(`token results ====== ${JSON.stringify(token)}`);
    const payload = { ...register, ...token };
    console.log(`payload ====== ${JSON.stringify(payload)}`);
    dispatch({
      type: 'REGISTER',
      payload,
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
            firstName: 'Bryan',
            lastName: 'Maletis',
            email: 'bryan@fatcork.com',
            password: 'password',
            confirmPassword: 'password',
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
