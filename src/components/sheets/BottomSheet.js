import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlueTick, Gallery } from '../../assets/images/svgs';
import { NextButton } from '../../components/buttons/NextButton';
import GradientText from '../../components/text/GradientText';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors';
import { sideBottomSheetOptions } from '../../utils/string';
import { styles } from './styles';

export default function RNBottomSheet({sheetRef, setIsSheetOpen}) {
  const [selected, setSelected] = useState({
    id: 'post',
    title: 'Post',
    desc: 'To make sure your post reaches the right people...',
    route: 'CreatePost',
  });
  const navigation = useNavigation();
  const handlePress = () => {  
    navigation?.navigate(selected?.route);
    if (selected?.id === 'story') {
      navigation?.navigate(selected?.route, {isHighlight: false});
    }
  };
  return (
    <BottomSheet
      onChange={index => {
        setIsSheetOpen(index >= 0);
      }}
      index={-1}
      enablePanDownToClose={true}
      // snapPoints={['25%', '60%', '90%']}
      ref={sheetRef}>
      <BottomSheetView style={styles.contentContainer}>
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
      </BottomSheetView>
    </BottomSheet>
  );
}
