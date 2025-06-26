import {useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BackArrow} from '../../assets/images/svgs';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import CustomSearchBar from '../../components/inputs/search';
import InviteModal from '../../components/modals/genderModal/inviteModal';
import GradientText from '../../components/text/GradientText';
import {height, width} from '../../constant';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

const ContactsList = ({
  modal,
  setModal,
  search,
  handleSearch,
  getYouthappContacts,
  users,
  following,
  phoneNos,
  toggleFollow,
}) => {
  const [inviteModal, setInviteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState();
  const navigation = useNavigation();
  return (
    <Modal animationType="slide" visible={modal} statusBarTranslucent>
      <View style={styles?.modalContent}>
        <View style={styles?.header}>
          <TouchableOpacity
            style={styles?.backButton}
            onPress={() => setModal(false)}>
            <BackArrow />
          </TouchableOpacity>
          <Text style={styles?.headerText}>Find Friends</Text>
          <TouchableOpacity
            onPress={() => {
              setModal(false);
              navigation?.navigate('Home');
            }}>
            <GradientText style={styles?.gradientText}>Next</GradientText>
          </TouchableOpacity>
        </View>
        <CustomSearchBar
          search={search}
          setSearch={handleSearch}
          func={getYouthappContacts}
          marginHorizontal={width * 0.06}
        />
        <FlatList
          data={users}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => (
            <Text style={styles?.contentHeading}>Youthapp Contacts</Text>
          )}
          renderItem={({item}) => {
            const isFollowing = following.some(f => f.followingId === item?.id);
            return (
              <View style={styles?.contentItem}>
                <View style={styles?.itemLeftContent}>
                  <Image
                    source={
                      item?.photo
                        ? {uri: item?.photo}
                        : require('../../assets/images/SignupImage.jpeg')
                    }
                    style={styles?.itemImage}
                  />
                  <Text style={styles?.itemName}>
                    {item?.fullName?.length > 15
                      ? `${item?.fullName?.slice(0, 15)}...`
                      : item?.fullName}
                  </Text>
                </View>
                {isFollowing ? (
                  <PrimaryButton
                    width={width * 0.2}
                    height={height * 0.035}
                    title="Followed"
                    styles={styles?.gradientButton}
                    textStyle={styles?.gradientButtonText}
                    onPress={() => toggleFollow(item?.id)}
                  />
                ) : (
                  <TouchableOpacity
                    style={styles?.grayButton}
                    onPress={() => toggleFollow(item?.id)}>
                    <Text style={styles?.grayButtonText}>Follow</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
          style={styles?.list}
        />
        <FlatList
          data={phoneNos}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => (
            <Text style={styles?.contentHeading}>Phone Contacts</Text>
          )}
          renderItem={({item}) => (
            <View style={styles?.contentItem}>
              {/* left content */}
              <View style={styles?.itemLeftContent}>
                <Image
                  source={
                    item?.photo
                      ? {uri: item?.photo}
                      : require('../../assets/images/SignupImage.jpeg')
                  }
                  style={styles?.itemImage}
                />
                <Text style={styles?.itemName}>
                  {item?.fullName?.length > 15
                    ? `${item?.fullName?.slice(0, 15)}...`
                    : item?.fullName}
                </Text>
              </View>
              {/* <PrimaryButton
                    title={item?.button}
                    styles={styles?.gradientButton}
                    textStyle={styles?.gradientButtonText}
                  /> */}
              <TouchableOpacity
                style={styles?.grayButton}
                onPress={() => {
                  setSelectedContact(item?.phoneNumbers);
                  setInviteModal(true);
                }}>
                <Text style={styles?.grayButtonText}>Invite</Text>
              </TouchableOpacity>
            </View>
          )}
          style={[styles?.list, {marginTop: height * 0.02}]}
        />
        {inviteModal && (
          <InviteModal setModal={setInviteModal} contact={selectedContact} />
        )}
      </View>
    </Modal>
  );
};

export default ContactsList;
