import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles';
import GradientText from '../../../components/text/GradientText';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {GradientBorderButton} from '../../../components/buttons/GradientBorderButton';
import {height, width} from '../../../constant';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {onboardingContent} from '../../../utils/string';
import {images} from '../../../assets/images';
import {NextButton} from '../../../components/buttons/NextButton';

export const renderItem = ({
  item,
  index,
  currentIndex,
  handleNext,
  navigation,
  handleSkip,
}) => (
  <View style={[styles.container]}>
    {index != 4 && (
    <TouchableOpacity onPress={handleSkip} style={styles?.skipButton}>
      <GradientText style={styles.text}>SKIP</GradientText>
    </TouchableOpacity>
     )} 
    <Image source={item.image} style={styles.imageBg} />

    <View style={styles?.itemContainer}>
      <GradientText style={styles.Heading}>{item?.heading}</GradientText>

      {index === 4 ? (
        <>
          <PrimaryButton
            onPress={() => {
              navigation.navigate('Login');
            }}
            title="Sign in"
          />
          <PrimaryButton
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            title="Sign Up"
          />

          <View style={styles.slider}>
            {onboardingContent?.map(i => {
              return (
                <>
                  {index === i?.id ? (
                    <Image style={styles.dots} source={images?.active} />
                  ) : (
                    <Image style={styles.dots} source={images?.inactive} />
                  )}
                </>
              );
            })}
          </View>
          <GradientBorderButton
            onPress={() => {
              Linking.openURL(config.website);
            }}
            title="How it works!"
            width={width * 0.69}
          />
        </>
      ) : (
        <>
          <Text
            style={[
              styles.description,
              {
                fontFamily: fonts?.montserratRegular,
                color: colors?.lightGrey,
              },
            ]}>
            {onboardingContent[index]?.description.slice(0, 52)}
            <Text
              style={[
                styles.description,
                {
                  fontFamily: fonts?.montserratMedium,
                  color: colors.lightGrey,
                },
              ]}>
              {' '}
              {onboardingContent[index]?.description.slice(52, 150)}{' '}
            </Text>
          </Text>
          <View style={styles.slider}>
            {onboardingContent?.map(i => {
              return (
                <>
                  {index === i?.id ? (
                    <Image style={styles.dots} source={images?.active} />
                  ) : (
                    <Image style={styles.dots} source={images?.inactive} />
                  )}
                </>
              );
            })}
          </View>
          {index !== 4 && <NextButton onPress={handleNext} />}
        </>
      )}
    </View>
  </View>
);
