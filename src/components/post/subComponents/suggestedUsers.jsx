import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { images } from '../../../assets/images';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const SuggestedUsers = () => {
  const navigation = useNavigation()
  const data = [
    {
      name: 'Sannya Wasim',
      photo: images?.onboarding1,
      cover: images?.palestine,
    },
    {
      name: 'Sannya Wasim',
      photo: images?.onboarding1,
      cover: images?.palestine,
    },
    {
      name: 'Sannya Wasim',
      photo: images?.onboarding1,
      cover: images?.palestine,
    },
    {
      name: 'Sannya Wasim',
      photo: images?.onboarding1,
      cover: images?.palestine,
    },
    {
      name: 'Sannya Wasim',
      photo: images?.onboarding1,
      cover: images?.palestine,
    },
    {
      name: 'Sannya Wasim',
      photo: images?.onboarding1,
      cover: images?.palestine,
    },
  ];
  return (
    <View style={styles?.container}>
      <TouchableOpacity onPress={() => navigation?.navigate('SuggestedContent', {
        headerTitle : 'Suggested Users',
        data : data
      })}>
        <Text style={styles?.heading}>See all</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <View style={styles?.card}>
              <Image source={item?.cover} style={styles?.cover} />
              <Image source={item?.photo} style={styles?.photo} />
              <Text style={styles?.text}>{item?.name}</Text>
              <PrimaryButton width={width * 0.26} title="Follow" />
            </View>
          );
        }}
        style={styles?.list}
        horizontal
      />
    </View>
  );
};

export default SuggestedUsers;

const styles = StyleSheet.create({
  container: {},
  card: {
    margin: width * 0.01,
    alignItems: 'items-start',
    justifyContent: 'justify-between',
    backgroundColor: colors?.white,
    borderRadius: width * 0.02,
    padding: width * 0.02,
  },
  cover: {
    height: height * 0.06,
    width: width * 0.38,
    alignSelf: 'center',
    borderTopLeftRadius: width * 0.02,
    borderTopRightRadius: width * 0.02,
  },
  photo: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.16,
    borderWidth: width * 0.006,
    borderColor: colors?.white,
    shadowColor: colors?.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    // position : 'absolute',
    // zIndex : 100,
    marginTop: -height * 0.02,
    alignSelf: 'center',
  },
  text: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.04,
    color: colors?.text,
    alignSelf: 'center',
    marginVertical: height * 0.01,
  },
  list: {
    // marginVertical: height * 0.01,
  },
  heading : {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.04,
    color: colors?.text,
    alignSelf: 'flex-end',
    marginVertical: height * 0.01,
    marginRight : width * 0.02
  }
});
