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
  ActiveLike,
  GradientDownloadIcon,
  InactiveDownload,
} from '../../../../assets/images/svgs';
import GradientText from '../../../../components/text/GradientText';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';

const FilePosts = ({posts}) => {
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
              style={styles?.file}>
              <Image source={{uri : item?.documents?.thumbnail}} style={styles?.thumbnail} />
              <View style={styles?.right}>
                <View style={styles?.header}>
                <Text
                  style={
                    styles?.name
                  }>{`${item?.user?.firstName} ${item?.user?.lastName}`}</Text>
                <View style={styles?.iconContainer}>
                  <View style={styles?.icon}>
                    <GradientDownloadIcon />
                    <GradientText style={styles?.gradientText}>375K</GradientText>
                  </View>
                  <TouchableOpacity style={styles?.icon}>
                    <ActiveLike />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles?.caption}>{item?.documents?.caption}</Text>
              <Text style={styles?.fileType}>{item?.documents?.url?.split('.')?.pop()?.toUpperCase()}</Text>
              <TouchableOpacity style={styles?.downloadIcon}>
                <InactiveDownload />
              </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          )
        }}
      />
    </View>
  );
};

export default FilePosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  file: {
    margin : width * 0.01,
    borderRadius : width * 0.01,
    padding : width * 0.02,
    flexDirection : 'row',
    alignItems : 'flex-start',
    justifyContent : 'flex-start'
  },
  thumbnail: {
    width : width * 0.2,
    height : height * 0.1,
    borderRadius : width * 0.01
  },
  right : {
    marginLeft : width * 0.02,
  },
  header: {
    width : width * 0.72,
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
  gradientText: {
    fontFamily : fonts?.montserratBold,
    fontSize : width * 0.03,
    marginLeft : width * 0.01
  },
  caption: {
    fontFamily : fonts?.montserratRegular,
    fontSize : width * 0.04,
    color : colors?.text,
    marginTop : height * 0.003
  },
  fileType: {},
  downloadIcon: {
    alignSelf : "flex-end"
  },
});
