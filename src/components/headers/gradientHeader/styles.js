import { StyleSheet } from 'react-native'
import { height, width } from '../../../constant'
import { colors } from '../../../utils/colors'
import { fonts } from '../../../utils/fonts'

export const styles = StyleSheet.create({
    container : {
        height : height * 0.12,
        flexDirection : 'row',
        alignItems : "flex-end",
        paddingHorizontal : width * 0.05,
        paddingVertical : height * 0.02
    },
    title : {
        fontFamily : fonts?.montserratExtraBold,
        color : colors?.white,
        fontSize : width * 0.055
    },
    backButton : {
        alignItems : 'center',
        // backgroundColor : 'red',
        paddingVertical: width * 0.01,
        paddingHorizontal: width * 0.03
    },
    advancedButton : {
        borderWidth : width * 0.003,
        borderColor : colors?.white,
        borderRadius : width * 0.01,
        padding : width * 0.01,
        alignItems : 'center'
    },
    advancedButtonText : {
        color : colors?.white,
        fontFamily : fonts?.montserratBold,
        fontSize : width * 0.03
    }
})