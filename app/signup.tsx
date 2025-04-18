import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Typography } from '@/constants/Typography';
import UsernameIcon from '@/assets/icons/Username.svg';
import PasswordIcon from '@/assets/icons/Password.svg';

export default function SignUpScreen() {

  const router = useRouter();

  const handleCreate = () => {
    router.replace('/home'); 
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Sign Up</Text>
      
      <View style = {styles.inputContainer}>
        <UsernameIcon width = {24} height = {24} style = {styles.icon} />
        <TextInput
          placeholder= 'Username'
          style = {styles.input}
          placeholderTextColor = '#B5B5B5'
        />
      </View>
      <View style = {styles.inputContainer}>
        <PasswordIcon width = {24} height = {24} style = {styles.icon} />
        <TextInput
          placeholder= 'Password'
          style = {styles.input}
          placeholderTextColor = '#B5B5B5'
        />
      </View>
      <View style = {styles.inputContainer}>
        <PasswordIcon width = {24} height = {24} style = {styles.icon} />
        <TextInput
          placeholder= 'Confirm Password'
          style = {styles.input}
          placeholderTextColor = '#B5B5B5'
        />
      </View>

    <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
    <Text style={styles.createText}>Create</Text>
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
  title: {
    fontSize: Typography.fontSize.largest,
    fontFamily: Typography.fontFamily.semibold,
    color: '#333333',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 30,
    marginBottom:20,
    width: '90%', 
    height: 60,
  },
  icon: {
    marginLeft: 20,
    marginRight: 20, // optional
  },  
  googleicon: {
    marginRight:15,
  },
  input: {
    flex: 1,
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: '#EDEDED',
    fontSize: Typography.fontSize.small,
    fontFamily: Typography.fontFamily.semibold,
  },
  createButton: {
    width: '90%',
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 30
  },
  createText: {
    color: '#FFF',
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.bold,
  },
  orText: {
    color: '#B5B5B5',
    marginVertical: 10,
    fontSize: Typography.fontSize.tiny,
    fontFamily: Typography.fontFamily.medium,
  },
  googleButton: {
    width: '90%',
    height: 60,
    borderWidth: 1,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30, 
    backgroundColor: '#D9D9D9',
  },
  
  googleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  
  googleText: {
    color: '#585858',
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.bold,
  },
});
