import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WalletCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.balanceText}>Wallet Balance</Text>
      <Text style={styles.amount}>₦12,500</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  balanceText: {
    color: '#6c757d',
    fontSize: 14,
  },
  amount: {
    color: '#00f2ff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
