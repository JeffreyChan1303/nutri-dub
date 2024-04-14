import { Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';

import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useAuth } from '@/src/providers/AuthProvider';
import { getRecentFoods, updateRecentFoods } from '@/src/api/fireStoreApi';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5
};

export default function StatsScreen() {
  const queryClient = useQueryClient();
  const user = useAuth().user;
  const { data: recentFoods } = useQuery('recentFoods', () => getRecentFoods(user?.email), { cacheTime: 0 });
  // console.log('RECENT FOODS', recentFoods);

  const updateRecentFoodsMutation = useMutation(updateRecentFoods, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('recentFoods');
    }
  });

  const pieChartData = [
    { name: 'Fats', grams: 36, color: 'gold', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Carbs', grams: 135, color: 'lightblue', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Protein', grams: 84, color: 'orange', legendFontColor: '#7F7F7F', legendFontSize: 15 }
  ];

  const totalCalories = recentFoods?.reduce((total: number, item: any) => {
    const calorieIndex = item?.nutrients.findIndex((nutrient: any) => nutrient.nutrient.name === 'Energy');
    const calorieAmount = item?.nutrients[calorieIndex]?.amount || 0;
    return total + calorieAmount;
  }, 0);
  let totalFats = recentFoods?.reduce((total: number, item: any) => {
    const fatIndex = item?.nutrients.findIndex((nutrient: any) => nutrient.nutrient.name === 'Total lipid (fat)');
    const fatAmount = item?.nutrients[fatIndex]?.amount || 0;
    return total + fatAmount;
  }, 0);
  let totalCarbs = recentFoods?.reduce((total: number, item: any) => {
    const carbIndex = item?.nutrients.findIndex(
      (nutrient: any) => nutrient.nutrient.name === 'Carbohydrate, by difference'
    );
    const carbAmount = item?.nutrients[carbIndex]?.amount || 0;
    return total + carbAmount;
  }, 0);
  let totalProtein = recentFoods?.reduce((total: number, item: any) => {
    const proteinIndex = item?.nutrients.findIndex((nutrient: any) => nutrient.nutrient.name === 'Protein');
    const proteinAmount = item?.nutrients[proteinIndex]?.amount || 0;
    return total + proteinAmount;
  }, 0);

  console.log('MACROS: ', totalFats, totalCarbs, totalProtein);
  pieChartData[0].grams = parseFloat(totalFats.toFixed(2));
  pieChartData[1].grams = parseFloat(totalCarbs.toFixed(2));
  pieChartData[2].grams = parseFloat(totalProtein.toFixed(2));

  const handleDeleteRecentFood = (index: number) => {
    const updatedFoods = recentFoods?.filter((_: any, i: number) => i !== index);
    console.log('UPDATED FOODS:', updatedFoods);
    updateRecentFoodsMutation.mutate({ email: user?.email, foods: updatedFoods });
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.title}>Macro-Nutrients Pie Chart</Text>
      </View>
      <PieChart
        data={pieChartData}
        width={screenWidth}
        height={240}
        chartConfig={chartConfig}
        accessor={'grams'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        center={[0, 0]}
        absolute
      />
      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.title}>Recent Foods</Text>
      </View>
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
        {recentFoods?.map((food: any, index: number) => (
          <View style={{ padding: 8, flexDirection: 'row' }} key={index}>
            <Text style={styles.text}>
              {food.name}: {food.nutrients?.find((item: any) => item.nutrient.name === 'Energy').amount} calories
            </Text>

            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteRecentFood(index)}>
              <Ionicons name='close' size={24} color='red' />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ ...styles.title }}>Daily Calorie Count: {totalCalories} calories</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    padding: 12
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
    bottom: 50, // Adjust this value to position the item above the tabs
    width: '100%',
    height: 50, // Adjust this value based on the size of the item
    justifyContent: 'center',
    alignItems: 'center'
  },
  editButton: {
    backgroundColor: 'lightgreen', // Change this to match your design
    borderRadius: 50,
    paddingHorizontal: 20
  },
  deleteButton: {}
});
