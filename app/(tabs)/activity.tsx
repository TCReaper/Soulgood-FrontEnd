import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/constants/Typography';
import BackIcon from '@/assets/icons/Back.svg';

export default function ActivityPage() {
  const router = useRouter();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleBack = () => {
    setShowExitConfirm(true); // Show the popup instead of navigating immediately
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with Back Button and Title */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.goBackButton}>
          <BackIcon width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Activity</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} overScrollMode="never">
        <Text style={styles.header}>Heart Activity</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>Your average heart rate has been</Text>
          <Text style={styles.activityHighlight}>142 bpm</Text>
          <Text style={styles.activitySubtext}>
            If you have been feeling stressed or experiencing physical discomfort, consider:
            {'\n'}1. Resting
            {'\n'}2. Relaxation techniques
            {'\n'}3. Talk to someone you trust
          </Text>
        </View>

        <View style={styles.activityCard}>
          <Text style={styles.activityText}>Your heart rate has been consistently</Text>
          <Text style={styles.activityHighlight}>HIGH</Text>
          <Text style={styles.activitySubtext}>
            This could be linked to stress or emotional shifts. Try incorporating calming activities like deep breathing or a short walk to see if it helps.
          </Text>
        </View>

        <Text style={styles.header}>Sleep Cycle</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>You have been sleeping an average of</Text>
          <Text style={styles.activityHighlight}>3 hours 34 min</Text>
        </View>
      </ScrollView>

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
  scrollView: {
    marginBottom: 20,
  },
  header: {
    fontSize: Typography.fontSize.larger,
    fontWeight: "600",
    marginBottom: 20,
  },
  activityCard: {
    backgroundColor: '#FAF0D9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  activityText: {
    fontSize: Typography.fontSize.small,
    fontWeight: '400',
  },
  activityHighlight: {
    fontSize: Typography.fontSize.extra,
    fontWeight: '800',
    color: '#C72323',
  },
  activitySubtext: {
    fontSize: Typography.fontSize.extrasmall,
    color: '#333333',
    marginTop: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
