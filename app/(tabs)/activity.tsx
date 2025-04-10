import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/constants/Typography';
import BackIcon from '@/assets/icons/Back.svg';

export default function ActivityPage() {
  const router = useRouter();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    setShowExitConfirm(false);
  }, []);

  const handleBack = () => {
    setShowExitConfirm(true);
  };

  // Reuse the same slides from the homepage
  const progressSlides = [
    {
      title: "Your average heart rate has been",
      value: "142",
      description: "bpm",
      color: "#C72323",
      details:
        "If you have been feeling stressed or experiencing physical discomfort, consider:\n1. Going out for a run\n2. Deep breathing\n3. Listening to some upbeat music",
    },
    {
      title: "Your heart rate has been consistently",
      value: "HIGH",
      description: "",
      color: "#C72323",
      details:
        "This could be linked to stress or emotional shifts. Try incorporating calming activities like deep breathing or a short walk to see if it helps.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.goBackButton}>
          <BackIcon width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Activity</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <View>
          <Text style={styles.header}>Heart Activity</Text>
          {progressSlides.map((slide, index) => (
            <View key={index} style={styles.activityCard}>
              <Text style={styles.activityText}>{slide.title}</Text>

              <View style={styles.valueRow}>
                <Text style={[styles.progressValue, { color: slide.color }]}>{slide.value}</Text>
                {slide.description ? (
                  <Text style={styles.slideDescription}>{slide.description}</Text>
                ) : null}
              </View>

              {slide.details && (
                <Text style={styles.activityDetails}>{slide.details}</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {showExitConfirm && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setShowExitConfirm(false)}
        >
          <View style={styles.exitConfirmBox}>
            <Text style={styles.confirmText}>Are you sure?</Text>
            <Text style={styles.confirmSubtext}>
              You will be redirected back to the homepage.
            </Text>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                setShowExitConfirm(false);
                router.replace('/home');
              }}
            >
              <Text style={styles.confirmButtonText}>Yes, I am sure</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowExitConfirm(false)}
            >
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      {/* Debug API Button */}
      <TouchableOpacity
        style={styles.debugButton}
        onPress={() => router.push('/testpage')}
      >
        <Text style={styles.debugButtonText}>Debug API</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "#F9F7F0", 
    elevation: 5, 
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
  },
  goBackButton: {
    padding: 10,
    paddingBottom: 5,
  },
  title: {
    fontSize: Typography.fontSize.larger,
    fontFamily: Typography.fontFamily.bold,
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
    fontFamily: Typography.fontFamily.regular,
    marginBottom: 20,
  },
  activityCard: {
    backgroundColor: '#FAF0D9',
    padding: 30,
    borderRadius: 50,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
  },
  activityText: {
    fontSize: Typography.fontSize.medium,
    fontFamily: Typography.fontFamily.semibold,
    color: '#333',
  },
  activityDetails: {
    fontSize: Typography.fontSize.small,
    fontFamily: Typography.fontFamily.regular,
    color: '#333',
    marginTop: 5,
  },
  progressValue: {
    color: '#C72323',
    fontSize: Typography.fontSize.extra,
    fontFamily: Typography.fontFamily.extrabold,
  },
  slideDescription: {
    color: '#333333',
    fontSize: Typography.fontSize.small,
    fontFamily: Typography.fontFamily.bold,
    paddingBottom: 10,
  },
  valueRow: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    gap: 5,
    marginTop: 15,
    marginRight: 10,
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
    height: '40%',
    backgroundColor: '#F9F7F0',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    elevation: 5,
  },
  confirmText: {
    fontSize: Typography.fontSize.larger,
    fontFamily: Typography.fontFamily.semibold,
    marginTop: 20,
  },
  confirmSubtext: {
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.regular,
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
    fontFamily: Typography.fontFamily.bold,
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
    fontFamily: Typography.fontFamily.bold,
    textAlign: "center",
  },
  debugButton: {
    position: 'absolute',
    bottom: 80,
    left: '50%',
    transform: [{ translateX: -100 }],
    backgroundColor: '#FFBE31',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  debugButtonText: {
    color: '#FFF',
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.bold,
    textAlign: "center",
  },
});
