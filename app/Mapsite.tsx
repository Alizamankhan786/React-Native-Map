import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


interface SinglePlace {
  latitude: number;
  longitude: number
}

interface AllPlaces {
  fsq_id: string;
  name: string
}

const MapSite = () => {
  const [location, setLocation] = useState<null | any>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [search, setSearch] = useState(``);
  const [places , setPlaces] = useState <null | AllPlaces[]> (null);
  const [singlesearchPlace , setsinglesearchPlace] = useState<null| SinglePlace>(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);

    })();
  }, []);

  const searchPlaces = () => {
    if (!location || !search) {
      console.error("Location or search term is not available");
      return;
    }
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3qbL9ORBTq2ZaS6TUHxpAQZNDJjTlkT2lBeAynwmhZ8I='
      }
    };
  
    fetch(`fsq37ky2N/8LvcPO8+tc/4mi0SlpTsBSrFatKKKkFA6oxQ0=${search}&ll=${location.coords.latitude}%2C${location.coords.longitude}&radius=100000`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res.results);
        setPlaces(res.results);
      })
      .catch(err => console.error(err));
  };  

  const singlePlaces = (item : any) => {
    setPlaces(null);
    setsinglesearchPlace({
    latitude: item.geocodes.main.latitude,
    longitude: item.geocodes.main.longitude,
  });



  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  return (
    <View style={styles.container}>
    <Text style={styles.paragraph}>{text}</Text>
    <TextInput
  style={styles.input}
  onChangeText={setSearch}
  value={search}
  placeholder="Search Locations"
  placeholderTextColor="#888"
/>

    <TouchableOpacity onPress={searchPlaces} style={styles.button}>
        <Text>Search</Text>
      </TouchableOpacity>
      {places && <FlatList
         data={places}
         renderItem={({item}: {item: {name: string}}) => {
          return <View style={styles.list}>
            <Text onPress={()=>singlePlaces(item)}>{item.name}</Text>
          </View>
         }}
         keyExtractor={(item:{fsq_id: string}) => item.fsq_id
         }
        />}


    {location && <MapView style={styles.map} initialRegion={{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0001,
      longitudeDelta: 0.0001,
    }}>
      <Marker coordinate={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }}>
        {singlesearchPlace && <Marker coordinate={{
          latitude: singlesearchPlace.latitude,
          longitude: singlesearchPlace.longitude,
        }}/>}

      </Marker>
    </MapView>
    
    
    }
    </View>     
  );
};

export default MapSite;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: '70%',
    marginTop: 40,
  },
  input: {
    height: 40,
    width: 180,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 20,
    borderRadius: 40,
    width: 110,
  },
  list: {
    backgroundColor: 'gray',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 5,
    width: 280
  }
})