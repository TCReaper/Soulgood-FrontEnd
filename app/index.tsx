import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text, Image} from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale of 1

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/login'); // Move to login after 2 seconds
    }, 3000);
  }, []);

  useEffect(() => {
    // Define the heartbeat animation
    const heartbeat = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1, // Increase size
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Decrease size back to original
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    // Start the animation
    heartbeat.start();

    return () => heartbeat.stop(); // Stop animation when component unmounts
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Image source={require('@/assets/images/soulgood-light.png')} style={styles.logo} />
      </Animated.View>
      <Text style={styles.text}>one <Text style={styles.highlight}>ebb</Text> at a time</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Background color for splash screen
  },
  icon: {
    fontSize: 100, // Adjust icon size as needed
    color: '#FFA500', // Icon color
  },
  text: {
    fontSize: 18,
    color: '#000',
    marginTop: 20,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
  },
  highlight: {
    color: '#FFA500', // Orange color for 'ebb'
  },
});
