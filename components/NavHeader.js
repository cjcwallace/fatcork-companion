import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

import { Header } from '@react-navigation/elements';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const navState = { inventoryColor: 'black', vendorColor: 'black' };

export default function NavHeader(props) {
  const navigation = useNavigation();

  const [buttonColors, setButtonColors] = React.useState(navState);

  console.log(`nav props ${JSON.stringify(props)}`);
  const { title } = props.options;
  const { name } = props.route;
  console.log(`name ${name}`);

  if (name === 'InventoryScreen') {
    setButtonColors({ inventoryColor: 'green', vendorColor: 'black' });
  } else if (name === 'VendorScreen') {
    setButtonColors({ inventoryColor: 'black', vendorColor: 'green' });
  }

  return (
    <SafeAreaView>
      <Header title={title} />
      <View style={{ flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto' }}>
        <Pressable
          marginRight={100}
          onPress={() => {
            console.log('pressed inventory');
            navigation.navigate('InventoryScreen');
          }}
        >
          <Text style={{
            color: buttonColors.inventoryColor, fontWeight: 'bold', fontSize: 18, textAlign: 'center',
          }}
          >
            Cuvees
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            console.log('pressed vendor');
            navigation.navigate('VendorScreen');
          }}
        >
          <Text style={{
            color: buttonColors.vendorColor, fontWeight: 'bold', fontSize: 18, textAlign: 'center',
          }}
          >
            Vendors
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
