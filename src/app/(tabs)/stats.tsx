import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';

import React from 'react';

import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

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
  const data = [
    { name: 'Fats', grams: 36, color: 'gold', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Carbs', grams: 135, color: 'lightblue', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Protein', grams: 84, color: 'orange', legendFontColor: '#7F7F7F', legendFontSize: 15 }
  ];

  const recentFoods = [
    { name: 'Apple', calories: 95 },
    { name: 'Banana', calories: 105 },
    { name: 'Orange', calories: 62 }
  ];

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
      {recentFoods.map((food) => (
        <View style={{ padding: 8 }} key={food.name}>
          <Text style={styles.text}>
            {food.name}: {food.calories} calories
          </Text>
        </View>
      ))}
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
  }
});
