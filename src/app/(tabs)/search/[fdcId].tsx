import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from 'react-query';
import { getFoodByFdcId } from '@/src/api/fdcApi';
import { getImageByName } from '@/src/api/imageGeneratorApi';
import { StyleSheet } from 'react-native';

interface FoodDetailsProps {
  fdcId: string;
}

const FoodDetails: React.FC<FoodDetailsProps> = () => {
  const { fdcId } = useLocalSearchParams();
  // const { data: foodDetailsData, isLoading, error } = useQuery('foodDetails', () => getFoodByFdcId(fdcId));
  const {
    data: foodDetails,
    isLoading: isFoodDetailsLoading,
    error
  } = useQuery(fdcId, () => getFoodByFdcId(fdcId as string));
  // const {
  //   data: image,
  //   isLoading: isImageLoading,
  //   error: imageError
  // } = useQuery(fdcId, () => getImageByName(foodDetails?.data.description), {
  //   enabled: !isFoodDetailsLoading && foodDetails != null
  // });

  if (isFoodDetailsLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
    <View style={styles.container}>
      <>
        <View>
          <Text style={styles.title}>{foodDetails?.data.description}</Text>
        </View>
        <View>
          <View style={styles.separator} />
          <Text style={styles.title}>Food Nutrients</Text>

          {foodDetails?.data.foodNutrients.map((nutrient: any) => (
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>
                {nutrient.nutrient.name}: {nutrient.amount}
                {nutrient.nutrient.unitName}
              </Text>
            </View>
          ))}
          <View style={styles.separator} />
          {/* {isImageLoading ? (
            <Text>Loading image...</Text>
          ) : (
            <Image source={{ uri: image?.results[0].image }} style={{ width: 200, height: 200 }} />
          )} */}
        </View>
      </>
    </View>
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
  }
});

export default FoodDetails;
