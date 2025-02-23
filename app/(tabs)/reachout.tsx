import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/constants/Typography';
import BackIcon from '@/assets/icons/Back.svg';
import CallIcon from '@/assets/icons/reachout/call.svg'; // Import the Call Button SVG

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

  const handleBack = () => {
    setShowExitConfirm(true); // Show the popup instead of navigating immediately
  };

  const handleCall = (phoneNumber: string) => {
    if (phoneNumber.trim() !== '') {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Alert.alert('Info', 'No phone number available for this service.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with Back Button and Title */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.goBackButton}>
          <BackIcon width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.title}>ReachOut</Text>
        <View style={{ width: 40 }} />
      </View>

      <Text style={styles.header}>Help Lines</Text>
      {helplines.map((helpline, index) => (
        <TouchableOpacity key={index} style={styles.helplineItem} onPress={() => handleCall(helpline.phone)}>
          <Text style={styles.helplineText}>{helpline.name}</Text>
          <CallIcon width={24} height={24} style={styles.callIcon} />
        </TouchableOpacity>
      ))}

      {/* Exit Confirmation Popup with Dark Overlay */}
      {showExitConfirm && (
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setShowExitConfirm(false)}>
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
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 130,
    backgroundColor: "#F9F7F0",
  },

  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 110,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#FAF0D9",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  goBackButton: {
    padding: 10,
    paddingBottom: 5,
  },

  title: {
    fontSize: Typography.fontSize.larger,
    fontWeight: "500",
    color: "#333333",
    flex: 1,
    textAlign: "center",
    paddingBottom: 5,
  },

  header: {
    fontSize: Typography.fontSize.larger,
    fontWeight: "400",
    marginBottom: 20,
  },
  
  helplineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },

  helplineText: {
    fontSize: 18,
    flex: 1, // Allows text to take up the remaining space
  },

  callIcon: {
    marginLeft: 10, // Space between text and icon
  },

  /* 🔹 Dark Overlay to Darken the Background */
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    justifyContent: 'center',
    alignItems: 'center',
  },

  exitConfirmBox: {
    width: '80%',
    height: '45%',
    backgroundColor: '#F9F7F0',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    elevation: 5,
  },

  confirmText: {
    fontSize: Typography.fontSize.larger,
    fontWeight: "600",
    marginTop: 20,
  },

  confirmSubtext: {
    fontSize: Typography.fontSize.large,
    fontWeight: "400",    
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },

  confirmButton: {
    backgroundColor: '#FFBE31',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 15,
    marginBottom: 15,
    width: 250,
    height: 60,
    alignItems: 'center',  
    justifyContent: 'center',  
  },
  
  confirmButtonText: {
    color: '#FFF',
    fontSize: Typography.fontSize.large,
    fontWeight: "700", 
    textAlign: "center",
  },
  
  cancelButton: {
    backgroundColor: '#EDEDED',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 10,
    width: 250,
    height: 60,
    alignItems: 'center',  
    justifyContent: 'center',  
  },

  cancelText: {
    color: '#333333',
    fontSize: Typography.fontSize.large,
    fontWeight: "700", 
    textAlign: "center",
  },
});
