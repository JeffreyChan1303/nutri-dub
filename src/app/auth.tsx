import { View, Text, TextInput, StyleSheet, Image, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import { Link, Redirect, Stack } from 'expo-router';

import { FIREBASE_AUTH } from '@/firebase.config';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      setUser(userCredential.user);
    } catch (error) {
      alert('Sign in failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      setUser(userCredential.user);
    } catch (error) {
      alert('Sign up failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Redirect href={'/'} />;
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding'>
        <Image
          source={require('@/assets/images/nutri-dub-logo.png')}
          style={{ width: 200, height: 250, alignSelf: 'center', objectFit: 'contain' }}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder='jon@gmail.com'
          style={styles.input}
          autoCapitalize='none'
        />

        <Text style={styles.label}>Password</Text>
        <TextInput value={password} onChangeText={setPassword} placeholder='' style={styles.input} secureTextEntry />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Button text='Sign in' onPress={handleSignIn} />
            <Button text='Sign up' onPress={handleSignUp} />
          </>
        )}
      </KeyboardAvoidingView>
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
