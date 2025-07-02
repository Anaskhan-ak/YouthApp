import { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { ToggleCameraIcon } from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';

const CameraComponent = ({media, setMedia}) => {
  const [cameraDevice, setCameraDevice] = useState('front');
  const [isRecording, setIsRecording] = useState(false);
  const device = useCameraDevice(cameraDevice);
  const camera = useRef(null);

  const takePhoto = async () => {
    const photo = await camera.current?.takePhoto();
    const result = `file://${photo?.path}`;
    setMedia(prev => [
      ...prev,
      {
        uri: `file://${photo?.path}`,
        type: 'image/jpeg',
        isSelected: true,
      },
    ]);
  };

  const takeVideo = () => {
    setIsRecording(true);
    camera.current?.startRecording({
      onRecordingFinished: video => {
        setMedia(prev => [
          ...prev,
          {
            uri: `file://${video?.path}`,
            type: 'video/mp4',
            isSelected: true,
          },
        ]);
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
  return (
    <View style={styles?.container}>
      <TouchableOpacity
        style={styles?.toggleCamera}
        onPress={() =>
          setCameraDevice(current => (current === 'front' ? 'back' : 'front'))
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
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.008,
    overflow : "hidden",
    alignItems : 'center',
    justifyContent : 'center'
  },
  camera: {
    borderRadius: width * 0.03,
    height: height * 0.32,
    width: width * 0.95,
  },
  button: {
    width: width * 0.15,
    height: width * 0.15,
    borderWidth: width * 0.01,
    borderColor: colors?.white,
    borderRadius: width * 0.15,
    position: 'absolute',
    zIndex: 10,
    bottom: height * 0.01,
  },
  toggleCamera: {
    position: 'absolute',
    zIndex: 10,
    top: height * 0.01,
    left: width * 0.04,
  },
});
