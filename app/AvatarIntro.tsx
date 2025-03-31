import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import avatar1 from '@/assets/icons/create/default_avatar1.png';
import avatar2 from '@/assets/icons/create/default_avatar2.png';
import { Typography } from '@/constants/Typography';

export default function AvatarIntroScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/AvatarBuilder');
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarsContainer}>
        <Image source={avatar1} style={[styles.avatar, styles.avatar1]} />
        <Image source={avatar2} style={[styles.avatar, styles.avatar2]} />
      </View>
      <Text style={styles.title}>Avatar Generator</Text>
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AvatarIntroScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9F7F0',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarsContainer: {
      position: 'relative',
      width: 220, // adjust as needed to fit both avatars
      height: 188,
      marginBottom: 30,
    },    
    avatar: {
      position: 'absolute', // stack them
    },
    avatar1: {
      width: 178,
      height: 178,
      zIndex: 0,
      left: -40,
      top: -60,
    },
    avatar2: {
      width: 188,
      height: 188,
      zIndex: 1,
      left: 80, // slightly right so it overlaps avatar1
    },   

    title: {
      fontSize: Typography.fontSize.largest,
      fontFamily: Typography.fontFamily.semibold,
      color: '#333333',
      marginBottom: 40,
    },
    button: {
      backgroundColor: '#FFBE31',
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 30,
      elevation: 3,
      width: 300,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },

    buttonText: {
      color: '#FFF',
      fontSize: Typography.fontSize.large,
      fontFamily: Typography.fontFamily.bold,
    },
  });
  