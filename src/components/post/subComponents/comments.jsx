import { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../assets/images';
import {
  ActiveLike,
  FileMicIcon,
  GradientMessageSendIcon,
  InactiveComment,
} from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const Comments = ({post}) => {
  const [showAll, setShowAll] = useState(false);
  const [text, setText] = useState('')
  return (
    <View style={styles?.container}>
      <TouchableOpacity onPress={() => setShowAll(!showAll)}>
        <Text style={styles?.showAllText}>
          {showAll
            ? `Show less`
            : `View all ${post?.comments?.length} comments`}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={showAll ? post?.comments : post?.comments?.slice(0, 1)}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={styles?.commentBox}>
              <View style={styles?.header}>
                <LinearGradient
                  colors={[colors?.RGB1, colors?.RGB2]}
                  style={styles?.gradientBorder}>
                  <Image source={item?.photo} style={styles?.image} />
                </LinearGradient>
                <View style={styles?.textContainer}>
                  <Text
                    style={
                      styles?.name
                    }>{`${item?.firstName} ${item?.lastName}`}</Text>
                  <Text style={styles?.time}>14 hours ago</Text>
                </View>
                <View style={styles?.iconContainer}>
                  <TouchableOpacity>
                    <ActiveLike />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <InactiveComment />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles?.commentText}>{item?.text}</Text>
            </View>
          );
        }}
      />
      {/* comment input */}
      <View style={styles?.inputContainer}>
        <Image source={images?.onboarding1} style={styles?.image} />
        <TextInput placeholder='Write your comment' placeholderTextColor={colors?.textGray} style={styles?.input}/>
        <View style={styles?.iconContainer}>
          <TouchableOpacity style={styles?.button}>
            <FileMicIcon width={width * 0.04} height={width * 0.04} />
          </TouchableOpacity>
          <TouchableOpacity style={styles?.button}>
            <GradientMessageSendIcon width={width * 0.04} height={width * 0.04}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  showAllText: {
    fontFamily: fonts?.montserratMedium,
    fontSize: width * 0.03,
    color: colors?.text,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentBox: {
    borderWidth: width * 0.002,
    borderColor: colors?.gray11,
    borderRadius: width * 0.02,
    padding: width * 0.02,
    marginVertical: height * 0.01,
  },
  gradientBorder: {
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: width * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.06,
    height: width * 0.06,
    borderRadius: width * 0.06,
  },
  textContainer: {
    flex: 0.65,
  },
  name: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.03,
    color: colors?.text,
  },
  time: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.02,
    color: colors?.textGray,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3,
  },
  commentText: {
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.03,
    color: colors?.text,
    marginLeft: width * 0.09,
    marginTop: height * 0.01,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: width * 0.002,
    borderColor: colors?.gray11,
    borderRadius: width * 0.06,
    padding: width * 0.01,
    marginVertical: height * 0.005,
  },
  input: {
    flex : 0.65,
    color : colors?.text
  },
  button : {
    padding : width * 0.01,
    marginHorizontal : width * 0.005
  }
});
