import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface CategoryButtonProps {
  title: string;
  imageSource: any;
  path: any;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ title, imageSource, path }) => (
  <Link href={path} asChild>
    <TouchableOpacity style={styles.categoryButton}>
      <View style={styles.iconContainer}>
        <Image source={imageSource} style={styles.icon} resizeMode="cover" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.categoryText}>{title}</Text>
      </View>
    </TouchableOpacity>
  </Link>
);

export default function FoodScreen() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    require('../../../../assets/images/food1.jpg'),
    require('../../../../assets/images/food2.jpg'),
    require('../../../../assets/images/food3.jpg')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrition</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Feather name="settings" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Image 
        source={images[currentImageIndex]}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.categoriesWrapper}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <View style={styles.categoriesContainer}>
          <CategoryButton title="Fruits" imageSource={require('../../../../assets/images/fruit_icon.png')} path="/food/fruits" />
          <CategoryButton title="Vegetables" imageSource={require('../../../../assets/images/vegetable_icon.png')} path="/food/vegetables" />
          <CategoryButton title="Proteins" imageSource={require('../../../../assets/images/protein_icon.png')} path="/food/protein" />
          <CategoryButton title="Dairy" imageSource={require('../../../../assets/images/dairy_icon.png')} path="/food/dairy" />
          <CategoryButton title="Grains" imageSource={require('../../../../assets/images/grains_icon.png')} path="/food/grains" />
          <CategoryButton title="Custom" imageSource={require('../../../../assets/images/custom_icon.png')} path="../search" />
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 'auto',
  },
  settingsButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 50,
    padding: 10,
    marginLeft: 'auto',
  },
  categoriesWrapper: {
    alignItems: 'flex-start',
  },
  categoriesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 20,
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
    width: 190, // Adjust as needed
    height: 80, // Adjust as needed
    backgroundColor: '#C7F6C7',
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 20,
    overflow: 'hidden', // Clip image to the container
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '100%', // Ensure the image takes the full space of the container
    height: '100%', // Ensure the image takes the full space of the container
  },
  textContainer: {
    flex: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '92%',
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
  },
});
