import React, {Component} from 'react';  
import {Platform, StyleSheet, Text,TextInput,   TouchableOpacity,
View, Image} from 'react-native';  
  
type Props = {};  
export default class App extends Component<Props> {  
  render() {  
    return (  
      <View style={styles.container}>  
            <Image style={styles.image} source={require('../assets/referral.png')} />
        <Text style={styles.welcome}>Enter Referral Code Here</Text>  
        <TextInput
        style={styles.contaner2}
        placeholder="xyz123456"
        keyboardType="numeric"
      />
       <TouchableOpacity style={styles.loginBtn}
      onPress={this.signin}>
        <Text style={styles.loginText}>Continue</Text>
      </TouchableOpacity>
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
   container: {
    flex: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});  