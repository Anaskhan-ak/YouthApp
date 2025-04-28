import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Myfont } from '../../../assets/fonts/Fonts';
import { DropDownIcon } from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';
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
            <Text style={styles.welcomeTextz}>{title}</Text>
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
          <TouchableOpacity
            style={styles?.notificationButton}
            onPress={() => {
              setToggle(false);
            }}>
            <SwipeableList setVisibility={setVisibility} items={notifications}/>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};

export default Notifications;

const styles = StyleSheet?.create({
  container: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.003,
    marginBottom: height * 0.007,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.87,
  },
  buttonContainer: {
    flexDirection: 'row',
    columnGap: height * 0.007,
    alignItems: 'center',
  },
  dropdownButton: {
    backgroundColor: 'rgba(250, 250, 250, 0.34)',
    padding: width * 0.0085,
    paddingHorizontal: width * 0.02,
    borderRadius: width * 0.1,
    columnGap: width * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: width * 0.023,
    fontFamily: Myfont.Regular,
    color: colors.black,
  },
  welcomeTextz: {
    color: 'rgba(250, 250, 250, 0.75)',
    fontSize: width * 0.039,
    fontFamily: Myfont?.ExtraBold,
  },
  crossButton: {
    backgroundColor: 'rgba(250, 250, 250, 0.34)',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.04,
    height: width * 0.04,
    borderRadius: width * 0.04/2,
  },
  crossButtonText: {
    fontFamily: Myfont.Regular,
    fontSize: width * 0.025,
    textAlign: 'center',
    color: colors.text,
  },
  notificationContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationButton: {width: width * 0.9},
});
