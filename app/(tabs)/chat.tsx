import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from 'expo-router';
import { Typography } from '@/constants/Typography';
import BackIcon from '@/assets/icons/Back.svg';
import ChatIcon from '@/assets/icons/chat/chat.svg';
import SoulyIcon from '@/assets/icons/chat/souly.svg';
import SendIcon from '@/assets/icons/chat/send.svg';
import axios from "axios";

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
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const topics = [
    "Review Your PHQ-9 Assessment",
    "Recognizing Symptoms and Warning Signs of Stress",
    "Relaxation Techniques and Stress Prevention Tips",
    "Inspiring Quotes About Life"
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
    }, 500);
  };

  // Function to select and send topic - Updated on 7 Apr
  const handleSelectTopic = async (topic: string) => {
    const updatedUI = messages.map(msg =>
      msg.isTopicSelection ? { ...msg, text: "Choose a topic...", isTopicSelection: false } : msg
    );
    const newUserMessage = { id: updatedUI.length + 1, text: topic, sender: "user" };
    const newMessages = [...updatedUI, newUserMessage];
  
    setMessages(newMessages);
    setIsTyping(true);
  
    try {
      const formattedMessages = newMessages.map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      }));
  
      let botResponse = "";
  
      if (topic === "Review Your PHQ-9 Assessment") {
        const response = await axios.post("http://10.46.79.241:5051/phq", {
          messages: formattedMessages
        });
        botResponse = response.data.phq_response;
      } else {
        const response = await axios.post("http://10.46.79.241:5051/chat", {
          messages: formattedMessages
        });
        botResponse = response.data.response;
      }
  
      setMessages((prev) => [
        ...prev,
        { id: newMessages.length + 1, text: botResponse, sender: "bot" }
      ]);
    } catch (error) {
      console.error("Error handling topic:", error);
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: "Sorry, I ran into an issue. Please try again.", sender: "bot" }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Function to send a message - Updated on 7 Apr
  const sendMessage = async () => {
    if (!userMessage.trim()) return;
  
    const newUserMessage = { id: messages.length + 1, text: userMessage, sender: "user" };
    const updatedMessages = [...messages, newUserMessage];
  
    setMessages(updatedMessages);
    setUserMessage("");
    setIsTyping(true);
  
    try {
      const formattedMessages = updatedMessages.map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      }));
  
      const response = await axios.post("http://10.46.79.241:5051/chat", {
        messages: formattedMessages
      });
  
      const botMessage = {
        id: updatedMessages.length + 1,
        text: response.data.response,
        sender: "bot"
      };
  
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: "Oops! Something went wrong.", sender: "bot" }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSummary = async () => {
    setIsTyping(true);
    try {
      const response = await axios.post("http://10.46.79.241:5051/summary", {
        messages: messages.map(msg => ({ role: msg.sender === "user" ? "user" : "assistant", content: msg.text }))
      });
  
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: response.data.summary, sender: "bot" }
      ]);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: "Sorry, I couldn't generate a summary right now.", sender: "bot" }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setIsTyping(true);
    setMessages([
      { id: 1, text: "Hi John! I am Souly. How can I help you today?", sender: "bot" }
    ]);
  
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: 2, text: "Choose a topic you would like to ask about:", sender: "bot", isTopicSelection: true }
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
        {/*<View style={{ width: 40 }} />*/}
        <TouchableOpacity onPress={clearChat} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear Chat</Text>
        </TouchableOpacity>
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
            <TextInput
              style={styles.textInput}
              placeholder="Send a message..."
              value={userMessage}
              onChangeText={setUserMessage}
              onSubmitEditing={sendMessage} // Optional: send on "Enter"
              returnKeyType="send"
              contentContainerStyle={{ paddingBottom: 100 }}
            />
            {/* Send Button with Custom SVG */}
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <SendIcon width={24} height={24} /> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.sumButton} onPress={handleSummary}>
              <Text style={styles.sumButtonText}>SUMMARY</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Fix: Moved the exit confirmation outside of the chat container */}
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

  clearButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#FEE191", // Light yellow to match SUM
    alignSelf: "flex-end"
  },
  
  clearButtonText: {
    fontSize: Typography.fontSize.small,
    fontWeight: "600",
    color: "#333333"
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
    fontFamily: Typography.fontFamily.regular,
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
    fontFamily: Typography.fontFamily.semibold,
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
    fontFamily: Typography.fontFamily.regular,
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
    fontFamily: Typography.fontFamily.regular,
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
    fontFamily: Typography.fontFamily.regular,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#CCC",
    paddingBottom: 90
  },

  textInput: {
    flex: 1,
    padding: 10,
    fontSize: Typography.fontSize.small,
    fontFamily: Typography.fontFamily.regular,
    color: "#333333",
  },

  sendButton: {
    padding: 10,
  },

  sumButton: {
    padding: 10,
    marginLeft: 5,
    backgroundColor: "#FFBE31",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  
  sumButtonText: {
    color: "#333333",
    fontWeight: "600",
    fontSize: 14,
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
    fontFamily: Typography.fontFamily.semibold,
    marginTop: 20,
  },

  confirmSubtext: {
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.regular,
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
    width: 250,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',  
    justifyContent: 'center',
  },

  cancelText: {
    color: '#333333',
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.bold,
  },
});
