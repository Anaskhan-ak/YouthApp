import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import UserInfoHeader from '../../../components/headers/userInfoHeader';
import MultilineInput from '../../../components/inputs/multilineInput';
import GradientText from '../../../components/text/GradientText';
import { toast } from '../../../components/toast';
import { height, Pixels, width } from '../../../constant';
import { getDataLocally } from '../../../helper';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const RepostModal = ({sheetRef, post, setActions}) => {
  const [description, setDescription] = useState('');
  const handleRepost = async () => {
    const userDetails = await getDataLocally();
    try {
      const body = {
        userId: userDetails?.id,
        postId: post?.id,
        caption: description,
        location: 'Pakistan',
      };
      const response = await apiCall?.repost(body);
      if (response) {
        console.log('Successfully reposted', response);
        setActions(prev=>({
            ...prev,
            repost : {
                ...prev?.repost,
                count : prev?.repost?.count + 1
            }
        }))
        sheetRef?.current?.close();
      }
    } catch (error) {
      console.log('Error reposting', error);
      toast('error', 'Error reposting');
    }
  };
  return (
    <BottomSheet
      enablePanDownToClose={true}
      //   snapPoints={['60%', '90%']} // Must have snapPoints!
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      index={-1}
      ref={sheetRef}
      onClose={() => {
        sheetRef?.current?.close();
      }}>
      <BottomSheetView style={styles.contentContainer}>
        <GradientText style={styles?.heading}>Repost</GradientText>
        <UserInfoHeader />
        <ScrollView style={styles?.input}>
          <MultilineInput
            placeholder="Say something about this..."
            placeholderTextColor={colors?.gray}
            editable={true}
            multiline={true}
            numberOfLines={5}
            scrollEnabled={true}
            value={description}
            onChangeText={setDescription}
            postType={'repost'}
            repostPress={handleRepost}
          />
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default RepostModal;

const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    paddingHorizontal: width * 0.04,
    borderTopLeftRadius: width * 0.04,
    borderTopRightRadius: width * 0.04,
    backgroundColor: colors?.white,
    height: height * 0.6,
  },
  heading: {
    fontFamily: fonts?.montserratExtraBold,
    fontSize: Pixels(23),
    alignSelf: 'center',
    marginTop: height * 0.01,
  },
  input: {
    marginTop: height * 0.02,
  },
});
