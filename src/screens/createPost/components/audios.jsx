import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SoundPlayer from 'react-native-sound-player';
import { PauseIcon, PlayIcon } from '../../../assets/images/svgs';
import EmptyComponent from '../../../components/empty';
import { height, width } from '../../../constant';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const AudioComponent = ({media, setMedia}) => {
  const [yudios, setYudios] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchYudios = async () => {
      setLoading(true);
      try {
        const result = await apiCall?.getAllYudios({
          userId: 'cm60ql39f003l91r8l18bd80z',
          page: 1,
          pageSize: 6,
        });
        if (result) {
          setLoading(false);
        }
        setYudios(
          result?.map(yudio => ({
            id: yudio?.yudios?.id,
            thumbnail: yudio?.yudios?.thumbnail,
            title: yudio?.yudios?.title,
            caption: yudio?.yudios?.caption,
            url: yudio?.yudios?.url,
            type: 'audio/wav',
            isPlaying: false,
          })),
        );
      } catch (error) {
        console.log('Error fetching yudios', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchYudios();
  }, []);

  useEffect(() => {
    const onFinished = () => {
      setYudios(prev =>
        prev.map(yudio => ({
          ...yudio,
          isPlaying: false, // reset play state
        })),
      );
    };

    const finishedSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      onFinished,
    );

    return () => {
      finishedSubscription.remove();
    };
  }, []);

  const playPause = item => {
    const isCurrentlyPlaying = item?.isPlaying;

    // Pause if already playing
    if (isCurrentlyPlaying) {
      SoundPlayer.pause();
      setYudios(prev =>
        prev.map(yudio =>
          yudio.id === item.id ? {...yudio, isPlaying: false} : yudio,
        ),
      );
    } else {
      try {
        SoundPlayer.loadUrl(item?.url);
        SoundPlayer.play();

        setYudios(prev =>
          prev.map(yudio =>
            yudio.id === item.id
              ? {...yudio, isPlaying: true}
              : {...yudio, isPlaying: false},
          ),
        );
      } catch (e) {
        console.warn('Failed to play audio:', e);
      }
    }
  };

  const renderItem = ({item}) => {
    // console.log('Item', item);
    return (
      <TouchableOpacity
        onPress={() => {
          setMedia(prev => [
            ...prev,
            {
              uri: item?.url,
              type: item?.type,
              description: item?.caption,
              title: item?.title,
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
            <Text style={styles?.title}>{item?.title}</Text>
            <Text style={styles?.caption}>
              {item?.caption?.length > 20
                ? `${item?.caption?.slice(0, 20)}...`
                : item?.caption}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => playPause(item)}>
          <LinearGradient
            colors={[colors?.RGB1, colors?.RGB2]}
            style={styles?.playButton}>
            {item?.isPlaying ? (
              <PauseIcon width={width * 0.04} height={width * 0.04} />
            ) : (
              <PlayIcon width={width * 0.04} height={width * 0.04} />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const HeaderComponent = () => {
    return (
      <View style={styles?.header}>
        <Text style={styles?.headerText}>Recently Uploaded</Text>
        <TouchableOpacity>
          <Text style={styles?.headerText}>View all</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {loading ? (
        <View style={styles?.loader}>
          <ActivityIndicator size={'small'} color={colors?.RGB1} />
        </View>
      ) : (
        <FlatList
          data={yudios}
          renderItem={renderItem}
          ListEmptyComponent={<EmptyComponent text="No yudios to show" />}
          ListHeaderComponent={<HeaderComponent />}
        />
      )}
    </>
  );
};

export default AudioComponent;

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
    width: width * 0.15,
    height: width * 0.15,
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
    justifyContent: 'flex-start',
    marginVertical : height * 0.15
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width * 0.02,
  },
  headerText: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.04,
  },
});
