import {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {ToggleCameraIcon, WhiteTick} from '../../../assets/images/svgs';
import {height, width} from '../../../constant';
import {colors} from '../../../utils/colors';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';

const CameraComponent = ({media, setMedia,setOptions}) => {
  const [cameraDevice, setCameraDevice] = useState('front');
  const [isRecording, setIsRecording] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const device = useCameraDevice(cameraDevice);
  const camera = useRef(null);
  const navigation = useNavigation();
  
useEffect(() => {
  const configurePermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    const microphonePermission = await Camera.requestMicrophonePermission();

    if (
      cameraPermission !== 'authorized' ||
      microphonePermission !== 'authorized'
    ) {
      console.warn('Camera or mic permission not granted');
    }
  };

  configurePermissions();
}, []);
  const takePhoto = async () => {
    const photo = await camera.current?.takePhoto();
    const result = `file://${photo?.path}`;
    setPhotoUri(result);
    setMedia(prev => [
      ...prev,
      {
        uri: result,
        type: 'image/jpeg',
        isSelected: true,
      },
    ]);
  };

  const takeVideo = () => {
    setIsRecording(true);
    camera.current?.startRecording({
      onRecordingFinished: video => {
        const result = `file://${video?.path}`;
        setVideoUri(result);
        setMedia(prev => [
          ...prev,
          {
            uri: result,
            type: 'video/mp4',
            isSelected: true,
          },
        ]);
        setIsRecording(false);
      },
      onRecordingError: error => {
        console.error(error);
        setIsRecording(false);
      },
    });
  };

  const stopVideo = async () => {
    await camera?.current?.stopRecording();
    setIsRecording(false);
  };

  const onConfirm = () => {
    setOptions(prev =>
    prev.map(option => ({
      ...option,
      active: option.type === 'gallery',
    }))
  );
  };

 const onRetake = () => {
  setPhotoUri(null);
  setVideoUri(null);
  setMedia(prev => prev.slice(0, -1)); // remove last item
};

  return (
    <View style={styles?.container}>
      {/* Toggle camera button only when not previewing */}
      {!photoUri && !videoUri && (
        <TouchableOpacity
          style={styles?.toggleCamera}
          onPress={() =>
            setCameraDevice(current => (current === 'front' ? 'back' : 'front'))
          }>
          <ToggleCameraIcon />
        </TouchableOpacity>
      )}

      {/* Camera Preview or Captured Media */}
      {photoUri ? (
        <Image
          source={{uri: photoUri}}
          style={styles.preview}
          resizeMode="cover"
        />
      ) : videoUri ? (
        <Video
          source={{uri: videoUri}}
          style={styles.preview}
          controls={true}
          resizeMode="cover"
          repeat={false}
        />
      ) : (
        device && (
          <Camera
            style={styles?.camera}
            device={device}
            isActive={true}
            photo={true}
            audio={true}
            video={true}
            ref={camera}
          />
        )
      )}

      {/* Capture/Record or Confirm/Retake Buttons */}
      {!photoUri && !videoUri ? (
        <TouchableOpacity
          onPress={takePhoto}
          onLongPress={takeVideo}
          onPressOut={stopVideo}
          style={[
            styles?.button,
            {backgroundColor: isRecording ? colors?.RGB1 : colors?.pink},
          ]}
        />
      ) : (
        <>
          <TouchableOpacity
            onPress={onConfirm}
            style={[styles.button, styles.selectBtn]}>
            <WhiteTick width={width * 0.08} height={height * 0.04} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onRetake} style={[styles.retakeButton]}>
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  camera: {
    borderRadius: width * 0.03,
    height: height,
    width: width,
  },
  preview: {
    borderRadius: width * 0.03,
    height: height,
    width: width,
  },
  button: {
    width: width * 0.15,
    height: width * 0.15,
    borderWidth: width * 0.01,
    borderColor: colors?.white,
    borderRadius: width * 0.15,
    position: 'absolute',
    zIndex: 10,
    bottom: height * 0.12,
  },
  toggleCamera: {
    position: 'absolute',
    zIndex: 10,
    top: height * 0.01,
    right: width * 0.04,
    alignSelf: 'flex-end',
  },
  selectBtn: {
    backgroundColor: colors?.pink,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: height * 0.12,
  },
  retakeButton: {
    position: 'absolute',
    bottom: height * 0.05,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: colors?.white,
    borderRadius: 20,
    top: height * 0.01,
    right: width * 0.04,
    alignSelf: 'flex-end',
    height: height * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retakeText: {
    color: colors?.black,
    fontWeight: 'bold',
  },
});
