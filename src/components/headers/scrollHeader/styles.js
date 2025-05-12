import { StyleSheet } from 'react-native'
import { width } from '../../../constant'
import { colors } from '../../../utils/colors'
import { fonts } from '../../../utils/fonts'

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: width * 0.02,
        zIndex: 10,
        width: width,
      },
    headerIcon: {
        backgroundColor: colors?.gray,
        width: width * 0.11,
        height: width * 0.11,
        borderRadius: width * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerText: {
        fontFamily: fonts?.montserratBold,
        fontSize: width * 0.03,
      },
})