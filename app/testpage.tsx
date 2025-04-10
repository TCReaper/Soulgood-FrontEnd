import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import BackIcon from '@/assets/icons/Back.svg';

const API_BASE_URL = "http://127.0.0.1:5050"; // Replace with your base URL

const TestPage: React.FC = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [heartRateData, setHeartRateData] = useState('');
  const [userId, setUserId] = useState('');
  // const picture = `https://imgur.com/a/vWSSqUa`;

  const handleBack = () => {
    // Handle back button functionality here
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5050/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      }); 
      setResponseMessage(JSON.stringify({ name, email, password }));
      const data = await response.json();
      if (response.status === 201) {
        setResponseMessage('User registered successfully');
      } else {
        setResponseMessage(data.message || 'Error occurred');
      }
    } catch (error: any) {
      console.log('fetch error:', error);
      setResponseMessage(error.message || 'fetch failed');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        });
      const data = await response.json();
      if (response.status === 200) {
        setResponseMessage('Login successful');
        setUserId(data.userId);
      } else {
        setResponseMessage(data.message || 'Invalid login credentials');
      }
    } catch (error: any) {
      console.log('fetch error:', error);
      setResponseMessage(error.message || 'fetch failed');
    }
  };

  const handleSendHeartRate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/receive_heart_rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          heart_rate_data: JSON.parse(heartRateData),
        }),
      });
      const data = await response.json();
      setResponseMessage(data.message || 'Heart rate data sent successfully');
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with Back Button and Title */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.goBackButton}>
          <BackIcon width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Test Backend API</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} overScrollMode="never"
      contentContainerStyle={{paddingBottom: 150}}>
        <Text style={styles.header}>Response</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>API Response Message:</Text>
          <Text style={styles.activityHighlight}>{responseMessage || 'No response yet'}</Text>
        </View>

        {/* Signup Section */}
        <Text style={styles.header}>Signup</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>Register a New User</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Signup" onPress={handleSignup} />
        </View>

        {/* Login Section */}
        <Text style={styles.header}>Login</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>Authenticate User</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>

        {/* User Profile Section */}
        <Text style={styles.header}>User Profile</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>Retrieve User Data</Text>
          <Button
            title="Get User Profile"
            onPress={async () => {
              try {
                const response = await fetch(`http://127.0.0.1:5050/user/${userId}`);
                const data = await response.json();
                setResponseMessage(data.message || 'User data retrieved');
              } catch (error) {
                setResponseMessage(error.message);
              }
            }}
          />
        </View>

        {/* Heart Rate & Stress Detection Section */}
        <Text style={styles.header}>Heart Rate & Stress Detection</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>Send Heart Rate Data</Text>
          <TextInput
            style={styles.input}
            placeholder="Heart Rate Data (JSON format)"
            value={heartRateData}
            onChangeText={setHeartRateData}
          />
          <Button title="Send Heart Rate" onPress={handleSendHeartRate} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  goBackButton: {
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    padding: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  activityCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  activityText: {
    fontSize: 14,
    marginBottom: 5,
  },
  activityHighlight: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TestPage;
