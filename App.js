import React , { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
//import MMTile from './components/Tile';
import MMGrid from './components/Grid';


export default function App() {

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <MMGrid />
      <Text>Bye</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    flex: 1,
    backgroundColor: 'rgb(220,220,225)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    backgroundColor: "grey" ,
    flexWrap: "wrap",
    height: 100,
    width: 100,
    elevation: 8,
    borderWidth: .5,
  },
  grid:{
    flexShrink: 1,
    flexWrap: "wrap",
    marginTop : 50,
    marginBottom :50,
    marginLeft: 5,
    marginRight:5
  },
});
