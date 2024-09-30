import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { styles } from '../../styles/globalStyles';

export default function Home() {
  const [shopName, setShopName] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  useEffect(() => {
    const clearSearchData = async () => {
      await AsyncStorage.removeItem('shopName');
      await AsyncStorage.removeItem('location');
    };
    clearSearchData(); 
  }, []);

  const saveSearchData = async () => {
    try {
      if (shopName.trim() && location.trim()) {
        await AsyncStorage.setItem('shopName', shopName.trim());
        await AsyncStorage.setItem('location', location.trim());
      }
    } catch (error) {
      console.error('Error saving search data:', error);
    }
  };

  const handleSearch = async () => {
    if (!shopName.trim() || !location.trim()) {
      Alert.alert('Input Error', 'Please enter both shop name and town.');
      return;
    }

    await saveSearchData(); 

    
    router.push(`/ResultScreen?shopName=${encodeURIComponent(shopName)}&town=${encodeURIComponent(location)}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.commonHeader}>
        <Text style={styles.commonHeaderTitle}>Loading Bay Locator</Text>
      </View>

      <ScrollView contentContainerStyle={styles.homeContainer}>
        <Image source={require('../../assets/images/loading-bay.jpg')} style={styles.homeImage} />
        <View style={{ width: '100%', paddingHorizontal: 20 }}>
          <TextInput
            style={styles.authInput}
            placeholder="Warehouse/Shop"
            value={shopName}
            onChangeText={setShopName}
            onBlur={saveSearchData}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.authInput}
            placeholder="Town"
            value={location}
            onChangeText={setLocation}
            onBlur={saveSearchData}
            autoCapitalize="none"
          />
        </View>

        {/* Search Button */}
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Button title="Search" onPress={handleSearch} />
        </View>
      </ScrollView>
    </View>
  );
}
