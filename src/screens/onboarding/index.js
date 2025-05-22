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
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import {onboardingContent} from '../../utils/string';
import {SafeAreaView} from 'react-native-safe-area-context';
const {height, width} = Dimensions.get('window');
import AppIntroSlider from 'react-native-app-intro-slider';
import RenderItem from './components/Items';
import {images} from '../../assets/images';
import * as Animatable from 'react-native-animatable';
import {GradientBorderButton} from '../../components/buttons/GradientBorderButton';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import GradientText from '../../components/text/GradientText';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {NextButton} from '../../components/buttons/NextButton';
import {
  fadeInUpBig,
  fadeInRight,
} from '../../../node_modules/react-native-animatable/definitions/fading-entrances';
import {config} from '../../environment';
const Onboarding = ({navigation, route}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {details} = route?.params || '';
  const flatListRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    headingRef.current?.zoomIn(1000);
    descRef.current?.zoomIn(1000);
    buttonRef.current?.zoomIn(1000);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < details?.length - 1) {
      flatListRef.current?.goToSlide(currentIndex + 1, true);
    }
  };
  const handleSkip = () => {
    flatListRef.current?.goToSlide(4, true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <AppIntroSlider
        ref={flatListRef}
        renderPagination={() => null}
        renderItem={props => (
          <RenderItem
            {...props}
            currentIndex={currentIndex}
            handleNext={handleNext}
            handleSkip={handleSkip}
            navigation={navigation}
          />
        )}
        data={details}
        onSlideChange={index => setCurrentIndex(index)}
      />
      <View style={styles?.itemContainer}>
        <Animatable.View ref={headingRef} useNativeDriver>
          <GradientText style={styles.Heading}>
            {`${details[currentIndex]?.title}`}
          </GradientText>
        </Animatable.View>

        {currentIndex === 4 ? (
          <>
            <Animatable.View ref={buttonRef} useNativeDriver>
              <PrimaryButton
                onPress={() => navigation.navigate('Login')}
                title="Sign in"
              />
              <PrimaryButton
                onPress={() => navigation.navigate('SignUp')}
                title="Sign Up"
              />
            </Animatable.View>
            <View style={styles.slider}>
              {details?.map((i, index) => (
                <Image
                  key={i?.id}
                  style={styles.dots}
                  source={
                    currentIndex === index ? images?.active : images?.inactive
                  }
                />
              ))}
            </View>

            <GradientBorderButton
              onPress={() => Linking.openURL(config?.website)}
              title="How it works!"
              width={width * 0.69}
            />
          </>
        ) : (
          <>
            <Animatable.View ref={descRef} useNativeDriver>
              <Text
                allowFontScaling={false}
                style={[
                  styles.description,
                  {
                    fontFamily: fonts?.montserratRegular,
                    color: colors?.lightGrey,
                  },
                ]}>
                {details[currentIndex]?.description?.slice(0, 52)}
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.description,
                    {
                      fontFamily: fonts?.montserratMedium,
                      color: colors.lightGrey,
                    },
                  ]}>
                  {' '}
                  {details[currentIndex]?.description?.slice(52, 150)}{' '}
                </Text>
              </Text>
            </Animatable.View>

            <View style={styles.slider}>
              {details?.map((i, index) => (
                <Image
                  key={i?.id}
                  style={styles.dots}
                  source={
                    currentIndex === index ? images?.active : images?.inactive
                  }
                />
              ))}
            </View>
            <Animatable.View ref={buttonRef} useNativeDriver>
              {currentIndex !== 4 && <NextButton onPress={handleNext} />}
            </Animatable.View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
