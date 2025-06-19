import { useRef, useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { HorizontalDots } from '../../assets/images/svgs';
import { height } from '../../constant';
import { styles } from './styles';
import Comments from './subComponents/comments';
import DocumentPost from './subComponents/documentPost';
import EventPost from './subComponents/eventPost';
import Likes from './subComponents/likes';
import MediaPost from './subComponents/mediaPost';
import PostModal from './subComponents/Modal';
import MomentPost from './subComponents/MomentPost';
import MusicPost from './subComponents/MusicPost';
import UserPostHeader from './subComponents/userPostHeader';
import YudioPost from './subComponents/YudioPost';

const Post = ({post, isScrolling}) => {
  const [modal, setModal] = useState({
    isPost: false,
    visible: false,
  });
  const [actions, setActions] = useState({
    likes: {
      value: post?.reactions,
      count: post?.reactions?.length,
    },
    comments: {
      ref: useRef(null),
      value: post?.comments,
      count: post?.comments?.length,
    },
  });
  const renderPostContent = (post, modalProps) => {
    const postComponents = {
      MEDIA: MediaPost,
      MUSIC: MusicPost,
      YUDIO: YudioPost,
      EVENT: EventPost,
      DOCUMENT: DocumentPost,
      MOMMENTS: MomentPost,
    };

    const PostComponent = postComponents[post.type];
    return (
      <PostComponent
        post={post}
        modal={modalProps}
        actions={actions}
        setActions={setActions}
        isScrolling={isScrolling}
      />
    );
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
      {post?.reactions && (
        <View style={styles?.likes}>
          <Likes post={post} actions={actions} />
        </View>
      )}
      {post?.caption && (
        <View style={styles?.caption}>
          <Text style={styles?.captionText}>{post?.caption}</Text>
        </View>
      )}
      <View style={styles?.comments}>
        <Comments post={post} actions={actions} setActions={setActions} />
      </View>
      {(modal?.visible || modal?.isPost) && (
        <Modal animationType="slide" transparent statusBarTranslucent>
          <TouchableWithoutFeedback
            style={{
              backgroundColor: 'red',
            }}
            onPress={() =>
              setModal({
                isPost: false,
                visible: false,
              })
            }>
            <View
              style={[
                styles?.modalBg,
                {
                  justifyContent: modal?.isPost && 'center',
                  alignItems: modal?.visible && 'flex-start',
                },
              ]}>
              {modal?.isPost && (
                <View style={styles?.content}>
                  {renderPostContent(post, {modal, setModal})}
                </View>
              )}
              {/* <BlurView
                style={StyleSheet?.absoluteFill}
                blurType="dark"
                blurAmount={1}
              /> */}
              <View
                style={[
                  styles?.modal,
                  {marginVertical: modal?.visible && height * 0.2,
                    alignSelf :  modal?.isPost && 'flex-start'
                  },
                ]}>
                <PostModal post={post} modal={modal} setModal={setModal} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

export default Post;
