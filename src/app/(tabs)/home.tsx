import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import Button from '@/src/components/Button';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back XXXX!</Text>
      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />

      <View style={{ marginBottom: 20 }}>
        <Text style={{ ...styles.title }}>Daily Calorie Count: 1000k calories</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 32 }}>
        <View>
          <Button text='Nutrition' />
          <Link href='/(tabs)/stats' asChild>
            <Button text='Stats' />
          </Link>
        </View>
        <View>
          <Button text='Health Score' />
          <Button text='Daily Login' />
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
  }
});
