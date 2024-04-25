import { Stack } from 'expo-router';

export default function ProfileStack() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Profile' }} />
      <Stack.Screen name='rewards' options={{ title: 'Rewards' }} />
      <Stack.Screen name='daily' options={{ title: 'Daily Login' }} />
    </Stack>
  );
}
