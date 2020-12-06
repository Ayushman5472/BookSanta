import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import firebase from 'firebase'
import db from './config'
import WelcomeScreen from './Screens/welcomeScreen'
import Santa from './components/Santa'

export default class App extends React.Component {
render(){ 
  return (
    <View style={styles.container}>
      <Santa></Santa>
    <WelcomeScreen></WelcomeScreen>
      <StatusBar style="auto" />
    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
