import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/soulgood-light.png')} style={styles.logo} />
      <Text style={styles.title}>Sign Up</Text>
      
      <TextInput placeholder="Username" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Phone" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry />
      <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry />

      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createText}>Create</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or sign up with</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleText}>Sign up with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  createButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  createText: {
    color: '#FFF',
    fontSize: 18,
  },
  orText: {
    fontSize: 14,
    color: '#888',
    marginVertical: 10,
  },
  googleButton: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  googleText: {
    color: '#000',
    fontSize: 18,
  },
});
