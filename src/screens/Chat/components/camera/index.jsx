import { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { ToggleCameraIcon, WhiteTick } from '../../../../assets/images/svgs';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { styles } from './styles';

const CameraComponent = ({media, setMedia}) => {
  const [cameraDevice, setCameraDevice] = useState('front');
  const [isRecording, setIsRecording] = useState(false);
  const [photo, setPhoto] = useState({});
  const [video, setVideo] = useState({});
  const device = useCameraDevice(cameraDevice);
  const camera = useRef(null);
  const videoRef = useRef(null);

  const takePhoto = async () => {
    const photo = await camera.current?.takePhoto();
    setPhoto({
      uri: `file://${photo?.path}`,
      type: 'image/jpeg',
      name: 'image.jpeg',
    });
  };

  const takeVideo = () => {
    setIsRecording(true);
    camera.current?.startRecording({
      onRecordingFinished: video => {
        setVideo({
          uri: `file://${video?.path}`,
          type: 'video/mp4',
        });
        console.log(video.path);
        setIsRecording(false);
      },
      onRecordingError: error => console.error(error),
    });
  };

  const stopVideo = async () => {
    await camera.current?.stopRecording();
    setIsRecording(false);
  };

  const confirmMedia = () => {
    if (photo?.uri !== null) {
      setMedia(photo);
    }
    if (video?.uri !== null) {
      setMedia(video)
    }
  };
  return (
    <View style={styles?.container}>
      {photo?.uri || video?.uri ? (
        <View
          style={[
            styles?.cameraContainer,
            video?.uri !== null && {
              height: height * 0.32,
              width: width * 0.95,
            },
          ]}>
          {photo?.uri && (
            <Image source={{uri: photo?.uri}} style={styles?.camera} />
          )}
          {video?.uri && (
            <VideoPlayer
              key={video?.uri}
              autoplay
              repeat
              ref={videoRef}
              source={{uri: video?.uri}}
              onError={e => console.log(e)}
              style={[styles?.camera, {backgroundColor: colors?.black}]}
              disableFullscreen
              hideControlsOnStart
            />
          )}
          <TouchableOpacity
            onPress={confirmMedia}
            style={[styles?.button, {backgroundColor: colors?.RGB1}]}>
            <WhiteTick />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles?.cameraContainer}>
          <TouchableOpacity
            style={styles?.toggleCamera}
            onPress={() =>
              setCameraDevice(current =>
                current === 'front' ? 'back' : 'front',
              )
            }>
            <ToggleCameraIcon />
          </TouchableOpacity>
          {device && (
            <Camera
              style={styles?.camera}
              device={device}
              isActive={true}
              photo={true}
              audio={true}
              video={true}
              ref={camera}
            />
          )}
          <TouchableOpacity
            onPress={takePhoto}
            style={[
              styles?.button,
              {backgroundColor: isRecording ? colors?.RGB1 : colors?.pink},
            ]}
            onLongPress={takeVideo}
            onPressOut={stopVideo}
          />
        </View>
      )}
    </View>
  );
};

export default CameraComponent;
