import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { WhiteBackArrow, WhiteSettingsIcon } from '../../assets/images/svgs';
import { colors } from '../../utils/colors';
import MomentDetails from './components/MomentDetails';
import RecordButton from './components/RecordButton';
import { styles } from './styles';

const CreateMoment = () => {
  const [cameraOpen, setCameraOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState('');
  const device = useCameraDevice('front');
  const animatedValue = useRef(new Animated.Value(0)).current;
  const cameraRef = useRef(null);
  const navigation = useNavigation()

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
      onRecordingFinished: video => {
        console.log(video);
        setVideo(video);
        setCameraOpen(false);
      },
      onRecordingError: error => console.error(error),
    });
  };

  const stopRecording = async () => {
    setIsRecording(false);
    animatedValue.stopAnimation();
    animatedValue.setValue(0);

    await cameraRef.current.stopRecording();
    setCameraOpen(false);
  };

  return (
    <View style={styles?.container}>
      {cameraOpen ? (
        <View>
          {/* Headers */}
          <View style={styles?.heading}>
            <TouchableOpacity style={styles?.button} onPress={()=> navigation?.goBack()}>
              <WhiteBackArrow />
            </TouchableOpacity>
            <TouchableOpacity style={styles?.button}>
              <WhiteSettingsIcon />
            </TouchableOpacity>
          </View>
          {device ? (
            <Camera
              ref={cameraRef}
              style={styles.camera}
              device={device}
              isActive={true}
              video={true}
              audio={true}
            />
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size={'small'} color={colors?.RGB1} />
            </View>
          )}
          <RecordButton
            onPress={handlePress}
            animatedValue={animatedValue}
            isRecording={isRecording}
          />
        </View>
      ) : (
        <MomentDetails url={video?.path} setCameraOpen={setCameraOpen}/>
      )}
    </View>
  );
};

export default CreateMoment;
