import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View } from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SocialButton from '../../components/buttons/SocialButton';
import InboxHeader from '../../components/headers/chat/inbox';
import CustomSearchBar from '../../components/inputs/search';
import { width } from '../../constant';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import Account from './components/account';
import Social from './components/social';
import { styles } from './styles';

const Notifications = () => {
  const [search, setSearch] = useState('');
  const [toggleSocialAccount, setToggleSocialAccount] = useState('social');
  const navigation = useNavigation();

  return (
    <View style={styles?.container}>
      <InboxHeader
        title="Notifications"
        backPress={() => navigation?.goBack()}
      />
      <View style={styles?.buttonContainer}>
        <PrimaryButton
          title="Social"
          width={width * 0.45}
          onPress={() => setToggleSocialAccount('social')}
        />
        <SocialButton
          title="Account"
          width={width * 0.45}
          onPress={() => setToggleSocialAccount('account')}
        />
      </View>
      <CustomSearchBar
        marginHorizontal={width * 0.04}
        search={search}
        setSearch={setSearch}
      />
      {toggleSocialAccount === 'social' ? (
        <Social search={search} />
      ) : (
        <Account search={search} />
      )}
      <BottomTabNavigator />
    </View>
  );
};

export default Notifications;
