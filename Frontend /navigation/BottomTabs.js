import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import TopUpScreen from '../screens/TopUpScreen';
import BuySellScreen from '../screens/BuySellScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import ReferralScreen from '../screens/ReferralScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'TopUp') iconName = 'wallet-outline';
          else if (route.name === 'BuySell') iconName = 'swap-horizontal-outline';
          else if (route.name === 'Analytics') iconName = 'stats-chart-outline';
          else if (route.name === 'Referral') iconName = 'people-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: '#1a1a2e', borderTopWidth: 0 },
        tabBarActiveTintColor: '#00f2ff',
        tabBarInactiveTintColor: '#6c757d',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="TopUp" component={TopUpScreen} />
      <Tab.Screen name="BuySell" component={BuySellScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Referral" component={ReferralScreen} />
    </Tab.Navigator>
  );
}
import { Ionicons } from '@expo/vector-icons';

<TouchableOpacity
  style={{
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#00f2ff',
    borderRadius: 50,
    padding: 15,
  }}
  onPress={() => navigation.navigate('Chatbot')}
>
  <Ionicons name="chatbubble-outline" size={24} color="#000" />
</TouchableOpacity>;
