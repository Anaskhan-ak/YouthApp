import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../../../assets/images';
import {
  OutlineBlockIcon,
  OutlineCloudDOwnloadIcon,
  OutlineFollowIcon,
  OutlineHeartbreakIcon,
  OutlineHeartIcon,
} from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const PostModal = () => {
  const user = {
    name: 'Sannya Wasim',
    photo: images?.onboarding1,
  };
  const actions = [
    {
      type: 'follow',
      title: `Follow ${user?.name}`,
      icon: <OutlineFollowIcon />,
    },
    {
      type: 'block',
      title: `Block ${user?.name}`,
      icon: <OutlineBlockIcon />,
    },
    {
      type: 'love',
      title: 'Love it, show me more',
      icon: <OutlineHeartIcon />,
    },
    {
      type: 'limit',
      title: "Don't show me similar content",
      icon: <OutlineHeartbreakIcon />,
    },
    {
      type: 'download',
      title: 'Download Media',
      icon: <OutlineCloudDOwnloadIcon />,
    },
  ];
  return (
    <View style={styles?.container}>
      {actions?.map((action, index) => {
        return (
          <TouchableOpacity
            style={[
              styles?.button,
              (index === 0) && {
                borderTopLeftRadius: width * 0.03,
                borderTopRightRadius: width * 0.03,
              },
              index === actions?.length - 1 && {
                borderBottomLeftRadius: width * 0.03,
                borderBottomRightRadius: width * 0.03,
              }
            ]}>
            <Text style={styles?.text}>{action?.title}</Text>
            {action?.icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default PostModal;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  button : {
    margin : height * 0.001,
    padding : width * 0.03,
    backgroundColor : `${colors?.white}CC`,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    width  : width * 0.87,
  },
  text : {
    fontFamily : fonts?.montserratMedium,
    fontSize : width * 0.038,
    color : colors?.gray13
  }
});
