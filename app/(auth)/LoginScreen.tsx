import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { styles } from '../../styles/globalStyles';
import * as EmailValidator from 'email-validator';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    let isValid = true;

    
    setEmailError('');
    setPasswordError('');

    
    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!EmailValidator.validate(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    
    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)/home'); 
    } catch (error: any) {
      
      if (error.code === 'auth/invalid-email') {
        setEmailError('Invalid email address.');
      } else if (error.code === 'auth/user-not-found') {
        setEmailError('No account found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        setPasswordError('Incorrect password.');
      } else {
        
        setPasswordError('Incorrect password.Please try again.');
      }
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.authTitle}>Log In</Text>

      {/* Email input */}
      <TextInput
        style={styles.authInput}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Password input */}
      <TextInput
        style={styles.authInput}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {/* Login button */}
      <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>

      {/* Links */}
      <View style={styles.loginLinkContainer}>
        <TouchableOpacity onPress={() => router.replace('/(auth)/PasswordResetScreen')}>
          <Text style={styles.linkText}>FORGOT PASSWORD?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.replace('/(auth)/SignupScreen')}>
        <Text style={styles.signupLink}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
