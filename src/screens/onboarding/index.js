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
import React, {useRef, useState} from 'react';
import {styles} from './styles';
import {onboardingContent} from '../../utils/string';
import {SafeAreaView} from 'react-native-safe-area-context';
const {height, width} = Dimensions.get('window');
import AppIntroSlider from 'react-native-app-intro-slider';
import {renderItem} from './components/Items';

const Onboarding = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < onboardingContent.length - 1) {
      flatListRef.current?.goToSlide(currentIndex + 1, true);
      // setCurrentIndex(prev => prev + 1);
    }
  };
const handleSkip = () =>{
  flatListRef.current?.goToSlide(4, true);
  // setCurrentIndex(4);
}
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
        renderItem={props =>
          renderItem({...props, currentIndex, handleNext,navigation,handleSkip})
        }
        data={onboardingContent}
        onSlideChange={index => setCurrentIndex(index)}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
