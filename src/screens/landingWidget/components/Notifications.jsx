import { Text, TouchableOpacity, View } from 'react-native';
import { DropDownIcon } from '../../../assets/images/svgs';
import { styles } from '../styles/Notifications';
import SwipeableList from './Swippable';

const Notifications = ({
  title,
  toggle,
  setToggle,
  isVisible,
  setVisibility,
  notifications
}) => {
  if (!isVisible) {
    return null;
  }
  return (
    <>
      <View style={styles?.container}>
        {title && (
          <View style={styles?.content}>
            <Text style={styles?.welcomeTextz}>{title}</Text>
            <View style={styles?.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  setToggle(!toggle);
                }}
                style={styles?.dropdownButton}>
                <View
                  style={{transform: [{rotate: toggle ? '0deg' : '180deg'}]}}>
                  <DropDownIcon />
                </View>
                <Text style={styles?.dropdownText}>
                  {toggle === false ? 'Show more' : 'Show less'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles?.crossButton}
                onPress={() => setVisibility(false)}>
                <Text style={styles?.crossButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {/* Notification bars */}
      <View style={styles?.notificationContainer}>
        {toggle ? (
          <View
            style={styles?.notificationButton}
            onPress={() => {
              setToggle(false);
            }}>
            <SwipeableList setVisibility={setVisibility} notifications={notifications}/>
          </View>
        ) : null}
      </View>
    </>
  );
};

export default Notifications;

