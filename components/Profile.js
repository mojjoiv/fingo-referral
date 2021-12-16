import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

export default function Profile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await fetch("https://api-v1-staging-eks.fingo.africa/auth/fe_test/user");
    const data = await resp.json();
    setData(data);
    setLoading(false);
  };

  const renderItem = ( item ) => {
    return (
      <View style={{ flex: 1, color: '#5578BD' }}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{ uri: 'https://picsum.photos/200'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.info}>UX Designer / Mobile developer</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>{item.name}</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Referral code</Text> 
              </TouchableOpacity>
            </View>
        </View>

         <View style={styles.footer}>
          <TouchableHighlight onPress={(navigation) => navigation.navigate("referral")}
                    style={styles.bottomButtons}>
              <Text style={styles.footerText}>Referral Code</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={(navigation) => navigation.navigate("code")}
                  style={styles.bottomButtons}>
              <Text style={styles.footerText}>Referees</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={(navigation) => navigation.navigate("profile")}
                  style={styles.bottomButtons}>
              <Text style={styles.footerText}>My Contacts</Text>
          </TouchableHighlight>
          </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#5578BD",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
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
footer: {
  position: 'absolute',
  flex:0.1,
  left: 0,
  right: 0,
  bottom: -10,
  backgroundColor:'#5578BD',
  flexDirection:'row',
  height:80,
  alignItems:'center',
},
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#5578BD",
  },
});
