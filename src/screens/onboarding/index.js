import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import GradientText from '../../components/text/GradientText';
import {styles} from './styles';
import {NextButton} from '../../components/buttons/NextButton';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {images} from '../../assets/images';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {onboardingContent} from '../../utils/string';
import {GradientBorderButton} from '../../components/buttons/GradientBorderButton';
import { config } from '../../environment/index';
import { SafeAreaView } from 'react-native-safe-area-context';
const {height, width} = Dimensions.get('window');

const Onboarding = ({navigation}) => {
  const [page, setPage] = useState(0);

  const handleOnPress = () => {
    if (page < 4) {
      setPage(page + 1);
    } else {
      console.log('its exceeding');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <ImageBackground source={onboardingContent[page]?.image}>
        {page != 4 && (
          <TouchableOpacity
            onPress={() => {
              setPage(4);
            }}
            style={styles?.skipButton}>
            <GradientText style={styles.text}>SKIP</GradientText>
          </TouchableOpacity>
        )}
        <View
          style={[
            styles.bottomContainer,
            {marginTop: page === 4 ? height * 0.65 : height * 0.61},
          ]}>
          <GradientText style={styles.Heading}>
            {onboardingContent[page]?.heading}
          </GradientText>

          {page === 4 ? (
            <>
              <PrimaryButton
                onPress={() => {
                  // navigation.navigate('SignIn');
                }}
                title="Sign in"
              />
              <PrimaryButton
                onPress={() => {
                  // navigation.navigate('SignUp');
                }}
                title="Sign Up"
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
                {onboardingContent[page]?.description.slice(0, 52)}
                <Text
                  style={[
                    styles.description,
                    {
                      fontFamily: fonts?.montserratMedium,
                      color: colors.lightGrey,
                    },
                  ]}>
                  {' '}
                  {onboardingContent[page]?.description.slice(52, 150)}{' '}
                </Text>
              </Text>
              <View style={styles.slider}>
                {onboardingContent?.map(i => {
                  return (
                    <>
                      {page === i?.id ? (
                        <Image style={styles.dots} source={images?.active} />
                      ) : (
                        <Image style={styles.dots} source={images?.inactive} />
                      )}
                    </>
                  );
                })}
              </View>
              <NextButton onPress={handleOnPress} />
            </>
          )}

          {page === 4 && (
            <>
              <View style={styles.slider}>
                {onboardingContent?.map(i => {
                  return (
                    <>
                      {page === i?.id ? (
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
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Onboarding;
