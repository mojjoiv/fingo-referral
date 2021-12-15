import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

const Code = () => {
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

    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <Text>Loading...</Text> : 
      ( <View style={{ flex: 1, flexDirection: 'column', 
           justifyContent:  'space-between'}}>
          <Text style={{ fontSize: 18, color: 'green',  
            textAlign: 'center'}}>{data.name}</Text>
          <Text style={{ fontSize: 14, color: 'green', 
              textAlign: 'center', paddingBottom: 10}}>Referees: {data.length}</Text>
          <FlatList
            data={data}
            keyExtractor={({ _id }, index) => _id}
            renderItem={({ item }) => (
              <Text>{item.email + '. ' + item.name}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Code;