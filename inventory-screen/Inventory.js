import { Image, SafeAreaView, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { BACKEND_URL } from "../config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";

const ErrorMessage = ({ errorValue }) => {
  return errorValue ? (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{errorValue}</Text>
    </View>
  ) : null;
};

export default function CuveeList() {
  const [cuveeData, setCuveeData] = useState([]);

  const getData = () => {
    fetch(BACKEND_URL + "/cuvee_list/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCuveeData(data))
      .then((data) => console.log(data, "GOT THE DATA"));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {cuveeData.map((_cuvee) => (
            <View key={"cuvee" + _cuvee.id}>
              {_cuvee.image_src
                ? <Image
                  key={"img" + _cuvee.id}
                  source={{ uri: _cuvee.image_src }}
                  style={styles.image_logo}
                  resizeMode={"contain"}
                />
                : <Image
                  key={"img" + _cuvee.id}
                  source={{ uri: "https://fatcork.com/cdn/shop/products/SingleBottle_Filler_1_aa6d30a5-1fb8-42e8-95e6-a912c21ccdd8_640x@2x.jpg?v=1632951620" }}
                  style={styles.image_logo}
                  resizeMode={"contain"}
                />
              }
              <Text key={"title" + _cuvee.id}>{_cuvee.title}</Text>
            </View>
          ))}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}
