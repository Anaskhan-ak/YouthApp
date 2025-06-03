import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import InboxHeader from '../../components/headers/chat/inbox';
import { height, width } from '../../constant';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

const SuggestedContent = ({route}) => {
  const {headerTitle, data} = route?.params;
  const navigation = useNavigation()
  return (
    <View style={styles?.container}>
      <InboxHeader title={headerTitle} backPress={() => navigation?.goBack()}/>
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
        numColumns={2}
      />
    </View>
  );
};

export default SuggestedContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    list : {
        alignSelf : "center",
        marginVertical : height * 0.02
    }
});
