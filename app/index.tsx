import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/constants/Typography';

export default function SplashScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current; // Heartbeat animation
  const translateYAnim = useRef(new Animated.Value(0)).current; // Logo and text movement
  const [showButtons, setShowButtons] = useState(false); // Control button visibility

  const router = useRouter();

  useEffect(() => {
    // Define the heartbeat animation
    const heartbeat = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 2 } // Runs 3 times, then stops
    );

    // Start the heartbeat animation
    heartbeat.start();

    setTimeout(() => {
      // Stop heartbeat and move content upwards
      heartbeat.stop();
      Animated.timing(translateYAnim, {
        toValue: -100, // Move upwards
        duration: 500,
        useNativeDriver: true,
      }).start(() => setShowButtons(true)); // Show buttons after movement
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { transform: [{ translateY: translateYAnim }] }]}>
        <Animated.Image
          source={require('@/assets/images/soulgood-light.png')}
          style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>
            one <Text style={[styles.text, styles.highlight]}>ebb</Text> at a time
          </Text>
        </View>
      </Animated.View>

      {showButtons && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.login} onPress={() => router.push('/login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signup} onPress={() => router.push('/signup')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/guest')}>
            <Text style={styles.guestText}>Continue as a Guest</Text>
          </TouchableOpacity>
        </View>
      )}
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
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 10,
  },
  textWrapper: {
    maxWidth: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  text: {
    color: '#333333',
    fontSize: Typography.fontSize.largest,
    fontFamily: Typography.fontFamily.semibold,
    textAlign: 'center',
  },  
  highlight: {
    color: '#FFAE00',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '90%',
    height: '8%',
  },
  login: {
    width: '90%',
    height: '100%',
    backgroundColor: '#FFAE00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 15,
  },
  signup: {
    width: '90%',
    height: '100%',
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 10,
  },
  loginText: {
    color: '#FFF',
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.bold,
  },
  signupText: {
    color: '#585858',
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.bold,
  },
  guestText: {
    color: '#FFAE00',
    fontSize: Typography.fontSize.small,
    fontFamily: Typography.fontFamily.semibold,
    textDecorationLine: 'underline',
    marginTop: 15,
  },
});

