// import React from 'react'
// import { View, Text } from 'react-native'
// import 'react-native-gesture-handler';

// const Home = () => {
//   return (
//     <View style={{
//       justifyContent: "center",
//       alignItems: "center",
//       margin: 20,
//     }}>
//       <Text style={{
//         fontSize: 25,
//         fontWeight: "bold",
//       }}>Map</Text>
//     </View>
//   )
// }

// export default Home;

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function Home() {
  return (
    <View style={styles.container}>


      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://wallpapers.com/images/hd/world-map-4k-with-landmarks-koju4cfix14l2fg4.jpg' }} // Replace with actual image URL
        />
        <Text style={styles.greeting}>Hello, Users!</Text>
      </View>

      <Text style={styles.question}>Where are you going today?</Text>


      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <FontAwesome name="dot-circle-o" size={24} color="lightblue" />
          <TextInput
            style={styles.input}
            placeholder="Your Current Location"
            placeholderTextColor="#A9A9A9"
          />
          <MaterialIcons name="more-horiz" size={24} color="gray" />
        </View>

        <View style={styles.inputRow}>
          <FontAwesome name="map-marker" size={24} color="#A9A9A9" />
          <TextInput
            style={styles.input}
            placeholder="Work"
            placeholderTextColor="#A9A9A9"
          />
          <MaterialIcons name="clear" size={24} color="gray" />
        </View>
      </View>


      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="menu" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.otherButton}>
          <MaterialIcons name="filter-list" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E', // Dark background
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  greeting: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  question: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 40,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E', // Slightly lighter dark background
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: '#2C2C2E',
    padding: 15,
    borderRadius: 10,
  },
  startButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  otherButton: {
    backgroundColor: '#2C2C2E',
    padding: 15,
    borderRadius: 10,
  },
});

