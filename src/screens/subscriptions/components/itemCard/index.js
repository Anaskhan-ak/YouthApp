import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {height, width} from '../../../../constant';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';

const ItemCard = ({item}) => {
  return (
    <View style={styles?.contentView}>
      <View style={styles?.itemLeftContent}>
        <Image
          source={
            item?.photo
              ? {uri: item?.photo}
              : require('../../../../assets/images/ChatBackground.png')
          }
          style={styles?.itemImage}
        />
        <Text style={styles?.itemName}>
          {`${item?.firstName} ${item?.lastName}`}
        </Text>
      </View>
      {item?.isFollowing ? (
        <PrimaryButton
          width={width * 0.225}
          height={height * 0.0325}
          marginTop={-2}
          title="Removed"
          styles={styles?.gradientButton}
          textStyle={styles?.gradientButtonText}
          //    onPress={() => toggleFollow(item?.id)}
        />
      ) : (
        <TouchableOpacity
          style={styles?.grayButton}
          //    onPress={() => toggleFollow(item?.id)}
        >
          <Text style={styles?.grayButtonText}>Remove</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ItemCard;
