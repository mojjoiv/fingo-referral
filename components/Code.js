import React, { useEffect, useState } from 'react';
import { FlatList,Image, Text, View, StyleSheet,TouchableOpacity, TouchableHighlight, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Code = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch('https://api-v1-staging-eks.fingo.africa/auth/fe_test/claimed_referrals')
      .then((response) => response.json())
      .then((json) => setData(json?.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (

    <View style={{ flex: 1,color: '#5578BD' }}>
    
      {isLoading ? <Text>Loading...</Text> : 
      ( <View style={{ flex: 1, flexDirection: 'column', 
           justifyContent:  'space-between'}}>
          <Text style={{ fontSize: 18, color: 'green',  
            textAlign: 'center'}}>{data.name}</Text>
          <Text style={{ fontSize: 14, color: '#FFF', 
              textAlign: 'center',backgroundColor: "#5578BD",  height:100, 
              paddingTop: 30, paddingBottom: 10}}>Referees: {data.length}</Text>
          <FlatList
            data={data}
            keyExtractor={({ _id }, index) => _id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.form}>
 <Text style={{fontWeight: '700', marginRight: 5, borderRadius: 400/ 2}}> Name : {item.name}</Text>
 <Text style={styles.lightText}>Email : {item.email}</Text>
 <Text style={styles.lightText}>Username : {item.username}</Text>
 <Image style={{ width: 50, height: 50, borderRadius: 400/ 2, textAlign: 'right' }} 
        source={{ uri: `${item.profilePicture}` }} />
        
 </TouchableOpacity>
              
            )}
          />

        </View>
      )}

      <View style={styles.footer}>
          <TouchableHighlight onPress={() => navigation.navigate("referral")}
                    style={styles.bottomButtons}>
              <Text style={styles.footerText}>Referral Code</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => navigation.navigate("profile")}
                  style={styles.bottomButtons}>
              <Text style={styles.footerText}>Profile</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => navigation.navigate("profile")}
                  style={styles.bottomButtons}>
              <Text style={styles.footerText}>My Contacts</Text>
          </TouchableHighlight>
          </View>
    </View>
    
    
  );
};

const styles = StyleSheet.create({
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
form: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 5,
    left: 0,
    right: 0,
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

});

export default Code;