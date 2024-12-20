import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import WalletCard from '../components/WalletCard';
import DataBundleCard from '../components/DataBundleCard';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <WalletCard />
      <Text style={styles.sectionTitle}>Available Data Bundles</Text>
      <DataBundleCard />
      <DataBundleCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
  },
  sectionTitle: {
    color: '#00f2ff',
    fontSize: 18,
    marginVertical: 10,
  },
});
