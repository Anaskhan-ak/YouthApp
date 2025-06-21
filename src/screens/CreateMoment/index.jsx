import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, TouchableOpacity, View } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { WhiteBackArrow, WhiteSettingsIcon } from '../../assets/images/svgs';
import RecordButton from './components/RecordButton';
import { styles } from './styles';

const CreateMoment = () => {
  const [cameraOpen, setCameraOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const device = useCameraDevice('front');
  const animatedValue = useRef(new Animated.Value(0)).current;
  const cameraRef = useRef(null);

  const DURATION = 10 * 1000; // 10 seconds

  // Request permission on mount
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
    })();
  }, []);

  const handlePress = () => {
    isRecording ? stopRecording() : startRecording();
  };

  const startRecording = () => {
    setIsRecording(true);
    animatedValue.setValue(0);

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) stopRecording();
    });

    cameraRef.current.startRecording({
      onRecordingFinished: video => console.log(video),
      onRecordingError: error => console.error(error),
    });
  };

  const stopRecording = async () => {
    setIsRecording(false);
    animatedValue.stopAnimation();
    animatedValue.setValue(0);

    await cameraRef.current.stopRecording();
  };

  return (
    <View style={styles?.container}>
      {cameraOpen && (
        <View>
          {/* Headers */}
          <View style={styles?.heading}>
            <TouchableOpacity style={styles?.button}>
              <WhiteBackArrow />
            </TouchableOpacity>
            <TouchableOpacity style={styles?.button}>
              <WhiteSettingsIcon />
            </TouchableOpacity>
          </View>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            device={device}
            isActive={true}
            video={true}
            audio={true}
          />
          <RecordButton
            onPress={handlePress}
            animatedValue={animatedValue}
            isRecording={isRecording}
          />
        </View>
      )}
    </View>
  );
};

export default CreateMoment;
