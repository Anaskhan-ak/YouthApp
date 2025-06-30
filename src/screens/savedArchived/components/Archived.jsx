import { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import InboxHeader from '../../../components/headers/chat/inbox';
import { toast } from '../../../components/toast';
import { height, Pixels, width } from '../../../constant';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const Archived = ({navigation}) => {
  const [saved, setSaved] = useState([]);
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const response = await apiCall?.getSaved();
        if (response) {
          //   console.log('Successfully fetched saved posts', response);
          setSaved(response);
        }
      } catch (error) {
        console.log('Error fetching saved', error);
        toast('error', 'Error fetching saved posts');
      }
    };

    const fetchAlbums = async () => {
      try {
        const response = await apiCall?.getAlbums();
        if (response) {
          // console.log("Successfully fetched albums", response)
          setAlbums(response);
        }
      } catch (error) {
        console.log('Error fetching albums', response);
        toast('error', 'Error fetching albums');
      }
    };
    fetchSaved();
    fetchAlbums();
  }, []);

  const RenderItem = ({item, index}) => {
    const images = saved
      ?.filter(s => s?.albumID === item?.id)
      ?.slice(0, 4)
      ?.map(s => s?.post?.media?.url[0])
      ?.filter(Boolean); // remove null/undefined


    return (
      <View style={styles?.gridView}>
        <TouchableOpacity key={index} style={styles?.grid}>
          {images.map((img, i) => {
            return img ? (
              <Image
                key={i}
                source={{uri: img}}
                style={styles?.image}
                resizeMode="cover"
              />
            ) : (
              <View
                key={i}
                style={[styles?.image, {backgroundColor: colors?.gray}]}
              />
            );
          })}
          {images?.length === 0 &&
            [1, 2, 3, 4]?.map((obj, index) => {
              return (
                <View
                  key={index}
                  style={[styles?.image, {backgroundColor: colors?.gray}]}
                />
              );
            })}
        </TouchableOpacity>
        <Text style={styles?.title}>{item?.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles?.container}>
      <InboxHeader title="Archived" backPress={() => navigation?.goBack()} />
      <FlatList
        data={albums}
        renderItem={({item, index}) => <RenderItem item={item} index={index} />}
        numColumns={2}
      />
    </View>
  );
};

export default Archived;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
  },
  gridView: {
    margin: width * 0.02,
    alignItems: 'flex-start',
    padding: width * 0.02,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: width * 0.4,
  },
  image: {
    width: (width * 0.4 - 6) / 2, // 2 images per row with spacing
    height: height * 0.1,
    borderRadius: width * 0.02,
    margin: width * 0.003,
  },
  title: {
    fontFamily: fonts?.montserratBold,
    fontSize: Pixels(18),
    marginVertical: height * 0.01,
  },
});
