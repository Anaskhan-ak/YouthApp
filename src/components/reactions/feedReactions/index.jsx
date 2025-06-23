import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import RNFS from 'react-native-fs';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../assets/images';
import {
  ActiveComment,
  ActiveDownload,
  ActiveLike,
  ActiveRepost,
  ActiveSave,
  ActiveShare,
  InactiveComment,
  InactiveDownload,
  InactiveLike,
  InactiveRepost,
  InactiveSave,
  InactiveShare,
  PinkGradientPlusButton,
} from '../../../assets/images/svgs';
import { toast } from '../../../components/toast';
import { getDataLocally } from '../../../helper';
import useUser from '../../../hooks/user';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';
import { albumIds } from '../../../utils/string';
import InviteModal from '../../modals/genderModal/inviteModal';
import { styles } from './styles';

const FeedReactions = ({post}) => {
  const user = useUser();
  const [reactions, setReactions] = useState([
    {
      type: 'like',
      id: '',
      text: post?.reactions?.length,
      active: post?.reactions?.some(r => r?.postId === post?.id),
      activeSvg: <ActiveLike />,
      inactiveSvg: <InactiveLike />,
    },
    {
      type: 'comment',
      text: post?.comments?.length,
      active: false,
      activeSvg: <ActiveComment />,
      inactiveSvg: <InactiveComment />,
    },
    {
      type: 'share',
      text: 0,
      active: false,
      activeSvg: <ActiveShare />,
      inactiveSvg: <InactiveShare />,
    },
    {
      type: 'repost',
      text: post?.shares?.length,
      active: false,
      activeSvg: <ActiveRepost />,
      inactiveSvg: <InactiveRepost />,
    },
    {
      type: 'save',
      text: 0,
      active: false,
      activeSvg: <ActiveSave />,
      inactiveSvg: <InactiveSave />,
    },
    {
      type: 'download',
      text: 'Download',
      active: false,
      activeSvg: <ActiveDownload />,
      inactiveSvg: <InactiveDownload />,
    },
  ]);

  const toggleReaction = index => {
    // console.log('Index', index);
    const updatedReactions = [...reactions];
    updatedReactions[index].active = !updatedReactions[index]?.active;
    setReactions(updatedReactions);
  };

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const response = await apiCall?.getSaved();
        if (response) {
          setReactions(prev =>
            prev.map(react => {
              if (react.type === 'save') {
                return {
                  ...react,
                  text: response?.some(obj => obj.postId === post?.id) ? 1 : 0,
                  active:
                    response?.some(obj => obj.postId === post?.id) || false,
                };
              }
              return react;
            }),
          );
        }
      } catch (error) {
        console.log('Error fetching saved posts', error);
      }
    };
    fetchSaved();
  }, []);

  const downloadFile = url => {
    // console.log("url", url)
    const filePath = RNFS.DocumentDirectoryPath + `/example.${url?.split('.')?.pop()}`;

    RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,
      background: true, // Enable downloading in the background (iOS only)
      discretionary: true, // Allow the OS to control the timing and speed (iOS only)
      progress: res => {
        // Handle download progress updates if needed
        const progress = (res.bytesWritten / res.contentLength) * 100;
        console.log(`Progress: ${progress.toFixed(2)}%`);
      },
    })
      .promise.then(response => {
        console.log('File downloaded!', response);
        setReactions(prev =>
          prev?.map(react => {
            if (react?.type === 'download') {
              return {
                ...react,
                active: true,
              };
            } else return react;
          }),
        );
      })
      .catch(err => {
        console.log('Download error:', err);
      });
  };

  const handlePress = async (icon, index) => {
    const userDetails = await getDataLocally();
    switch (icon?.type) {
      case 'like':
        try {
          const isLiked = icon?.active;
          const body = isLiked
            ? {id: icon.id, status: false}
            : {
                userId: userDetails?.id,
                type: 'LIKE',
                postId: post?.id,
                status: true,
              };

          const response = await apiCall?.likePost(body);
          setReactions(prev =>
            prev.map(i => {
              if (i.type !== 'like') return i;

              return {
                ...i,
                active: !isLiked,
                id: isLiked ? undefined : response.id,
                text: isLiked ? i.text - 1 : i.text + 1,
              };
            }),
          );
        } catch (error) {
          console.error('Like error:', error);
          toast('error', 'Error processing like');
        }
        break;
      case 'comment':
      // actions?.comments?.ref?.current?.focus();
      case 'save':
        const albumId = albumIds?.find(album => album?.type === post?.type)?.id;
        console.log('albumID', albumId);
        try {
          const body = {
            albumID: albumId,
            postId: post?.id,
          };
          const response = await apiCall?.savePost(body);
          if (response) {
            console.log('Successfully saved post', response);
          }
        } catch (error) {
          console.log('Error saving post', error);
          toast('error', 'Error saving post');
        }
      case 'share':
        toggleReaction(index)
      case 'download':
        downloadFile(post?.type === 'MOMMENTS' && post?.Momments?.url);
      default:
        break;
    }
  };

  useEffect(() => {
    if (user?.id) {
      setReactions(prev =>
        prev?.map(icon =>
          icon?.type === 'like'
            ? {
                ...icon,
                id: post?.reactions?.find(r => r?.userId === user?.id)?.id,
              }
            : icon,
        ),
      );
    }
  }, [user?.id]);

  const HeaderComponent = () => {
    return (
      <TouchableOpacity style={styles?.gradientProfileContainer}>
        <LinearGradient
          colors={[colors?.RGB1, colors?.RGB2]}
          style={styles?.gradientProfileIcon}>
          <Image
            style={styles?.gradientProfileImage}
            source={
              post?.user?.photo
                ? {uri: post?.user?.photo}
                : images?.defaultProfilePicture
            }
          />
          <View style={styles?.plusButton}>
            <PinkGradientPlusButton />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles?.container}>
      <FlatList
        data={reactions}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={styles?.content}>
              <TouchableOpacity
                style={styles?.button}
                onPress={() => handlePress(item, index)}>
                <View style={item?.active && styles?.buttonView}>
                  {item?.active ? item?.activeSvg : item?.inactiveSvg}
                </View>
              </TouchableOpacity>
              <Text
                style={[
                  styles?.buttonText,
                  {
                    color:
                      post?.type === 'MOMMENTS' ? colors?.white : colors?.text,
                  },
                ]}>
                {item?.type === 'download' && item?.active === true
                  ? 'Downloaded'
                  : item?.text}
              </Text>
            </View>
          );
        }}
        ListHeaderComponent={<HeaderComponent />}
      />
      {reactions.find(item => item?.type === 'share')?.active && (
        <InviteModal
          index={2}
          toggleReaction={toggleReaction}
          modal={reactions.find(item => item?.type === 'share')?.active}
        />
      )}
    </View>
  );
};

export default FeedReactions;
