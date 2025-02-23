import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/constants/Typography';
import UsernameIcon from '@/assets/icons/Username.svg';
import PasswordIcon from '@/assets/icons/Password.svg';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = () => {
    if (!username.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setError('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    alert('Password changed successfully!');
    router.replace('/login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Reset Your <Text style={styles.highlight}>Password</Text>
      </Text>

      <View style={styles.inputContainer}>
        <UsernameIcon width={24} height={24} style={styles.icon} />
        <TextInput
          placeholder="Username"
          style={styles.input}
          placeholderTextColor="#B5B5B5"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <PasswordIcon width={24} height={24} style={styles.icon} />
        <TextInput
          placeholder="New Password"
          style={styles.input}
          placeholderTextColor="#B5B5B5"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <PasswordIcon width={24} height={24} style={styles.icon} />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          placeholderTextColor="#B5B5B5"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleChangePassword}>
        <Text style={styles.loginText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/login')} style={styles.backButton}>
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
    marginBottom: 15,
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
    marginBottom: 15,
  },
  loginText: {
    color: '#FFF',
    fontSize: Typography.fontSize.large,
    fontWeight: '700',
  },
  backButton: {
    alignSelf: 'flex-start', 
    width: '90%',
    marginTop: 5,
    marginLeft: 15,
  },
  backText: {
    color: '#333333',
    fontSize: Typography.fontSize.small,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
