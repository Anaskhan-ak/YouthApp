import { Platform, StyleSheet } from "react-native";
import { fonts } from "../../../utils/fonts";
import { height, width } from "../../../constant";
import { colors } from "../../../utils/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '80%',
      backgroundColor: colors?.white,
      borderRadius: 10,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      marginBottom: 20,
    },
    closeButton: {
      backgroundColor: '#2196F3',
      borderRadius: 5,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    closeText: {
      color: colors?.white,
    },
    header: {
      height: height * 0.043,
      justifyContent: 'center',
      paddingHorizontal: 14,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      width: Platform?.OS === 'ios' ? '109%' : '100%',
    },
    contentView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 14,
      width: '100%',
    },
    content: {
      color: colors?.grayoutline,
      fontFamily: fonts?.plusJakartaSansRegular,
      fontSize: width * 0.04,
      paddingVertical: 6,
    },
    unSelect: {
      width: 12,
      height: 12,
      borderRadius: 12,
      backgroundColor: 'rgba(178, 178, 178, 0.6)',
      borderWidth: 1,
      borderColor: 'rgba(178, 178, 178, 1)',
    },
    line: {
      height: 0.8,
      width: '100%',
      backgroundColor: '#c2c2c2',
    },
  });