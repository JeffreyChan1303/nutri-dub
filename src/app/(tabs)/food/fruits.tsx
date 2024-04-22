import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image, Modal, Text } from 'react-native';

export default function SearchScreen() {
  const [modalVisible, setModalVisible] = useState(false); 
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleButtonPress = (imageName: string) => {
    const imagePath = '../../../../assets/images/';
    setSelectedImage(`${imagePath}${imageName}`);
    setModalVisible(true); 
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsGroup}>
          <View style={styles.buttonsRow}>
            <TouchableOpacity onPress={() => handleButtonPress('applestat.png')}>
              <Image source={require('../../../../assets/images/fruit1.jpg')} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleButtonPress('fruit2.jpg')}>
              <Image source={require('../../../../assets/images/fruit2.jpg')} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsRow}>
            <TouchableOpacity onPress={() => handleButtonPress('fruit3.jpg')}>
              <Image source={require('../../../../assets/images/fruit3.jpg')} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleButtonPress('fruit4.jpg')}>
              <Image source={require('../../../../assets/images/fruit4.jpg')} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsRow}>
            <TouchableOpacity onPress={() => handleButtonPress('fruit5.jpg')}>
              <Image source={require('../../../../assets/images/fruit5.jpg')} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleButtonPress('fruit6.jpg')}>
              <Image source={require('../../../../assets/images/fruit6.jpg')} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedImage && <Image source={{uri: selectedImage}} style={styles.modalImage} />}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    height: 300,
    width: 300,
    borderRadius: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
