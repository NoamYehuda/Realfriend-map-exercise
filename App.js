import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import MapView from 'react-native-maps';
import HomePageMap from './components/HomePageMap';
export default function App() {
  console.log('app executed')
  return (
    <View style={styles.container}>
      <HomePageMap />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
