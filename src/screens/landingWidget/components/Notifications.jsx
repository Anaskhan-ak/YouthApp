import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Myfont } from '../../../assets/fonts/Fonts';
import { DropDownIcon } from '../../../assets/images/svgs';
import { width } from '../../../constant';
import { colors } from '../../../utils/colors';
import SwipeableItem from '../components/Swippable';

  const Notifications = ({
    title,
    toggle,
    setToggle,
    isVisible,
    setVisibility,
  }) => {
    if (!isVisible) {return null;}
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
                  <Text
                    style={styles?.dropdownText}>
                    {toggle === false ? 'Show more' : 'Show less'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles?.crossButton}
                  onPress={() => setVisibility(false)}>
                  <Text
                    style={styles?.crossButtonText}>
                    X
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        {/* Notification bars */}
        <View className="w-full justify-center items-center">
          {toggle ? (
            <TouchableOpacity
              className="w-[90%]"
              onPress={() => {
                setToggle(false);
              }}>
              <SwipeableItem setVisibility={setVisibility} />
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
      marginTop: 4,
      marginBottom: 8,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '87%',
    },
    buttonContainer: {
      flexDirection: 'row',
      columnGap: 8,
      alignItems: 'center',
    },
    dropdownButton: {
      backgroundColor: 'rgba(250, 250, 250, 0.34)',
      padding: width * 0.0085,
      paddingHorizontal: width * 0.02,
      borderRadius: 25,
      columnGap: 3,
      flexDirection: 'row',
      alignItems: 'center',
    },
    dropdownText : {
      fontSize: width * 0.023,
      fontFamily: Myfont.Regular,
      color: colors.black,
    },
    welcomeTextz: {
      color: 'rgba(250, 250, 250, 0.75)',
      fontSize: width * 0.039,
      fontFamily: Myfont?.ExtraBold,
    },
    crossButton : {
      backgroundColor: 'rgba(250, 250, 250, 0.34)',
      justifyContent: 'center',
      alignItems: 'center',
      width : 20,
      height : 20,
      borderRadius : 30,
    },
    crossButtonText : {
      fontFamily: Myfont.Regular,
      fontSize: 9,
      textAlign: 'center',
      color: colors.text,
    },
  });
