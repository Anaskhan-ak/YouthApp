import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  GradientBlueMic,
  GradientRedMic,
  RewriteWithAi,
  UploadThumbnail,
} from '../../assets/images/svgs';
import CreateButton from '../../components/buttons/CreateButton';
import GradientHeader from '../../components/headers/gradientHeader';
import UserInfoHeader from '../../components/headers/userInfoHeader';
import { colors } from '../../utils/colors';
import AudioBars from './audioBars';
import { styles } from './styles';

const CreateYudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles?.container}>
      <GradientHeader
        title="New Yudio"
        backPress={() => navigation?.goBack}
        advancedButtonPress={() => console.log('Advanced Button')}
      />
      <UserInfoHeader
        userName={'Sannya Wasim'}
        image={require('../../assets/images/SignupImage.jpeg')}
      />
      <View style={styles?.content}>
        <TextInput
          style={styles?.inputTitle}
          placeholder="Your Yudio title"
          placeholderTextColor={colors?.gray}
        />
        <View style={styles?.inputThumbContainer}>
          <View style={styles?.inputDescContainer}>
            <TextInput
              style={styles?.inputDesc}
              placeholder="Say something about this..."
              placeholderTextColor={colors?.gray}
              editable
              multiline
              numberOfLines={5}
              scrollEnabled={true}
            />
            <View style={styles?.inputDescFooter}>
              <TouchableOpacity style={styles?.Ai}>
                <RewriteWithAi />
              </TouchableOpacity>
              <Text style={styles?.character}>350/350</Text>
            </View>
          </View>
          <TouchableOpacity style={styles?.thumbnailButton}>
            <UploadThumbnail />
            <Text style={styles?.uploadThumbnailText}>
              {`Upload your\n thumbnail`}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles?.yudioContainer}>
          {isRecording ? (
            <AudioBars isRecording={true} />
          ) : (
            <View style={styles?.dottedBorder}>
              <LinearGradient
                colors={[colors?.RGB1, colors?.RGB2]}
                style={styles?.yudioGradientImageBorder}>
                <Image
                  style={styles?.yudioImage}
                  source={require('../../assets/images/SignupImage.jpeg')}
                />
              </LinearGradient>
            </View>
          )}

          <TouchableOpacity
            style={styles?.mic}
            onPress={() => setIsRecording(!isRecording)}>
            {isRecording ? <GradientRedMic /> : <GradientBlueMic />}
          </TouchableOpacity>
        </View>
      </View>
      <CreateButton title="Create New Yudio" />
    </SafeAreaView>
  );
};

export default CreateYudio;
