import React, { useEffect, useState } from 'react';
import { Button, View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getFoodByFdcId } from '@/src/api/fdcApi';
import { getImageByName } from '@/src/api/imageGeneratorApi';
import { StyleSheet } from 'react-native';
import { addRecentFood } from '@/src/api/fireStoreApi';
import { useAuth } from '@/src/providers/AuthProvider';
import { useRouter } from 'expo-router';

interface FoodDetailsProps {
  fdcId: string;
}

const FoodDetails: React.FC<FoodDetailsProps> = () => {
  const user = useAuth();
  const router = useRouter();
  const { fdcId } = useLocalSearchParams();
  console.log('FDCID: ', fdcId);
  console.log('USER: ', user.user?.email);
  // const { data: foodDetailsData, isLoading, error } = useQuery('foodDetails', () => getFoodByFdcId(fdcId));
  const {
    data: foodDetails,
    isLoading: isFoodDetailsLoading,
    error
  } = useQuery(fdcId, () => getFoodByFdcId(fdcId as string));
  const {
    data: image,
    isLoading: isImageLoading,
    error: imageError
  } = useQuery(['image', fdcId], () => getImageByName(foodDetails?.data.description), {
    enabled: !isFoodDetailsLoading && foodDetails != null
  });
  // console.log('IMAGE: ', image?.results);

  const queryClient = useQueryClient();
  const addRecentFoodMutation = useMutation(addRecentFood, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('recentFoods');
    }
  });

  if (isFoodDetailsLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>{foodDetails?.data?.description}</Text>
        </View>
        <View>
          {isImageLoading ? (
            <ActivityIndicator />
          ) : (
            <Image source={{ uri: image?.results?.[0]?.image }} style={{ width: 200, height: 200 }} />
          )}
        </View>
        <View>
          <View style={styles.separator} />

          <Text style={styles.title}>Food Nutrients</Text>

          {foodDetails?.data?.foodNutrients?.map((nutrient: any, index: number) => (
            <View key={index} style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>
                {nutrient.nutrient.name}: {nutrient.amount}
                {nutrient.nutrient.unitName}
              </Text>
            </View>
          ))}
          <View style={styles.separator} />
        </View>
      </ScrollView>
      <View style={styles.fixedItem}>
        <TouchableOpacity style={styles.editButton}>
          <Button
            title='Add to Diary'
            onPress={async () => {
              addRecentFoodMutation.mutate({
                email: user?.user?.email,
                food: { fdcId, name: foodDetails?.data?.description, nutrients: foodDetails?.data?.foodNutrients }
              });
              router.push('/(tabs)/stats');
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  fixedItem: {
    position: 'absolute',
    bottom: 30, // Adjust this value to position the item above the tabs
    width: '100%',
    height: 50, // Adjust this value based on the size of the item
    justifyContent: 'center',
    alignItems: 'center'
  },
  editButton: {
    backgroundColor: 'lightgreen', // Change this to match your design
    borderRadius: 50,
    paddingHorizontal: 20
  }
});

export default FoodDetails;
