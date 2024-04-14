import { View, Text, ActivityIndicator, Button, Image } from 'react-native';
import React from 'react';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';

const index = () => {
  const { user, loading } = useAuth();

  if (!user) {
    console.log('INDEX.TSX', user);
    return <Redirect href={'/auth'} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Text>This is the index.tsx page, supposed to redirect to the login page</Text>
      <Redirect href={'/(tabs)/home'} />
    </View>
  );
};

export default index;
