import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const helplines = [
  { name: 'Institute of Mental Health', phone: '63892000' },
  { name: 'Samaritans of Singapore', phone: '1767' },
  { name: 'SOS Hotline', phone: '18002214444' },
  { name: 'MindSG', phone: ' ' },
  { name: 'National Council of Social Services', phone: ' ' },
  { name: 'JustAsk', phone: ' ' },
];

export default function ReachOut() {
  const router = useRouter();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleCall = (phoneNumber: string) => {
    if (phoneNumber.trim() !== '') {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Alert.alert('Info', 'No phone number available for this service.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help Lines</Text>
      {helplines.map((helpline, index) => (
        <TouchableOpacity key={index} style={styles.helplineItem} onPress={() => handleCall(helpline.phone)}>
          <Text style={styles.helplineText}>{helpline.name}</Text>
          <Text style={styles.phoneIcon}>📞</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.exitButton} onPress={() => setShowExitConfirm(true)}>
        <Text style={styles.exitText}>Exit</Text>
      </TouchableOpacity>

      {showExitConfirm && (
        <View style={styles.exitConfirmBox}>
          <Text style={styles.confirmText}>Are you sure?</Text>
          <Text style={styles.confirmSubtext}>You will be redirected back to the homepage.</Text>
          <TouchableOpacity style={styles.confirmButton} onPress={() => router.replace('/home')}>
            <Text style={styles.confirmButtonText}>Yes, I am sure</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setShowExitConfirm(false)}>
            <Text style={styles.cancelText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  helplineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  helplineText: {
    fontSize: 18,
  },
  phoneIcon: {
    fontSize: 18,
  },
  exitButton: {
    marginTop: 20,
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  exitText: {
    color: '#FFF',
    fontSize: 18,
  },
  exitConfirmBox: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confirmSubtext: {
    fontSize: 16,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#EEE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelText: {
    fontSize: 16,
  },
});