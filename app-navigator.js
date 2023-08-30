/* eslint-disable import/no-extraneous-dependencies */

import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VendorListScreen from './inventory-screen/Vendors';
import ProfileScreen from './profile-screen/Profile';
import HomeScreen from './screens/HomeScreen';
import CuveeScreen from './inventory-screen/Cuvee';
import CuveeListScreen from './inventory-screen/CuveeList';

const Stack = createNativeStackNavigator();

const routeShape = ({
  name: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  params: PropTypes.shape({
    props: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
      isLoading: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }),
      token: PropTypes.string.isRequired,
    }),
  }),
});

// eslint-disable-next-line react/prop-types
function HomeStack({ route }) {
  console.log(`home route ${JSON.stringify(route)}`);
  // eslint-disable-next-line no-unused-vars
  // const { user, ...params } = route.params.props;
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="fatcork" component={HomeScreen} />
    </Stack.Navigator>
  );
}
HomeStack.propTypes = {
  route: PropTypes.shape(routeShape).isRequired,
};

function ProfileStack({ route }) {
  // eslint-disable-next-line no-unused-vars
  const { ...params } = route.params.props;
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: `${params.user.firstName} ${params.user.lastName}`,
        }}
        initialParams={params}
      />
    </Stack.Navigator>
  );
}
ProfileStack.propTypes = {
  route: PropTypes.shape(routeShape).isRequired,
};

function InventoryStack() {
  return (
    <Stack.Navigator
      initialRouteName="CuveeListScreen"
      // screenOptions={{ animation: 'none', header: (props) => NavHeader(props) }}
    >
      <Stack.Screen
        name="CuveeListScreen"
        component={CuveeListScreen}
        options={{
          title: 'Inventory',
        }}
      />
      <Stack.Screen
        name="VendorListScreen"
        component={VendorListScreen}
        options={{
          title: 'Producers',
          headerBackTitle: 'Inventory',
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="CuveeScreen"
        component={CuveeScreen}
        options={{
          title: '',
          headerBackTitle: 'Back',
          animationEnabled: false,
        }}
      />

    </Stack.Navigator>
  );
}
InventoryStack.propTypes = {
  // route: routeShape.isRequired,
};

const tabIcons = (route, focused, color) => {
  let iconName;

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  } else if (route.name === 'Inventory') {
    iconName = focused ? 'bottle-wine' : 'bottle-wine-outline';
    return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
  }

  // You can return any component that you like here!
  return <Ionicons name={iconName} size={24} color={color} />;
};

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator(props) {
  console.log(`tab props = ${JSON.stringify(props)}`);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => tabIcons(route, focused, color, size),
        // tabBarActiveTintColor: 'tomato',
        // tabBarInactiveTintColor: 'gray',
      })}
      activeColor="green"
      inactiveColor="black"
      barStyle={{ backgroundColor: 'lightgreen' }}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#d9d9d9',
        style: {
          borderTopColor: '#66666666',
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} initialParams={props} />
      <Tab.Screen name="Profile" component={ProfileStack} initialParams={props} />
      <Tab.Screen name="Inventory" component={InventoryStack} initialParams={props} />
    </Tab.Navigator>
  );
}
