import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';
import { InactiveLike, Plus } from '../../../assets/images/svgs';
import GradientText from '../../../components/text/GradientText';
import { toast } from '../../../components/toast';
import { height, Pixels, width } from '../../../constant';
import { getDataLocally } from '../../../helper';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import UserPostHeader from './userPostHeader';

const SuggestedMoments = () => {
  const [loading, setLoading] = useState(false);
  const [moments, setMoments] = useState([]);
  const navigation = useNavigation()
  useEffect(() => {
    const fetchMoments = async () => {
      setLoading(true);
      const userDetails = await getDataLocally();
      if (!userDetails) {
        toast('error', 'User not found. Please login again');
        setLoading(false);
        return;
      }

      const data = {
        userId: userDetails.id,
        page: 1,
        pageSize: 5,
      };

      try {
        const result = await apiCall?.getAllMoments(data);
        // console.log('moments fetched successfully', result);
        setMoments(result || []);
      } catch (error) {
        console.log('Error fetching all moments', error);
        toast('error', 'Error fetching moments');
        setMoments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMoments();
  }, []);

  const RenderItem = ({item, index}) => {
    return (
      <View key={index} style={styles?.content}>
        <Video source={{uri: item?.Momments?.url}} style={styles?.video} />
        {/* header */}
        <View style={styles?.overlay}>
          <View style={styles?.userHeader}>
            <UserPostHeader user={item?.user} post={item} />
          </View>
          <View style={styles?.bottom}>
            <Text style={styles?.caption}>
              {item?.Momments?.caption?.length > 20
                ? `${item?.Momments?.caption?.slice(0, 20)}...`
                : item?.Momments?.caption}
            </Text>
            <View style={styles?.buttons}>
              <TouchableOpacity style={styles?.button}>
                <InactiveLike />
              </TouchableOpacity>
              <TouchableOpacity style={[styles?.button,{backgroundColor : colors?.pink}]}>
                <Plus width={20} height={20}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles?.container}>
      <View style={styles?.header}>
        <Text style={[styles?.heading, {color: colors?.text}]}>
          Moments tailored for you
        </Text>
        <TouchableOpacity onPress={()=>{
            navigation?.navigate('SuggestedContent',{
                headerTitle : 'Suggested Moments',
                data : moments,
                type : 'moments'
            })
        }}>
            <GradientText style={styles?.heading}>See all</GradientText>
        </TouchableOpacity>
      </View>
      <FlatList
        data={moments}
        renderItem={({item, index}) => <RenderItem item={item} index={index} />}
        horizontal
      />
    </View>
  );
};

export default SuggestedMoments;

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: width * 0.02,
  },
  heading: {
    fontFamily: fonts?.montserratExtraBold,
    fontSize: Pixels(14),
    letterSpacing: Pixels(0.25),
    lineHeight: Pixels(25),
  },
  content: {
    margin: width * 0.02,
    backgroundColor: 'yellow',
    
  },
  video: {
    width: width * 0.5,
    height: height * 0.3,
    borderRadius: width * 0.02,
    backgroundColor: 'black',
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    zIndex: 10,
    top: height * 0.01,
     width: width * 0.48,
    height: height * 0.27,
    // alignItems : 'space-between',
    justifyContent : 'space-between',
    alignSelf: 'center',
    
  },
  userHeader: {
    transform: [{scale: 0.8}],
    marginLeft : -width * 0.04
  },
  bottom : {
    flexDirection : "row",
    alignItems : "center",
    justifyContent : 'space-between',
    marginHorizontal : width * 0.02,
    // backgroundColor : 'yellow'
  },
  caption : {
    // alignSelf : 'baseline'
    textAlignVertical : 'bottom',
    color : colors?.white,
    fontFamily : fonts?.montserratMedium,
    fontSize : Pixels(11)
    // backgroundColor : 'red'
  },
  buttons:{
    // backgroundColor : 'red'
  },
  button : {
    width : width * 0.08,
    height : width * 0.08,
    borderRadius : width * 0.08,
    alignItems : 'center',
    justifyContent : "center",
    backgroundColor : colors?.gray,
    marginVertical : height * 0.01
  }
});
