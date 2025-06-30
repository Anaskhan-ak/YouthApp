import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlueTick, Gallery } from '../../assets/images/svgs';
import { NextButton } from '../../components/buttons/NextButton';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import GradientText from '../../components/text/GradientText';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors';
import {
  profileSettingsOptions,
  sideBottomSheetOptions,
} from '../../utils/string';
import { styles } from './styles';

export default function RNBottomSheet({sheetRef, setIsSheetOpen, isProfile}) {
  const [selected, setSelected] = useState(
    isProfile
      ? {
          id: 'wallet',
          title: 'My Wallet',
          route: '',
        }
      : {
          id: 'post',
          title: 'Post',
          desc: 'To make sure your post reaches the right people...',
          route: 'CreatePost',
        },
  );
  const navigation = useNavigation();
  const handlePress = () => {
    console.log('selected?.route', selected?.route);
    navigation?.navigate(selected?.route);
    if (selected?.id === 'story') {
      navigation?.navigate(selected?.route, {isHighlight: false});
    }
  };

  const handleNavigation = item => {
    // console.log("item", item)
    if (item?.id === 'settings' || item?.id === 'activity') {
      const isSettings = item?.id === 'settings' ? true : false;
      navigation?.navigate(item?.route, {isSettings: isSettings});
    }
    if (item?.id === 'saved' || item?.id === 'archive') {
      const isSaved = item?.id === 'saved' ? true : false;
      navigation?.navigate(item?.route, {isSaved: isSaved});
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.setItem('token', '');
    await AsyncStorage.setItem('UserLocalData', '');
    navigation?.navigate('Login');
  };
  return (
    <BottomSheet
      onChange={index => {
        setIsSheetOpen(index >= 0);
      }}
      index={-1}
      enablePanDownToClose={true}
      snapPoints={['95%']}
      ref={sheetRef}>
      <BottomSheetView style={styles.contentContainer}>
        {isProfile ? (
          <View>
            <FlatList
              data={profileSettingsOptions}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleNavigation(item)}>
                    <View style={styles.optionsButton}>
                      <Text style={styles.optionsButtonText}>
                        {item?.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              ListFooterComponent={
                <PrimaryButton title="Log out" onPress={handleLogout} />
              }
            />
          </View>
        ) : (
          <View>
            <GradientText style={styles.heading}>
              What do you want to create?
            </GradientText>
            {sideBottomSheetOptions?.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    // console.log('Item', item?.route);
                    setSelected(item);
                  }}>
                  <LinearGradient
                    colors={
                      selected?.id === item?.id
                        ? [colors?.RGB1, colors?.RGB2]
                        : [colors?.white, colors?.white]
                    }
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.cardContainer}>
                    <View style={styles.cardInner}>
                      <View style={styles.iconContainer}>
                        <Gallery height={height * 0.07} width={width * 0.07} />
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.title}>{item?.title}</Text>
                        <Text style={styles.desc}>{item?.desc}</Text>
                      </View>
                      <View style={styles.indicatorContainer}>
                        {selected?.id === item?.id ? (
                          <BlueTick width={18} height={18} />
                        ) : (
                          <View style={styles.unselectedIndicator} />
                        )}
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
            <View style={styles?.btnContainer}>
              <NextButton
                onPress={handlePress}
                width={width * 0.6}
                title={'Create New Post'}
              />
            </View>
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}
