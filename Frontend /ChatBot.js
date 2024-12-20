import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://<YOUR_BACKEND_URL>/api/chatbot', {
        userMessage: input,
      });

      const botMessage = { role: 'bot', content: response.data.botMessage };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      const errorMessage = { role: 'bot', content: 'Something went wrong. Please try again later.' };
      setMessages([...messages, userMessage, errorMessage]);
    }

    setInput('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={[styles.message, msg.role === 'user' ? styles.userMessage : styles.botMessage]}
          >
            {msg.content}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#00f2ff',
    color: '#000',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#1a1a2e',
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    color: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#00f2ff',
    padding: 10,
    borderRadius: 10,
  },
  sendText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
