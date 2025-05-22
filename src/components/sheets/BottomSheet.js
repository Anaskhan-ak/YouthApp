import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import GradientText from '../../components/text/GradientText';
import {height, width} from '../../constant';
import {fonts} from '../../utils/fonts';
import {BlueTick, Gallery} from '../../assets/images/svgs';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../utils/colors';
import {sideBottomSheetOptions} from '../../utils/string';
import {NextButton} from '../../components/buttons/NextButton';
import {useNavigation} from '@react-navigation/native';

export default function RNBottomSheet({sheetRef}) {
  const [selected, setSelected] = useState({
    id: 'post',
    title: 'Post',
    desc: 'To make sure your post reaches the right people...',
    route: '',
  });
  const navigation = useNavigation();
  const handlePress = () => {
    navigation?.navigate(selected?.route);
  };
  return (
    <View style={{flex: 1}}>
      <BottomSheet index={-1} enablePanDownToClose={true} ref={sheetRef}>
        <BottomSheetView style={styles.contentContainer}>
          <GradientText style={styles.heading}>
            What do you want to create?
          </GradientText>
          {sideBottomSheetOptions?.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelected(item)}>
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
          ))}
          <NextButton
            onPress={handlePress}
            width={width * 0.6}
            title={'Create New Post'}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: height * 0.09,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors?.white,
    overflow: 'hidden',
  },
  heading: {
    alignSelf: 'center',
    fontFamily: fonts?.montserratExtraBold,
    fontSize: width * 0.058,
    textAlign: 'center',
    letterSpacing: -1,
    marginVertical: 12,
  },
  cardContainer: {
    height: height * 0.08,
    borderRadius: 16,
    marginVertical: 6,
    padding: 1.5,
  },
  cardInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors?.white,
    borderRadius: 14,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 1.5,
  },
  iconContainer: {
    width: width * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: fonts?.montserratExtraBold,
    fontSize: width * 0.04,
    color: '#000',
  },
  desc: {
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.028,
    color: '#666',
    marginTop: 2,
  },
  indicatorContainer: {
    width: 24,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  unselectedIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: '#5392E9',
  },
});
