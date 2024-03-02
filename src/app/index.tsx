import { View, Text, ActivityIndicator, Button, Image } from 'react-native';
import React from 'react';
import { Link, Redirect } from 'expo-router';
// import { useAuth } from '@/providers/AuthProvider';
// import { supabase } from '@/lib/supabase';

const index = () => {
  // const { session, loading, isAdmin } = useAuth();

  // if (loading) {
  //   return <ActivityIndicator />;
  // }

  // if (!session) {
  //   return <Redirect href={'/sign-in'} />;
  // }

  // if (!isAdmin) {
  //   return <Redirect href={'/(tabs)'} />;
  // }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Redirect href={'/(auth)/signin'} />
      <Link href={'/(tabs)/home'} asChild>
        <Button title='Tabs' />
      </Link>
      <Button title='Sign out' />
      {/* <Button onPress={() => supabase.auth.signOut()} text='Sign out' /> */}
    </View>
  );
};

export default index;
