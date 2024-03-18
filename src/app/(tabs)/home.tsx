import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-query';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import Button from '@/src/components/Button';
import { Link } from 'expo-router';
import { getImageByName } from '@/src/api/imageGeneratorApi';
import { getFoodByFdcId, getFoodList, getFdcFoodsBySearchName } from '@/src/api/fdcApi';
import { getUserByEmail } from '@/src/api/fireStoreApi';

export default function HomeScreen() {
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError
  } = useQuery('user', () => getUserByEmail('test@gmail.com'));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back XXX!</Text>
      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />

      <View style={{ marginBottom: 20 }}>
        <Text style={{ ...styles.title }}>Daily Calorie Count: {user?.daily_calories} calories</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 32 }}>
        <View>
          <Link href='/(tabs)/home' asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Food</Text>
            </TouchableOpacity>
          </Link>
          <Link href='/(tabs)/stats' asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Stats</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View>
          <Link href='/(tabs)/home' asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Health Score</Text>
            </TouchableOpacity>
          </Link>
          <Link href='/(tabs)/home' asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Daily Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  button: {
    backgroundColor: '#2f95dc',
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  }
});
