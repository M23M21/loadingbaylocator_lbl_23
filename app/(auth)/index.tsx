import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../../styles/globalStyles';

export default function AuthIndex() {
  const router = useRouter();

  const handleSignupPress = () => {
    router.push('/(auth)/SignupScreen');
  };

  const handleLoginPress = () => {
    router.push('/(auth)/LoginScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.homeContainer}>
      <Text style={styles.homeTitle}>Loading Bay Locator</Text>
      <Image
        source={require('../../assets/images/loading-bay.jpg')}
        style={styles.homeImage}
      />
      <TouchableOpacity style={styles.homeButton} onPress={handleSignupPress}>
        <Text style={styles.homeButtonText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.homeLinkButton} onPress={handleLoginPress}>
        <Text style={styles.homeLinkText}>ALREADY HAVE AN ACCOUNT?</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
