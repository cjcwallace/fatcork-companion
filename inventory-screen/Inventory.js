import {
    Image,
    SafeAreaView,
    Text,
    View,
} from "react-native";
import { useEffect, useState } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";

import { BACKEND_URL } from "../config";

const ErrorMessage = ({ errorValue }) => {
return errorValue ? (
    <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{errorValue}</Text>
    </View>
) : null;
};
  
export default function CuveeList() {
const [cuveeData, setCuveeData]=useState([])

const getData=()=>{
    fetch(BACKEND_URL + "/cuvee_list/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response=>response.json())
    .then(data=>setCuveeData(data))
    .then(data=>console.log(data, 'GOT THE DATA'))
}

useEffect(() => {
    getData();
},[])

return (
    <>
    <SafeAreaView style={styles.topSafeArea} />

    <StatusBar style="light" />

    <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}
            >
        {cuveeData.map(_cuvee=>
            <>
                {_cuvee.image_src &&
                    <Image 
                        key={'img' + _cuvee.id}
                        source={{uri: _cuvee.image_src}}
                        style={styles.image_logo}
                        resizeMode={"contain"}
                        >
                    </Image>
                }
                <Text key={'title' + _cuvee.id}>{_cuvee.title}</Text>
            </>
        )}
        </KeyboardAwareScrollView>
    </SafeAreaView>
    </>
);
}
