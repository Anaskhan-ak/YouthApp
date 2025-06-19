import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { toast } from '../../../components/toast';
import { height, width } from '../../../constant';
import { getDataLocally } from '../../../helper';
import useUser from '../../../hooks/user';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';

const Stories = ({media, setMedia}) => {
  const [stories, setStories] = useState([]);
  const user = useUser();
  useEffect(() => {
    const getStories = async () => {
      const userDetails = await getDataLocally();
      const body = {
        userId: userDetails?.id,
        page: 1,
        pageSize: 10,
      };
      try {
        const response = await apiCall?.getStories(body);
        if (response) {
          console.log('Successfully fetched stories', response);
          setStories(
            response?.find(user => user?.userid === userDetails?.id)?.stories,
          );
        }
      } catch (error) {
        console.log('Error fetching stories', error);
        toast('error', 'Error fetching stories');
      }
    };
    getStories();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={index === 0 && styles?.button}
        onPress={() => {
          
            setMedia({
              uri: item?.source?.uri,
              name: `${item?.node?.id}.${item?.node?.type?.split('/')?.pop()}`,
              type: item?.stories?.mediaType,
            });
        }}
      >
        <>
          <View
            style={[
              styles.selectToggle,
              //   media?.uri === item?.node?.image?.uri && {
              //     backgroundColor: colors?.RGB1,
              //   },
            ]}
          />
          <Image source={{uri: item?.source?.uri}} style={styles?.image} />
        </>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={stories}
        renderItem={renderItem}
        style={styles?.list}
        contentContainerStyle={styles?.listContent}
        numColumns={3}
      />
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  list: {
    padding: width * 0.03,
  },
  image: {
    width: width * 0.3,
    height: height * 0.18,
    borderRadius: width * 0.01,
    margin: width * 0.01,
  },
  selectToggle: {
    width: width * 0.03,
    height: width * 0.03,
    borderRadius: width * 0.03,
    position: 'absolute',
    zIndex: 10,
    top: width * 0.02,
    right: width * 0.02,
    backgroundColor: colors?.white,
  },
});
