import React from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Search() {
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const performSearch = async () => {
        try {
          const shopName = await AsyncStorage.getItem('shopName');
          const location = await AsyncStorage.getItem('location');

          // Log values to check if data is fetched
          console.log('Shop Name from AsyncStorage:', shopName);
          console.log('Location from AsyncStorage:', location);

          // Check if both shopName and location are available
          if (!shopName || !location) {
            Alert.alert('Input Error', 'No previous search found. Please enter both shop name and town/postcode on the home page.');
            router.push('/(tabs)/home'); // Redirect to home if no data is found
            return;
          }

          // Navigate to ResultScreen with search parameters
          router.push(`/ResultScreen?shopName=${encodeURIComponent(shopName)}&town=${encodeURIComponent(location)}`);

        } catch (error) {
          console.error('Error performing search:', error);
          Alert.alert('Error', 'Failed to perform the search.');
        }
      };

      performSearch(); // Trigger search when tab is focused
    }, [router])
  );

  return null; // Since this is a search handler, we don't need to render anything
}
