import React, {Component, useEffect, useState } from 'react';  
import {Platform, StyleSheet, Text,TextInput,   TouchableOpacity, TouchableHighlight,
View, Image} from 'react-native';  
import { Appbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

  
type Props = {};  
export default class App extends Component<Props> {  

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch('https://api-v1-staging-eks.fingo.africa/auth/fe_test//redeem_referral')
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          items: result
        });
      });
  }
  
  render() {  
    
    return (  
      <View style={styles.container}>  
      <View style={styles.header}></View>
            <Image style={styles.image} source={require('../assets/referral.png')} />
        <Text style={styles.welcome}>Enter Referral Code Here</Text>  
        <TextInput
        style={styles.contaner2}
        placeholder="xyz123456"
        keyboardType="alphanumeric"
      />
       <TouchableOpacity style={styles.loginBtn}
      onPress={this.check}>
        <Text style={styles.loginText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
          <TouchableHighlight onPress={() => navigation.navigate("code")}
                    style={styles.bottomButtons}>
              <Text style={styles.footerText}>Referral Code</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => navigation.navigate("profile")}
                  style={styles.bottomButtons}>
              <Text style={styles.footerText}>Profile</Text>
          </TouchableHighlight>
          </View>
      </View> 
    );  
  }  
}  
const styles = StyleSheet.create({  
  welcome: {  
    fontSize: 20,  
    textAlign: 'center',  
    margin: 10,  
  },
  header:{
    backgroundColor: "#5578BD",
    height:200,
  },
  image: {
    marginBottom: 40,
    width: 150,
    height: 150,
  },
   contaner2: {
      fontSize: 20,  
    textAlign: 'center',  
    margin: 10,  
    }, 

     loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#5578BD',
  }, 
   bottomButtons: {
  alignItems:'center',
  justifyContent: 'center',
  flex:1,
  color: 'white'
},
footerText: {
  color: 'white'
},
   container: {
    flex: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});  