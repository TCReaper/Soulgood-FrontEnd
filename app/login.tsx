import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'test' && password === 'test') {
      setError('');
      router.replace('/home'); // Navigate to home screen
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/soulgood-light.png')} style={styles.logo} />
      <Text style={styles.welcome}>
        Welcome to <Text style={styles.highlight}>SoulGood</Text>!
      </Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or sign in with</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
      Do not have an account?{"   "}
        <Text style={styles.signupLink} onPress={() => router.push('/signup')}>
         Sign up here!
        </Text>
      </Text>

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
  welcome: {
    fontSize: 24,
    marginBottom: 20,
  },
  highlight: {
    color: '#FFA500', // Orange color for 'SoulGood'
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  loginText: {
    color: '#FFF',
    fontSize: 18,
  },
  forgotPassword: {
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
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
    marginBottom: 20,
  },
  googleText: {
    color: '#000',
    fontSize: 18,
  },
  signupText: {
    fontSize: 14,
    color: '#888',
  },
  signupLink: {
    color: '#FFA500',
  },
});
