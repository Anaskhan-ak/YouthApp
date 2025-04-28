import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {height, width} from '../../../constant';
import {colors} from '../../../utils/colors';
import {gender} from '../../../utils/string';
import {GreenCheckMark} from '../../../assets/images/svgs';
import {fonts} from '../../../utils/fonts';
import { styles } from './styles';

const GenderModal = ({modalVisible, setModalVisible, setGender, value}) => {
  const handlePress = i => {
    setGender(i?.name);
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles?.container}>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles?.modalOverlay}>
          <View style={styles?.modalContent}>
            <LinearGradient
              style={styles?.header}
              colors={[colors?.RGB1, colors?.RGB2]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text
                style={{
                  fontFamily: fonts?.montserratSemiBold,
                  color: colors?.white,
                }}>
                Gender
              </Text>
            </LinearGradient>
            {gender?.map((i, index) => {
              return (
                <>
                  <TouchableOpacity
                    key={i.id}
                    style={styles?.contentView}
                    onPress={() => handlePress(i)}>
                    <Text style={styles?.content}>{i.name}</Text>

                    {value === i.name ? (
                      <GreenCheckMark />
                    ) : (
                      <View style={styles?.unSelect} />
                    )}
                  </TouchableOpacity>
                  {index !== 2 && <View style={styles?.line} />}
                </>
              );
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default GenderModal;
