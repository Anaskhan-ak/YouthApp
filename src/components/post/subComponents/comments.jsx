import moment from 'moment';
import { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../assets/images';
import {
  ActiveLike,
  GraySolidMicIcon,
  InactiveGrayCommentIcon,
  SolidMessageSendIcon
} from '../../../assets/images/svgs';
import { toast } from '../../../components/toast';
import { height, Pixels, width } from '../../../constant';
import { getDataLocally } from '../../../helper';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const Comments = ({post, actions, setActions}) => {
  const [showAll, setShowAll] = useState(false);
  const [text, setText] = useState('');

  const handleComment = async () => {
    const userDetails = await getDataLocally();
    try {
      const body = {
        userId: userDetails?.id,
        postId: post?.id,
        comment: text,
      };
      const response = await apiCall?.addComment(body);
      if (response) {
        console.log('Comment added successfully', response);
        setText('');
        setActions(prev => ({
          ...prev,
          comments: {
            ...prev?.comments,
            count: prev?.comments?.count + 1,
            value: [...prev?.comments?.value, response], 
          },
        }));

        actions?.comments?.ref?.current?.blur();
      }
    } catch (error) {
      console.log('Error adding comment', error);
      toast('error', 'Error adding comment');
    }
  };
  return (
    <View style={styles?.container}>
      <TouchableOpacity onPress={() => setShowAll(!showAll)}>
        <Text style={styles?.showAllText}>
          {showAll
            ? 'Show less'
            : actions?.comments?.value?.length === 0
            ? 'No comments yet'
            : `View all ${actions?.comments?.value?.length} comments`}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={
          showAll
            ? actions?.comments?.value
            : post?.comments?.value?.slice(0, 1)
        }
        renderItem={({item, index}) => {
          // console.log('Item', item);
          return (
            <View key={index} style={styles?.commentBox}>
              <View style={styles?.header}>
                <LinearGradient
                  colors={[colors?.RGB1, colors?.RGB2]}
                  style={styles?.gradientBorder}>
                  <Image
                    source={
                      item?.photo
                        ? {uri: item?.user?.photo}
                        : images?.defaultProfilePicture
                    }
                    style={styles?.image}
                  />
                </LinearGradient>
                <View style={styles?.textContainer}>
                  <Text
                    style={
                      styles?.name
                    }>{`${item?.user?.firstName} ${item?.user?.lastName}`}</Text>
                  <Text style={styles?.time}>
                    {moment(item?.createdAt).startOf('hour').fromNow()}
                  </Text>
                </View>
                <View style={styles?.iconContainer}>
                  <TouchableOpacity>
                    <ActiveLike />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <InactiveGrayCommentIcon />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles?.commentText}>{item?.content}</Text>
            </View>
          );
        }}
      />
      {/* comment input */}
      <View style={styles?.inputContainer}>
        <Image source={images?.onboarding1} style={styles?.image} />
        <TextInput
          ref={actions?.comments?.ref}
          placeholder="Write your comment"
          placeholderTextColor={colors?.text}
          style={styles?.input}
          value={text}
          onChangeText={setText}
        />
        <View style={styles?.iconContainer}>
          <TouchableOpacity style={styles?.button}>
            <GraySolidMicIcon width={width * 0.04} height={width * 0.04} />
          </TouchableOpacity>
          <TouchableOpacity style={styles?.button} onPress={handleComment}>
            <SolidMessageSendIcon
              width={width * 0.04}
              height={width * 0.04}
            />
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
    fontSize: Pixels(8),
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
    marginVertical: height * 0.005,
  },
  gradientBorder: {
    width: width * 0.06,
    height: width * 0.06,
    borderRadius: width * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: width * 0.07,
  },
  textContainer: {
    flex: 0.65,
  },
  name: {
    fontFamily: fonts?.montserratBold,
    fontSize: Pixels(10),
    color: colors?.text,
  },
  time: {
    fontFamily: fonts?.montserratMedium,
    fontSize: Pixels(9),
    color: colors?.textGray,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3,
    justifyContent : 'space-evenly',
    right : -width * 0.03
  },
  commentText: {
    fontFamily: fonts?.montserratMedium,
    fontSize: Pixels(11),
    color: colors?.text,
    marginLeft: width * 0.075,
    marginTop: height * 0.01,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: width * 0.002,
    borderColor: colors?.gray11,
    borderRadius: width * 0.065,
    paddingHorizontal: width * 0.01,
    marginVertical: height * 0.005,
  },
  input: {
    flex: 0.65,
    color: colors?.text,
  },
  button: {
    padding: width * 0.01,
    // marginHorizontal: width * 0.005,
  },
});
