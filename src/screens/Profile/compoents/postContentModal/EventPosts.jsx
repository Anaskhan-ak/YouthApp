import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActiveLike
} from '../../../../assets/images/svgs';
import EmptyComponent from '../../../../components/empty';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';
import { Platform } from 'react-native';

const EventPosts = ({posts}) => {
    const navigation = useNavigation()
  return (
    <View style={styles?.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => {
          return(
            <TouchableOpacity onPress={() => navigation?.navigate('PostDetails', {post:item})}>
            <LinearGradient
              colors={[colors?.RGB3, colors?.RGB4]}
              style={styles?.event}>
              <Image source={item?.event?.thumbnail} style={styles?.thumbnail} />
              <View style={styles?.right}>
                <View style={styles?.header}>
                <Text
                  style={
                    styles?.name
                  }>{`${item?.user?.firstName} ${item?.user?.lastName}`}</Text>
                <View style={styles?.iconContainer}>
                  <TouchableOpacity style={styles?.icon}>
                    <ActiveLike />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles?.caption}>{item?.event?.caption}</Text>
              <Text style={styles?.location}>{item?.event?.location}</Text>
              {/* <Likes/> */}
              </View>
            </LinearGradient>
          </TouchableOpacity>
          )
        }}
        ListEmptyComponent={<EmptyComponent text='No events yet'/>}
      />
    </View>
  );
};

export default EventPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  event: {
    margin : width * 0.01,
    borderRadius : width * 0.01,
    padding : width * 0.02,
    flexDirection : 'row',
    alignItems : 'flex-start',
    justifyContent : 'flex-start',
  },
  thumbnail: {
    width : width * 0.35,
    height : height * 0.1,
    borderRadius : width * 0.01
  },
  right : {
    marginLeft : width * 0.02,
  },
  header: {
    width : width * 0.57,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between'
  },
  name: {
    fontFamily : fonts?.montserratBold,
    fontSize : width * 0.035,
    color : colors?.text
  },
  iconContainer: {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'flex-start',
    marginHorizontal : width * 0.01
  },
  icon: {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'flex-start',
    marginHorizontal : width * 0.01
  },
  caption: {
    fontFamily : fonts?.montserratExtraBold,
    fontSize : width * 0.04,
    color : colors?.text,
    marginTop : height * 0.003
  },
  location :{
fontFamily : fonts?.montserratSemiBold,
    fontSize : width * 0.04,
    color : colors?.text,
    marginTop : height * 0.003
  }
});
