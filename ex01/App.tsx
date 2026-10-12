
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Index() {
  const [message, setMessage] = useState('Hello, React Native!');

  const handlePress = () => {
    setMessage((currentMessage) =>
      currentMessage === 'Hello, React Native!'
        ? 'Hello World!'
        : 'Hello, React Native!'
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>

      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Press me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
