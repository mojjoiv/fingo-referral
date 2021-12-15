import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

export default function Login() {
  const [Username, setUsername] = useState('');
  const [UsernameError, setUsernameError] = useState('');

  const [Password, setPassword] = useState('');
  const [PasswordError, setPasswordError] = useState('');

  const [message, setMessage] = useState('');

  const signin = async () => {
    if (Username != '' && Password != '') {
      // alert('Thank you for sign in');
      await fetch(
        'https://api-v1-staging-eks.fingo.africa/auth/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            Username: Username,
            Password: Password,
          }),
        }
      )
        .then((res) => res.json())
        .then((resData) => {
          setMessage(resData.message);
        });
    }

    if (Username != '') {
      alert(Username);
      setUsernameError('');
    } else {
      setUsernameError('Hey ! Username should not be empty');
    }

    if (Password != '') {
      alert(Password);
      setPasswordError('');
    } else {
      setPasswordError('your Password should not be empty');
    }
  };

  const forgot = () => {
    alert('forgot Password');
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 20, fontSize: 15, color: 'green' }}>
        {message}
      </Text>
      <Image style={styles.image} source={require('../assets/ref.png')} />
      <Text style={{color: '#003f5c', fontSize: 30, textAlign: 'center'}}>REFERRAL APP</Text>
      <StatusBar style="auto" />
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username."
          value={Username}
          placeholderTextColor="#003f5c"
          onChangeText={(Username) => setUsername(Username)}
          onChange={() => setUsernameError('')}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          value={Password}
          secureTextEntry={true}
          onChangeText={(Password) => setPassword(Password)}
          onChange={() => setPasswordError('')}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}
      onPress={this.signin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  image: {
    marginBottom: 40,
    width: 150,
    height: 150,
  },

  inputView: {
    backgroundColor: '#E5E5E5',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
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
});
