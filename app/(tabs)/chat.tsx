import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native";

export default function ChatScreen({ navigation }) {
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi John! I am Souly. How can I help you today?", sender: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false); // For bot typing indicator

  const topics = [
    "Understanding my risk factors",
    "Symptoms and warning signs",
    "Prevention and safety tips",
    "Interpreting my results",
    "Available treatments and options",
    "Others"
  ];

  const handleStartChat = () => {
    setChatStarted(true);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: 2, text: "Choose a topic you would like to ask about:", sender: "bot", isTopicSelection: true }
      ]);
      setIsTyping(false);
    }, 1500); // 1.5-second delay
  };

  const handleSelectTopic = (topic: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.isTopicSelection ? { ...msg, text: "Choose a topic...", isTopicSelection: false } : msg
      ).concat([{ id: prev.length + 1, text: topic, sender: "user" }])
    );

    // Simulate a delay before the bot responds
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: "I can provide more details on this topic!", sender: "bot" }
      ]);
      setIsTyping(false);
    }, 1500); // 1.5-second delay
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Chat</Text>
      </View>

      {!chatStarted ? (
        // Initial Chat Screen
        <View style={styles.startChatContainer}>
          <Text style={styles.chatIcon}>💬</Text>
          <Text style={styles.prompt}>Would you like to ask our chatbot a question?</Text>
          <TouchableOpacity style={styles.startButton} onPress={handleStartChat}>
            <Text style={styles.startButtonText}>Yes, please</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Chat Interface
        <View style={styles.chatContainer}>
          <ScrollView style={styles.chatMessages}>
            {messages.map((msg) => (
              <View key={msg.id} style={[styles.messageBubble, msg.sender === "user" ? styles.userBubble : styles.botBubble]}>
                <Text style={styles.messageText}>{msg.text}</Text>
                {msg.isTopicSelection &&
                  topics.map((topic) => (
                    <TouchableOpacity key={topic} style={styles.topicButton} onPress={() => handleSelectTopic(topic)}>
                      <Text style={styles.topicButtonText}>{topic}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <View style={styles.typingIndicator}>
                <ActivityIndicator size="small" color="#FFB300" />
                <Text style={styles.typingText}>Souly is typing...</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} placeholder="Send a message..." />
            <TouchableOpacity>
              <Text style={styles.sendButton}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: { flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#FAE1C0" },
  backButton: { /* styles for back button */ },
  backText: { fontSize: 18 },
  title: { fontSize: 20, fontWeight: "bold", marginLeft: 10 },
  startChatContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  chatIcon: { fontSize: 50, marginBottom: 20 },
  prompt: { fontSize: 18, textAlign: "center", marginBottom: 20 },
  startButton: { backgroundColor: "#FFB300", padding: 15, borderRadius: 10 },
  startButtonText: { fontSize: 16, color: "#FFF" },
  chatContainer: { flex: 1 },
  chatMessages: { flex: 1, padding: 15 },
  messageBubble: { padding: 12, borderRadius: 10, marginBottom: 8, maxWidth: "80%" },
  botBubble: { backgroundColor: "#FAF3E0", alignSelf: "flex-start" },
  userBubble: { backgroundColor: "#FFB300", alignSelf: "flex-end" },
  messageText: { fontSize: 16 },
  topicButton: { backgroundColor: "#FFF", padding: 10, marginVertical: 5, borderRadius: 5, borderWidth: 1, borderColor: "#DDD" },
  topicButtonText: { fontSize: 16 },
  inputContainer: { flexDirection: "row", alignItems: "center", padding: 10, borderTopWidth: 1, borderColor: "#CCC" },
  textInput: { flex: 1, padding: 10, fontSize: 16 },
  sendButton: { fontSize: 18, paddingHorizontal: 10, color: "#FFB300" },
  typingIndicator: { flexDirection: "row", alignItems: "center", marginLeft: 10, marginBottom: 8 },
  typingText: { marginLeft: 5, fontSize: 14, color: "#777" }
});
