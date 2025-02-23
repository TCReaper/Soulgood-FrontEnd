import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/constants/Typography';
import UsernameIcon from '@/assets/icons/Username.svg';

export default function GuestLoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleGuestLogin = () => {
    if (username.trim()) {
      setError('');
      router.replace('/(tabs)/home'); // Navigate to home screen
    } else {
      setError('Please enter a username.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/soulgood-light.png')} style={styles.logo} />
      <Text style={styles.welcome}>
        Welcome to <Text style={styles.highlight}>SoulGood</Text>!
      </Text>

      <View style={styles.inputContainer}>
        <UsernameIcon width={24} height={24} style={styles.icon} />
        <TextInput
          placeholder="Enter your name"
          style={styles.input}
          placeholderTextColor="#B5B5B5"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleGuestLogin}>
        <Text style={styles.loginText}>Continue</Text>
      </TouchableOpacity>
          
      <TouchableOpacity onPress={() => router.push('/')}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F7F0',
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
  },
  welcome: {
    fontSize: Typography.fontSize.largest,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 20,
  },
  highlight: {
    color: '#FFAE00',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 30,
    marginBottom: 20,
    width: '90%', 
    height: '8%',
  },
  icon: {
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    flex: 1,
    borderRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: '#EDEDED',
    fontSize: Typography.fontSize.small,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    width: '90%',
    height: '8%',
    backgroundColor: '#FFAE00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 10,
  },
  loginText: {
    color: '#FFF',
    fontSize: Typography.fontSize.large,
    fontWeight: '700',
  },
  backText: {
    color: '#333333',
    fontSize: Typography.fontSize.small,
    fontWeight: '500',
    textDecorationLine: 'underline',
    marginTop: 15,
  },
});

