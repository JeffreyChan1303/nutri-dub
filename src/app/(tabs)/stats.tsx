import { Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';

import React from 'react';

import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useAuth } from '@/src/providers/AuthProvider';
import { getRecentFoods } from '@/src/api/fireStoreApi';
import { useQuery } from 'react-query';

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
  const user = useAuth().user;
  const { data: recentFoods } = useQuery('recentFoods', () => getRecentFoods(user?.email), { cacheTime: 0 });
  console.log('RECENT FOODS', recentFoods);

  const data = [
    { name: 'Fats', grams: 36, color: 'gold', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Carbs', grams: 135, color: 'lightblue', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Protein', grams: 84, color: 'orange', legendFontColor: '#7F7F7F', legendFontSize: 15 }
  ];

  // const data = [
  //   {
  //     name: 'Fats',
  //     grams: recentFoods?.nutrients?.reduce((total: number, item: any) => {
  //       if (item.nutrient.name === 'Total lipid (fat)') {
  //         return total + item.amount;
  //       }
  //       return total;
  //     }),
  //     color: 'gold',
  //     legendFontColor: '#7F7F7F',
  //     legendFontSize: 15
  //   },
  //   {
  //     name: 'Carbs',
  //     grams: recentFoods?.nutrients?.reduce((total: number, item: any) => {
  //       if (item.nutrient.name === 'Carbohydrate, by difference') {
  //         return total + item.amount;
  //       }
  //       return total;
  //     }),
  //     color: 'lightblue',
  //     legendFontColor: '#7F7F7F',
  //     legendFontSize: 15
  //   },
  //   {
  //     name: 'Protein',
  //     grams: recentFoods?.nutrients?.reduce((total: number, item: any) => {
  //       if (item.nutrient.name === 'Protein') {
  //         return total + item.amount;
  //       }
  //       return total;
  //     }),
  //     color: 'orange',
  //     legendFontColor: '#7F7F7F',
  //     legendFontSize: 15
  //   }
  // ];

  // const recentFoods = [
  //   { name: 'Apple', calories: 95 },
  //   { name: 'Banana', calories: 105 },
  //   { name: 'Orange', calories: 62 }
  // ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Macro-Nutrients Pie Chart</Text>
      <PieChart
        data={data}
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
      <Text style={styles.title}>Recent Foods</Text>
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
        {recentFoods?.map((food: any, index: number) => (
          <View style={{ padding: 8 }} key={index}>
            <Text style={styles.text}>
              {food.name}: {food.nutrients?.find((item: any) => item.nutrient.name === 'Energy').amount} calories
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.fixedItem}>
        <TouchableOpacity style={styles.editButton}>
          <Button title='Press Me' onPress={() => {}} />
        </TouchableOpacity>
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
  }
});
