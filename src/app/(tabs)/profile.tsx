import { StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import Button from '@/src/components/Button';
import { FIREBASE_AUTH } from '@/firebase.config';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />

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
  }
});
