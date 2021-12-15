import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// You can import from local files
import AssetExample from './components/AssetExample';
import Code from './components/Code'
import Page from './components/Page';
import Login from './components/Login';
import Profile from './components/Profile'

// or any pure javascript modules available in npm
import { Card, Box } from 'react-native-paper';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login">
              <Stack.Screen style={styles.container2} name="login" component={Login} />
        <Stack.Screen style={styles.container2} name="code" component={Code} />
          <Stack.Screen style={styles.container2} name="referral" component={Page} />
        <Stack.Screen style={styles.container2} name="profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  contaner2: {
      fontSize: 20,  
    textAlign: 'center',  
    margin: 10,  
    }, 
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
