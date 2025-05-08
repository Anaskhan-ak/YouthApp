import { BlurView } from "@react-native-community/blur";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BlackBackArrow, BlackYouthLogo } from '../../assets/images/svgs';
import YudioReactions from '../../components/reactions/yudioReactions';
import { colors } from '../../utils/colors';
import YudioCard from './components/yudioCard';
import { styles } from './styles';

const Yudios = () => {
  const yudios = [
    require('../../assets/images/SignupImage.jpeg'),
    require('../../assets/images/SignupImage.jpeg'),
    require('../../assets/images/SignupImage.jpeg'),
  ];
  return (
    <SafeAreaView style={styles?.container}>
      {/* Header */}
      <View style={styles?.header}>
        <TouchableOpacity style={styles?.headerIcon}>
          <BlackBackArrow />
        </TouchableOpacity>
        {['For You', 'Following', 'Trending', 'Live']?.map(item => {
          return (
            <TouchableOpacity>
              <Text style={[styles?.headerText, {color: colors?.gray}]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity style={styles?.headerIcon}>
          <BlackYouthLogo />
        </TouchableOpacity>
      </View>
      {/* Yudio Card */}
      <YudioCard />
      {/* Reactions */}
      <View style={styles?.reactions}>
        <YudioReactions />
      </View>
      {/* Suggested Yudios */}
      <View style={styles?.suggestedView}>
        <Text style={styles?.suggestedHeading}>More by Mohamed Mostafa</Text>
        <FlatList
          data={yudios}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles?.suggestedButton}>
                <Image source={item} style={styles?.suggestedImage} />
              </TouchableOpacity>
            );
          }}
          horizontal
        />
      </View>
      {/* Blur Bottom View */}
      <View style={styles?.blurContainer}>
        <Text style={styles?.blurText}></Text>
        <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      </View>
    </SafeAreaView>
  );
};

export default Yudios;
