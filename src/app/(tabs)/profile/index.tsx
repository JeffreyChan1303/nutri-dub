import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import Button from '@/src/components/Button';
import { FIREBASE_AUTH } from '@/firebase.config';
import { Link } from 'expo-router';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />

      <View>
        <Link href='/(tabs)/profile/rewards' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Rewards</Text>
          </TouchableOpacity>
        </Link>
        <Link href='/(tabs)/profile/daily' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Daily Login</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <Button
        text='Log out'
        onPress={() => {
          FIREBASE_AUTH.signOut();
        }}
      />
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
    marginVertical: 10,
    minWidth: 150
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  }
});
