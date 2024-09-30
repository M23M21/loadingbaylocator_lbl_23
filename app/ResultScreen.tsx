import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/globalStyles';
import { firestore } from '../services/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, query, where, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { convertToCoordinates } from '../services/what3words';

type LoadingBayInfo = {
  id: string;
  name: string;
  location?: string;
  openingTime?: string;
  restrictions?: string;
  what3words?: string;
  directions?: string;
  town?: string;
};

const ResultScreen = () => {
  const [loadingBays, setLoadingBays] = useState<LoadingBayInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { shopName = '', town = '' } = useLocalSearchParams();

  useEffect(() => {
    const fetchFilteredLoadingBays = async () => {
      try {
        const shopNameStr = String(shopName).trim();
        const townStr = String(town).trim();

        if (!shopNameStr || !townStr) {
          Alert.alert('Input Error', 'Invalid search parameters.');
          setIsLoading(false);
          return;
        }

        // Normalize the inputs to lowercase
        const normalizedShopName = shopNameStr.toLowerCase();
        const normalizedTown = townStr.toLowerCase();

        // Firestore query
        const baysQuery = query(
          collection(firestore, 'loadingBays'),
          where('nameLower', '==', normalizedShopName),
          where('townLower', '==', normalizedTown)
        );

        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(baysQuery);
      
      // Map the Firestore documents to LoadingBayInfo objects, ensuring no duplicate 'id' properties
      const baysData: LoadingBayInfo[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as LoadingBayInfo;
        return { ...data, id: doc.id }; // Ensure 'id' is only specified once
      });
        
        setLoadingBays(baysData);
      } catch (error) {
        console.error('Error fetching loading bays:', error);
        Alert.alert('Error', 'Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredLoadingBays();
  }, [shopName, town]);

  // Function to open What3Words website
  const handleWhat3WordsNavigation = (what3words: string) => {
    if (what3words) {
      const url = `https://what3words.com/${what3words}`;
      Linking.openURL(url).catch(() => {
        Alert.alert('Error', 'Unable to open the What3Words link.');
      });
    } else {
      Alert.alert('Error', 'Invalid What3Words address.');
    }
  };

  // Function to open Google Maps for navigation
  const handleGoogleMapsNavigation = async (what3words: string, mode: 'driving' | 'walking') => {
    if (!what3words) {
      Alert.alert('Error', 'Invalid What3Words location.');
      return;
    }

    try {
      // Use the service function to get coordinates
      const coordinates = await convertToCoordinates(what3words);
      
      if (coordinates) {
        const { lat, lng } = coordinates;

        // Construct Google Maps URL
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=${mode}`;

        // Open Google Maps
        Linking.openURL(googleMapsUrl).catch(() => {
          Alert.alert('Error', 'Unable to open Google Maps.');
        });
      } else {
        Alert.alert('Error', 'Failed to get coordinates for navigation.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to get coordinates for navigation.');
    }
  };

  const handleSaveLoadingBay = async (bay: LoadingBayInfo) => {
    try {
      // Fetch saved loading bays from AsyncStorage
      const savedData = await AsyncStorage.getItem('savedLoadingBays');
      const savedBays = savedData ? JSON.parse(savedData) : [];

      // Check if the loading bay is already saved
      const isAlreadySaved = savedBays.some((savedBay: LoadingBayInfo) => savedBay.id === bay.id);

      if (isAlreadySaved) {
        Alert.alert('Info', 'This loading bay is already saved.');
        return;
      }

      // Add the new loading bay to the saved list
      const updatedSavedBays = [...savedBays, bay];
      await AsyncStorage.setItem('savedLoadingBays', JSON.stringify(updatedSavedBays));

      // Provide success feedback to the user
      Alert.alert('Success', `Loading Bay "${bay.name}" saved successfully!`);

    } catch (error) {
      console.error('Error saving loading bay:', error);
      Alert.alert('Error', 'Failed to save the loading bay.');
    }
  };

  const handleLogout = () => {
    router.replace('/(auth)/LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.commonHeader}>
        <Text style={styles.commonHeaderTitle}>Loading Bay Locator</Text>
      </View>

      {/* Content */}
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#3A6BD8" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image source={require('../assets/images/loading-bay.jpg')} style={styles.homeImage} />
          {loadingBays.length > 0 ? (
            loadingBays.map((item) => (
              <View key={item.id}>
                <View style={styles.resultCard}>
                  <Text style={styles.resultInfoLabel}>What3words for Loading Bay is:</Text>
                  <TouchableOpacity onPress={() => handleWhat3WordsNavigation(item.what3words || '')}>
                    <Text style={styles.resultLinkText}>{item.what3words || 'N/A'}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.resultCard}>
                  <Text style={styles.resultInfoLabel}>Opening Time:</Text>
                  <Text style={styles.resultInfoText}>{item.openingTime || 'Not provided'}</Text>
                </View>
                <View style={styles.resultCard}>
                  <Text style={styles.resultInfoLabel}>Restrictions:</Text>
                  <Text style={styles.resultInfoText}>{item.restrictions || 'None'}</Text>
                </View>
                <View style={styles.resultCard}>
                  <Text style={styles.resultInfoLabel}>Location:</Text>
                  <Text style={styles.resultInfoText}>{item.location || 'Not specified'}</Text>
                </View>
                <View style={styles.resultCard}>
                  <Text style={styles.resultInfoLabel}>Directions:</Text>
                  <Text style={styles.resultInfoText}>{item.directions || 'No directions provided'}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.infoTextCenter}>
              No results found for "{shopName}" in "{town}".
            </Text>
          )}
        </ScrollView>
      )}

      {/* Footer with buttons */}
      <View style={styles.footer}>
        {/* Navigation with Google Maps for "Van" */}
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => handleGoogleMapsNavigation(loadingBays[0]?.what3words || '', 'driving')}
        >
          <Ionicons name="car-outline" size={24} color="#3A6BD8" />
          <Text style={styles.footerText}>Van</Text>
        </TouchableOpacity>

        {/* Navigation with Google Maps for "Walk" */}
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => handleGoogleMapsNavigation(loadingBays[0]?.what3words || '', 'walking')}
        >
          <Ionicons name="walk-outline" size={24} color="#3A6BD8" />
          <Text style={styles.footerText}>Walk</Text>
        </TouchableOpacity>

        {/* Search button */}
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/(tabs)/home')}>
          <Ionicons name="search-outline" size={24} color="#3A6BD8" />
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>

        {/* Save button */}
        <TouchableOpacity style={styles.footerItem} onPress={() => handleSaveLoadingBay(loadingBays[0])}>
          <Ionicons name="bookmark-outline" size={24} color="#3A6BD8" />
          <Text style={styles.footerText}>Saved</Text>
        </TouchableOpacity>

        {/* Logout button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResultScreen;
