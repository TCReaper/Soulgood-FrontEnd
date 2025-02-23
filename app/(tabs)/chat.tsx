import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from 'expo-router';
import { Typography } from '@/constants/Typography';
import BackIcon from '@/assets/icons/Back.svg';
import ChatIcon from '@/assets/icons/chat/chat.svg';
import SoulyIcon from '@/assets/icons/chat/souly.svg';
import SendIcon from '@/assets/icons/chat/send.svg'; // Import the Send Button SVG

export default function ChatScreen() {
  const router = useRouter();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  
  const handleBack = () => {
    setShowExitConfirm(true);
  };

  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi John! I am Souly. How can I help you today?", sender: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

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
    }, 1500);
  };

  const handleSelectTopic = (topic: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.isTopicSelection ? { ...msg, text: "Choose a topic...", isTopicSelection: false } : msg
      ).concat([{ id: prev.length + 1, text: topic, sender: "user" }])
    );

    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: "I can provide more details on this topic!", sender: "bot" }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with Back Button and Title */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.goBackButton}>
          <BackIcon width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Chat</Text>
        <View style={{ width: 40 }} />
      </View>

      {!chatStarted ? (
        <View style={styles.startChatContainer}>
          <ChatIcon width={180} height={180} style={styles.chatIcon} />
          <Text style={styles.prompt}>Would you like to ask our chatbot a question?</Text>
          <TouchableOpacity style={styles.startButton} onPress={handleStartChat}>
            <Text style={styles.startButtonText}>Yes, please</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.chatContainer}>
          <ScrollView style={styles.chatMessages}>
            {messages.map((msg, index) => (
              <View key={msg.id} style={styles.messageWrapper}>
                {/* Display chatbot profile & name above the first bot message */}
                {msg.sender === "bot" && index === 0 && (
                  <View style={styles.botProfileContainer}>
                    <SoulyIcon width={40} height={40} style={styles.botProfileImage} />
                    <Text style={styles.botName}>Souly</Text>
                  </View>
                )}

                <View style={[styles.messageBubble, msg.sender === "user" ? styles.userBubble : styles.botBubble]}>
                  <Text style={styles.messageText}>{msg.text}</Text>
                </View>

                {/* Display topic selection buttons only if the message is a topic selection */}
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
            {/* Send Button with Custom SVG */}
            <TouchableOpacity style={styles.sendButton}>
              <SendIcon width={24} height={24} /> 
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Fix: Moved the exit confirmation outside of the chat container */}
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

  startChatContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  chatIcon: {
    alignSelf: "center",
  },

  prompt: {
    fontSize: Typography.fontSize.larger,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
  },

  startButton: {
    backgroundColor: "#FFBE31",
    padding: 20,
    borderRadius: 10,
  },

  startButtonText: {
    fontSize: Typography.fontSize.large,
    fontWeight: "600",
    color: "#FFF",
  },

  chatContainer: { flex: 1 },
  chatMessages: { flex: 1, padding: 15 },

  botProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  botProfileImage: {
    marginRight: 10,
  },

  botName: {
    fontSize: Typography.fontSize.large,
    fontWeight: "400",
    color: "#333",
  },

  messageBubble: { 
    padding: 12, 
    borderRadius: 10, 
    marginBottom: 16, 
    maxWidth: "80%" 
  },

  botBubble: { 
    backgroundColor: "#EDEDED", 
    alignSelf: "flex-start" 
  },

  userBubble: { 
    backgroundColor: "#FFF6C4", 
    alignSelf: "flex-end" 
  },

  messageText: { 
    fontSize: Typography.fontSize.small,
    fontWeight: "300",  
  },

  topicButton: { 
    backgroundColor: "#FFF", 
    padding: 10, 
    marginVertical: 5, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: "#DDD" 
  },

  topicButtonText: { 
    fontSize: Typography.fontSize.small,
    fontWeight: "300",  
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#CCC",
  },

  textInput: {
    flex: 1,
    padding: 10,
    fontSize: Typography.fontSize.small,
    fontWeight: "300",
    color: "#B9B9B9",   
  },

  sendButton: {
    padding: 10,
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
