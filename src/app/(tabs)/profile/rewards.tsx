import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const rewardsData = [
  {
    id: '1',
    title: 'Super Sun',
    description: 'Earn Super Sun after logging in for 365 consecutive days!',
    image: '/Users/jeffreychan/cs_hw/uni_year_three/nutri-dub/assets/ryhanImg/loginReward.png'
  },
  {
    id: '2',
    title: 'Epic Eclipse',
    description: 'Earn Epic Eclipse after logging in during a solar or lunar eclipse',
    image: '/Users/jeffreychan/cs_hw/uni_year_three/nutri-dub/assets/ryhanImg/eclipse.png'
  },

  {
    id: '3',
    title: 'Mega Moon',
    description: 'Earn Mega Moon after logging in for 365 nights',
    image: '/Users/jeffreychan/cs_hw/uni_year_three/nutri-dub/assets/ryhanImg/moon.png'
  }
];

const RewardsScreen = () => {
  const [redeemed, setRedeemed] = useState({});

  const handleRedeem = (id: any) => {
    setRedeemed((prevState) => ({
      ...prevState,
      [id]: true
    }));
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.rewardCard}>
      <Image style={styles.rewardImage} source={{ uri: item.image }} />
      <Text style={styles.rewardTitle}>{item.title}</Text>
      <Text style={styles.rewardDescription}>{item.description}</Text>
      {redeemed[item.id] ? (
        <Text style={styles.redeemedText}>Redeemed</Text>
      ) : (
        <TouchableOpacity style={styles.rewardButton} onPress={() => handleRedeem(item.id)}>
          <Text style={styles.rewardButtonText}>Redeem</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rewardsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500'
  },
  listContainer: {
    padding: 16
  },
  rewardCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 3, width: 0 },
    elevation: 3
  },
  rewardImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8
  },
  rewardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  rewardButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5
  },
  rewardButtonText: {
    color: 'white',
    fontWeight: '600'
  },
  redeemedText: {
    fontSize: 16,
    color: 'green',
    marginTop: 10
  }
});

export default RewardsScreen;
