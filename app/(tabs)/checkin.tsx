import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelect = (option: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = option;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Check-in complete! Answers:", answers);
      router.replace('/home');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-In</Text>
      
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }]} />
      </View>

      <Text style={styles.subtitle}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[styles.option, answers[currentQuestionIndex] === option && styles.selectedOption]}
          onPress={() => handleSelect(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {/* Back and Next Buttons */}
      <View style={styles.buttonContainer}>
        {currentQuestionIndex > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>{currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 70, backgroundColor: "#F9F7F0" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  progressBarContainer: { height: 6, width: "100%", backgroundColor: "#E0E0E0", borderRadius: 3, marginBottom: 20 },
  progressBar: { height: "100%", backgroundColor: "#FFA500", borderRadius: 3 },
  option: {
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#DDD",
    marginVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  selectedOption: { backgroundColor: "#FFF8DC", borderColor: "#FFA500" },
  optionText: { fontSize: 16, textAlign: "center" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  backButton: {
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FFA500",
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  backButtonText: { color: "#FFA500", fontWeight: "bold", fontSize: 16 },
  nextButton: {
    backgroundColor: "#FFA500",
    padding: 12,
    borderRadius: 25,
    flex: 1,
    alignItems: "center",
  },
  nextButtonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
});
