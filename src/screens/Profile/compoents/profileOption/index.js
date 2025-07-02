import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SuggestedUsers from '../../../../components/post/subComponents/suggestedUsers';
import { profileOptions } from '../../../../utils/string';
import { styles } from './styles';

const ProfileOption = ({
  setEditProfile,
  setQr,
  getUserData,
  qrRef,
  accountsRef,
}) => {
  const [suggestedUsers, setSuggestedUsers] = useState(false);
  const handlePress = async id => {
    switch (id) {
      case 'follow':
        setSuggestedUsers(prev => !prev);
        break;
      case 'editProfile':
        setEditProfile(prev => !prev);
        break;
      case 'qr':
        qrRef?.current?.snapToIndex(0);
        break;
      case 'changeAcc':
        accountsRef?.current?.snapToIndex(0);
        break;
      default:
        break;
    }
  };
  return (
    <View style={styles?.container}>
      <View style={styles?.content}>
        {profileOptions?.map(item => (
          <TouchableOpacity
            key={item?.id}
            style={[
              styles?.optionButton,
              item?.id !== 'editProfile' && styles?.iconButton,
            ]}
            onPress={() => handlePress(item?.id)}>
            {item?.id === 'editProfile' ? (
              <Text style={styles?.editProfileText}>{item?.icon}</Text>
            ) : (
              item?.icon
            )}
          </TouchableOpacity>
        ))}
      </View>

      {suggestedUsers && (
        //  <View style={{width : width * 2}}>
        <View style={styles?.suggestions}>
          <SuggestedUsers getUserData={getUserData} />
          {/* </View> */}
        </View>
      )}
    </View>
  );
};

export default ProfileOption;
