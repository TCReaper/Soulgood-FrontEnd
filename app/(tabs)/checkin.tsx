import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import BackIcon from '@/assets/icons/Back.svg';
import { Typography } from '@/constants/Typography';

const questions = [
  {
    question: "How are you feeling today?",
    options: ["Excited", "Happy", "Neutral", "Tired", "Stressed", "Sad", "Anxious"],
  },
  {
    question: "How was your appetite today?",
    options: ["I overate", "I had a normal appetite", "I had a poor appetite", "I skipped meals"],
  },
  {
    question: "How was your sleep last night?",
    options: ["Great", "Good", "Okay", "Poor", "Very bad"],
  },
  {
    question: "How's your energy level?",
    options: ["High", "Moderate", "Okay", "Low", "Very low"],
  },
];

export default function DailyCheckInScreen() {
  const router = useRouter();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelect = (option: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = option;
      return updatedAnswers;
    });
  };

  const handleNext = () => {
    if (!answers[currentQuestionIndex]) return;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Check-in complete! Answers:", answers);
      router.replace('/home');
    }
  };

  const handleBackQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleBack = () => {
    setShowExitConfirm(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.goBackButton}>
          <BackIcon width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Check-In</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }]} />
      </View>

      <Text style={styles.subtitle}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((option) => {
        const isSelected = answers[currentQuestionIndex] === option;
        return (
          <TouchableOpacity
            key={option}
            style={[styles.option, isSelected && styles.selectedOption]}
            onPress={() => handleSelect(option)}
          >
            <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}

      <View style={[styles.buttonContainer, currentQuestionIndex === 0 && styles.singleButtonContainer]}>
        {currentQuestionIndex > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBackQuestion}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>{currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showExitConfirm && (
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={() => setShowExitConfirm(false)}
        >
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
    paddingHorizontal: 20,  // Only apply horizontal padding
    paddingTop: 130,  // Ensure content starts below the top bar
    backgroundColor: "#F9F7F0",
  },

  topBar: {
    position: "absolute",  // Makes sure the top bar is fixed at the top
    top: 0,
    left: 0,
    right: 0,
    height: 110,  // Adjust height as needed
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20, 
    paddingBottom: 10, // Pushes content further down
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
      paddingBottom: 5,  // Align with back button
    },

  subtitle: { 
    fontSize: Typography.fontSize.medium,
    fontWeight: '500',
    marginBottom: 20, 
    textAlign: 'left',

  },
  
  progressBarContainer: { 
    height: 10, 
    width: "100%", 
    backgroundColor: "#DCDCDC", 
    borderRadius: 10, 
    marginBottom: 20, 

  },

  progressBar: { 
    height: "100%", 
    backgroundColor: "#FFBE31", 
    borderRadius: 10,
  },

  option: {
    padding: 15,
    borderRadius: 30,
    marginVertical: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  optionText: { 
    fontSize: Typography.fontSize.medium,
    fontWeight: '400',
    textAlign: "center" 
  },

  selectedOption: { 
    backgroundColor: "#FFBE31", 
  },

  selectedOptionText: { 
    color: "#FFFFFF", // Change text color when selected
    fontWeight: "bold",
  },

  buttonContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 20, 
  },

  singleButtonContainer: {
    justifyContent: "center",
  },
  
  backButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: '#FFBE31',
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center", // Centers the button horizontally
    padding: 12,
    borderRadius: 30,
    height: 50,
    width: 150,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  backButtonText: { 
    color: "#FFA500", 
    fontSize: Typography.fontSize.large,
    fontWeight: '700',
  },

  nextButton: {
    backgroundColor: "#FFBE31",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center", // Centers the button horizontally
    padding: 12,
    borderRadius: 30,
    height: 50,
    width: 150,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  nextButtonText: { 
    color: "#FFFFFF", 
    fontSize: Typography.fontSize.large,
    fontWeight: '700',
  },
  
  buttonWrapper: {
    alignItems: 'center',
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
    width: 250,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',  
    justifyContent: 'center',
  },

  cancelText: {
    color: '#333333',
    fontSize: Typography.fontSize.large,
    fontWeight: "700",
  },

});
