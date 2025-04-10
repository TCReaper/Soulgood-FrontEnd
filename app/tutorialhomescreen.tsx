import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import HomeLayout from '@/app/homelayout';
import { useRouter } from 'expo-router';
import { Typography } from '@/constants/Typography';

const { height } = Dimensions.get('window');

export default function TutorialHomeScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const tutorialSteps = [
    {
      text: "This section shows your weekly heart rate statistics.",
      tooltipPosition: { bottom: 280 },
      overlays: {
        top: { height: height * 0.19 },
        bottom: { top: height * 0.47 },
      },
    },
    {
      text: "Here is your pending task. \n Tap this in the real app to complete check-ins.",
      tooltipPosition: { bottom: 140 },
      overlays: {
        top: { height: height * 0.47 },
        bottom: { top: height * 0.61 },
      },
    },
    {
      text: "These are helpful articles recommended for you.",
      tooltipPosition: { bottom: 350 },
      overlays: {
        top: { height: height * 0.61 },
        bottom: { top: height * 0.90 },
      },
    },
  ];

  return (
    <View style={{ flex: 1 }}>
    {/* Main content with no interaction */}
    <View pointerEvents="none" style={{ flex: 1 }}>
        <HomeLayout />
    </View>

    {/* 🔲 Dynamic Top overlay */}
    <View
        style={[styles.topOverlay, tutorialSteps[currentStep].overlays.top]}
        pointerEvents="none"
    />

    {/* 🔲 Dynamic Bottom overlay */}
    <View
        style={[styles.bottomOverlay, tutorialSteps[currentStep].overlays.bottom]}
        pointerEvents="none"
    />

    {/* Tooltip box */}
    <View style={[styles.tooltipContainer, tutorialSteps[currentStep].tooltipPosition]}>
        <Text style={styles.tooltip}>{tutorialSteps[currentStep].text}</Text>
        <View style={styles.buttons}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/home')} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
            if (currentStep < tutorialSteps.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                router.replace('/(tabs)/home');
            }
            }}
            style={styles.nextButton}
        >
            <Text style={styles.nextText}>
            {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
            </Text>
        </TouchableOpacity>
        </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 5,
    },
bottomOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 5,
    },      
tooltipContainer: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 30,
    elevation: 10,
    zIndex: 10, // Ensure it's above overlays
  },
  tooltip: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.medium,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    color: '#B5B5B5',
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.bold,
  },
  nextButton: {
    backgroundColor: '#FFBE31',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  nextText: {
    color: '#fff',
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.bold,
  },
});
