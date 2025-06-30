import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { RightArrow } from '../../../assets/images/svgs';
import AlertButton from '../../../components/buttons/AlertButton';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import InboxHeader from '../../../components/headers/chat/inbox';
import CustomSearchBar from '../../../components/inputs/search';
import { height, Pixels, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import { accountSettingsOptions, supportOptions, visibilityOptions } from './string';

const SettingsPrivacy = ({navigation}) => {
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

  const Header = ({title}) => {
    return <Text style={styles?.heading}>{title}</Text>;
  };
  return (
    <View style={styles?.container}>
      <InboxHeader
        title={'Settings and Privacy'}
        backPress={() => navigation?.goBack()}
      />
      <View style={styles?.search}>
        <CustomSearchBar />
      </View>
      <ScrollView contentContainerStyle={styles?.content}>
        <Header title="Account Settings" />
        {accountSettingsOptions?.map((item, index) => (
          <RenderItem item={item} index={index} />
        ))}
        <Header title="Who can see your content" />
        {visibilityOptions?.map((item, index) => (
          <RenderItem item={item} index={index} />
        ))}
        <Header title="More info and support" />
        {supportOptions?.map((item, index) => (
          <RenderItem item={item} index={index} />
        ))}
        <PrimaryButton title='Log out'/>
        <AlertButton title='Delete My Account'/>
      </ScrollView>
    </View>
  );
};

export default SettingsPrivacy;

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
    paddingBottom : height * 0.05
  },
  heading: {
    fontFamily: fonts?.montserratBold,
    fontSize: Pixels(11),
    color: colors?.text,
    marginBlock: height * 0.01,
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
