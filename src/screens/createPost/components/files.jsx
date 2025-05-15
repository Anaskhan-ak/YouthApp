import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import EmptyComponent from '../../../components/empty';
import { width } from '../../../constant';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const FilesComponent = ({media, setMedia}) => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const fetchDocuments = async () => {
      const result = await apiCall?.getAllDocuments({
        userId: 'cm60ql39f003l91r8l18bd80z',
        type: 'DOCUMENT',
      });
      // console.log("Result", result)
      setDocuments(result?.map(doc => ({
        thumbnail : doc?.documents?.thumbnail,
        name : doc?.documents?.caption,
        type : doc?.documents?.url?.split('.')?.pop().toUpperCase(),
        document : doc?.documents?.url
      })));
    };
    fetchDocuments();
  }, []);

  const renderItem = ({item}) => {
    // console.log('Item', item);
    return (
      <TouchableOpacity
        onPress={() => {
          setMedia(prev => [
            ...prev,
            {
              uri: item?.document,
              type: item?.type?.toLowerCase(),
              name: item?.name,
              thumbnail: item?.thumbnail,
            },
          ]);
        }}
        style={styles?.itemContainer}>
        <View style={styles?.itemRightContent}>
          <Image
            source={
              item?.thumbnail
                ? {uri: item?.thumbnail}
                : require('../../../assets/images/SignupImage.jpeg')
            }
            style={styles?.itemThumbnail}
          />
          <View style={styles?.itemContent}>
            <Text style={styles?.title}>{item?.name}</Text>
            <Text style={styles?.caption}>
              {item?.type}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      {documents?.length > 0 ? (
        <FlatList
          data={documents}
          renderItem={renderItem}
          ListEmptyComponent={<EmptyComponent text="No documents to show" />}
        />
      ) : (
        <View style={styles?.loader}>
          <ActivityIndicator size={'small'} color={colors?.RGB1} />
        </View>
      )}
    </>
  );
};

export default FilesComponent;

const styles = StyleSheet.create({
  list: {},
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width * 0.03,
    borderTopWidth: width * 0.001,
    borderBottomWidth: width * 0.001,
    borderColor: colors?.gray,
  },
  itemRightContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemThumbnail: {
    width: width * 0.17,
    height: width * 0.17,
    borderRadius: width * 0.03,
  },
  itemContent: {
    marginLeft: width * 0.02,
  },
  title: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.04,
    color: colors?.text,
  },
  caption: {
    fontFamily: fonts?.montserratSemiBold,
    fontSize: width * 0.03,
    color: colors?.textGray,
  },
  playButton: {
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
