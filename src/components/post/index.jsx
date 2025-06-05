import { useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { HorizontalDots } from '../../assets/images/svgs';
import { styles } from './styles';
import Comments from './subComponents/comments';
import DocumentPost from './subComponents/documentPost';
import EventPost from './subComponents/eventPost';
import Likes from './subComponents/likes';
import MediaPost from './subComponents/mediaPost';
import PostModal from './subComponents/Modal';
import MusicPost from './subComponents/MusicPost';
import UserPostHeader from './subComponents/userPostHeader';
import YudioPost from './subComponents/YudioPost';

const Post = ({post}) => {
  const [modal, setModal] = useState({
    isPost: false,
    visible: false,
  });
  const renderPostContent = (post, modalProps) => {
    switch (post?.type) {
      case 'MEDIA':
        return <MediaPost post={post} modal={modalProps} />;
      case 'EVENT':
        return <EventPost post={post} modal={modalProps} />;
      case 'YUDIO':
        return <YudioPost post={post} modal={modalProps} />;
      case 'MUSIC':
        return <MusicPost post={post} modal={modalProps} />;
      case 'DOCUMENT':
        return <DocumentPost post={post} modal={modalProps} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles?.container}>
      <View style={styles?.header}>
        <UserPostHeader user={post?.user} post={post} />
        <TouchableOpacity
          style={styles?.dots}
          onPress={() => setModal(prev => ({...prev, visible: true}))}>
          <HorizontalDots />
        </TouchableOpacity>
      </View>

      <View style={styles?.content}>
        {renderPostContent(post, {modal, setModal})}
      </View>
      <View style={styles?.likes}>
        <Likes post={post} />
      </View>
      <View style={styles?.comments}>
        <Comments post={post} />
      </View>
      {(modal?.visible || modal?.isPost) && (
        <Modal animationType="slide" transparent statusBarTranslucent>
          <TouchableWithoutFeedback
            onPress={() =>
              setModal({
                isPost: false,
                visible: false,
              })
            }>
            <View style={styles?.modalBg}>
              {modal?.isPost && (
                <View style={styles?.content}>
                  {renderPostContent(post, {modal, setModal})}
                </View>
              )}
              <View style={styles?.modal}>
                <PostModal />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

export default Post;
