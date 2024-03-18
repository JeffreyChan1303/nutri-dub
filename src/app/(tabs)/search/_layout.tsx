import { Stack } from 'expo-router';

export default function SearchStack() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Search' }} />
      <Stack.Screen name='[fdcId]' options={{ title: 'Food Details' }} />
    </Stack>
  );
}
