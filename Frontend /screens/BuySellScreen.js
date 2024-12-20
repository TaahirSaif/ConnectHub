import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function BuySellScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buy or Sell Data</Text>
      <Button title="Buy Data" onPress={() => {}} color="#00f2ff" />
      <Button title="Sell Data" onPress={() => {}} color="#00f2ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  header: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
});
