import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* <Stack.Screen options={{ title: 'Sign in' }} /> */}

      <Image
        source={require('@/assets/images/nutri-dub-logo.png')}
        style={{ width: 200, height: 250, alignSelf: 'center', objectFit: 'contain' }}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder='jon@gmail.com' style={styles.input} />

      <Text style={styles.label}>Password</Text>
      <TextInput value={password} onChangeText={setPassword} placeholder='' style={styles.input} secureTextEntry />

      <Link href='/(tabs)/home' asChild>
        <Button text='Sign in' />
      </Link>
      <Link href='/(auth)/signup' style={styles.textButton}>
        Create an account
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1
  },
  label: {
    color: 'gray'
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10
  }
});

export default SignInScreen;
