import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';

const DailyLoginScreen = ({ navigation }: any) => {
  const daysLoggedIn = 6;
  const rewardDayCount = 7;

  const weekDays = [
    { day: 'MON', checked: true },
    { day: 'TUE', checked: true },
    { day: 'WED', checked: true },
    { day: 'THU', checked: true },
    { day: 'FRI', checked: true },
    { day: 'SAT', checked: true },
    { day: 'SUN', checked: false }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Text style={styles.title}>Daily Login!</Text>
      <Text style={styles.subtitle}>You've logged in for {daysLoggedIn} days in a row!</Text>

      <View style={styles.calendar}>
        {weekDays.map((item, index) => (
          <View key={index} style={styles.dayBox}>
            <Text style={styles.dayText}>{item.day}</Text>
            {item.checked ? (
              <Image style={styles.checkmark} source={require('../../../../assets/ryhanImg/checkmark.png')} />
            ) : index + 1 === daysLoggedIn ? (
              <Image style={styles.checkmark} source={require('../../../../assets/ryhanImg/loginReward.png')} />
            ) : null}
          </View>
        ))}
      </View>

      <Text style={styles.loginPrompt}>
        Login for {rewardDayCount - daysLoggedIn} more day{rewardDayCount - daysLoggedIn !== 1 && 's'} to receive your
        reward!
      </Text>

      {/* TouchableOpacity as a button */}
      <Link href='/(tabs)/profile/rewards' asChild>
        <TouchableOpacity style={styles.viewRewardsButton}>
          <Text style={styles.viewRewardsText}>View Rewards</Text>
        </TouchableOpacity>
      </Link>

      {/* Bottom tab bar would go here */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20
  },
  subtitle: {
    fontSize: 24,
    color: 'white',
    marginVertical: 20
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10
  },
  dayBox: {
    width: 90,
    height: 90,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  checkmark: {
    position: 'absolute',
    bottom: 5,
    width: 24,
    height: 24
  },
  loginPrompt: {
    fontSize: 16,
    color: 'white',
    marginTop: 20,
    marginBottom: 40
  },
  viewRewardsButton: {
    backgroundColor: '#007AFF', // Button color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20 // Adjust as necessary
  },
  viewRewardsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
  // Add styles for the bottom tab bar
});

export default DailyLoginScreen;
