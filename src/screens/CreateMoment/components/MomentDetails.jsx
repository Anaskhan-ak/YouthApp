import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import Drawer from '../../../components/drawer';
import GradientHeader from '../../../components/headers/gradientHeader';
import UserInfoHeader from '../../../components/headers/userInfoHeader';
import MultilineInput from '../../../components/inputs/multilineInput';
import { height, width } from '../../../constant';
import useUser from '../../../hooks/user';
import { colors } from '../../../utils/colors';

const MomentDetails = ({setCameraOpen, url}) => {
  const user = useUser();
  const [description, setDescription] = useState('')
  const [chars, setChars] = useState(0)
  const maxChars = 350
  return (
    <View style={styles?.container}>
      <GradientHeader
        backPress={() => setCameraOpen(true)}
        title="New Moment"
      />
        <View style={styles?.padding}>
            <UserInfoHeader
        image={user?.photo}
        userName={`${user?.firstName} ${user?.lastName}`}
      />
      <View style={styles?.content}>
        <MultilineInput
          placeholder="Say something about this..."
          placeholderTextColor={colors?.gray}
          editable={true}
          multiline={true}
          numberOfLines={5}
          scrollEnabled={true}
          value={description}
          onChangeText={setDescription}
          chars={chars}
          setChars={setChars}
          maxChars={maxChars}
          postType={'post'}
        />
        <Video source={{uri : url}} style={styles?.thumbnail}/>
      </View>
      <Drawer/>
        </View>
    </View>
  );
};

export default MomentDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.white,
    flex : 1,
    // alignItems : 'center'
  },
  content : {
    flexDirection : "row",
    alignItems : 'center',
    justifyContent : 'space-between',
    marginVertical : width * 0.03
  },
  thumbnail : {
    width : width * 0.7,
    height : height * 0.18,
    marginHorizontal : width * 0.02,
    marginVertical : width * 0.01,
    flex : 0.8,
    borderRadius : width * 0.02,
    overflow : 'hidden'
  },
  padding : {
    padding : width * 0.03
  }
});
