import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { RightArrow } from '../../../assets/images/svgs';
import InboxHeader from '../../../components/headers/chat/inbox';
import CustomSearchBar from '../../../components/inputs/search';
import GradientText from '../../../components/text/GradientText';
import { height, Pixels, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import {
    activityOptions
} from './string';

const Activity = ({navigation}) => {
  const RenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => navigation?.navigation(item?.route)}
        style={styles?.button}>
        <Text style={styles?.text}>{item?.title}</Text>
        <RightArrow />
      </TouchableOpacity>
    );
  };

  const Header = () => {
    return (
      <GradientText style={styles?.heading}>
        Review and manage your Photos, Videos, Yudios, Events and your account
        activity on one place{' '}
      </GradientText>
    );
  };
  return (
    <View style={styles?.container}>
      <InboxHeader
        title={'Your Activity'}
        backPress={() => navigation?.goBack()}
      />
      <View style={styles?.search}>
        <CustomSearchBar />
      </View>
      <ScrollView contentContainerStyle={styles?.content}>
        <Header title="Account Settings" />
        {activityOptions?.map((item, index) => (
          <RenderItem item={item} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
  },
  search: {
    marginHorizontal: width * 0.04,
  },
  content: {
    paddingHorizontal: width * 0.06,
    paddingBottom: height * 0.05,
  },
  heading: {
    fontFamily: fonts?.montserratSemiBold,
    fontSize: Pixels(12),
    color: colors?.text,
    marginBlock: height * 0.01,
    textAlign : 'center'
  },
  button: {
    backgroundColor: colors?.greyBackground,
    borderRadius: width * 0.03,
    padding: width * 0.03,
    marginVertical: height * 0.003,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fonts?.montserratSemiBold,
    fontSize: Pixels(14),
    color: colors?.text,
  },
});
