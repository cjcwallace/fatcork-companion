import {
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  
  import { Formik } from "formik";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  import React from "react";
  import { StatusBar } from "expo-status-bar";
  import { styles } from "./styles";
  import { validationSchema } from "./validation";
  
  const ErrorMessage = ({ errorValue }) => {
    return errorValue ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorValue}</Text>
      </View>
    ) : null;
  };
  
  export default function RegisterForm() {
    function onSubmitHandler(values) {
      console.log(values);
    }
  
    return (
      <>
        <SafeAreaView style={styles.topSafeArea} />
  
        <StatusBar style="light" />
  
        <SafeAreaView style={styles.container}>
          
        </SafeAreaView>
      </>
    );
  }
  