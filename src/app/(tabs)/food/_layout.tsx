import { Stack } from 'expo-router';

export default function SearchStack() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Nutrition' }} />
      <Stack.Screen name='dairy' options={{ title: 'Dairy' }} />
      <Stack.Screen name='fruits' options={{ title: 'Fruits' }} />
      <Stack.Screen name='grains' options={{ title: 'Grains' }} />
      <Stack.Screen name='protein' options={{ title: 'Protein' }} />
      <Stack.Screen name='vegetables' options={{ title: 'Vegetables' }} />
    </Stack>
  );
}