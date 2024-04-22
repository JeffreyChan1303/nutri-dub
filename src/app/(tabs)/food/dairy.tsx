import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Text } from '@/src/components/Themed';
import { Link } from 'expo-router';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsGroup}>
          <View style={styles.buttonsRow}>
            <Link href='/(tabs)/search/2340823' asChild>
              <TouchableOpacity onPress={() => console.log('Button 1 pressed')}>
                <Image source={require('../../../../assets/images/dairy1.jpg')} style={styles.buttonImage} />
              </TouchableOpacity>
            </Link>
            <Link href='/(tabs)/search/2341173' asChild>
              <TouchableOpacity onPress={() => console.log('Button 2 pressed')}>
                <Image source={require('../../../../assets/images/dairy2.jpg')} style={styles.buttonImage} />
              </TouchableOpacity>
            </Link>
          </View>
          <View style={styles.buttonsRow}>
          <Link href='/(tabs)/search/2345704' asChild>
              <TouchableOpacity onPress={() => console.log('Button 3 pressed')}>
                <Image source={require('../../../../assets/images/dairy3.jpg')} style={styles.buttonImage} />
              </TouchableOpacity>
            </Link>
            <Link href='/(tabs)/search/2341000' asChild>
              <TouchableOpacity onPress={() => console.log('Button 4 pressed')}>
                <Image source={require('../../../../assets/images/dairy4.jpg')} style={styles.buttonImage} />
              </TouchableOpacity>
            </Link>
          </View>
          <View style={styles.buttonsRow}>
          <Link href='/(tabs)/search/2340762' asChild>
              <TouchableOpacity onPress={() => console.log('Button 5 pressed')}>
                <Image source={require('../../../../assets/images/dairy5.jpg')} style={styles.buttonImage} />
              </TouchableOpacity>
            </Link>
            <Link href='/(tabs)/search/2341033' asChild>
              <TouchableOpacity onPress={() => console.log('Button 6 pressed')}>
                <Image source={require('../../../../assets/images/dairy6.jpg')} style={styles.buttonImage} />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  searchBar: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 0,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsGroup: {
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonImage: {
    height: 180,
    width: 180,
    borderRadius: 20,
    marginHorizontal: 10, // Add horizontal margin to create space between buttons
  },
});
