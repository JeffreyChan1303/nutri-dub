import { Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { useQuery, useIsFetching } from 'react-query';
import { getFdcFoodsBySearchName } from '@/src/api/fdcApi';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [enableSearch, setEnableSearch] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  const {
    data: foodSearch,
    isLoading: isFoodSearchLoading,
    error: foodSearchError,
    refetch: refetchFoodSearch
  } = useQuery('search', () => getFdcFoodsBySearchName(searchQuery), {
    enabled: enableSearch // Only run the query when enableSearch is true
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setEnableSearch(false); // Prevent the query from running automatically
  };

  const runSearch = async () => {
    setIsRefetching(true);
    await refetchFoodSearch();
    setIsRefetching(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          marginVertical: 20
        }}
      >
        <TextInput
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder='Search...'
          style={{
            height: 40,
            width: '80%',
            borderColor: 'gray',
            borderWidth: 1,
            paddingHorizontal: 6,
            borderRadius: 50
          }}
        />
        <Button title='Search' onPress={() => runSearch()} />
      </View>

      <View style={{ marginBottom: 5 }}>
        <Text>Number of Entries: {foodSearch?.data.totalHits}</Text>
      </View>
      {isFoodSearchLoading || isRefetching ? (
        <Text>Loading...</Text>
      ) : (
        <View style={{ width: '90%' }}>
          <FlatList
            data={foodSearch?.data.foods}
            renderItem={({ item }) => (
              <View>
                <Link href={`/search/${item.fdcId}`} asChild>
                  <TouchableOpacity style={styles.button}>
                    <Text numberOfLines={1} style={styles.buttonText}>
                      {item.description}
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
    // justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  button: {
    width: '95%',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
    marginVertical: 5,
    borderRadius: 50,
    borderWidth: 1
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left'
  }
});
