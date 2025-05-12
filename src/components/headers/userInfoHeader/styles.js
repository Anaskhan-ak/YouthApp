import { StyleSheet } from 'react-native'
import { height, width } from '../../../constant'
import { colors } from '../../../utils/colors'
import { fonts } from '../../../utils/fonts'

export const styles = StyleSheet.create({
    container : {
        // backgroundColor : 'red',
        flexDirection : 'row',
        alignItems : 'center',
    },
    imageBorder : {
        width : width * 0.16,
        height : width * 0.16,
        borderRadius : width * 0.16,
        alignItems : 'center',
        justifyContent : 'center'
    },
    image : {
        width : width * 0.14,
        height : width * 0.14,
        borderRadius : width * 0.14
    },
    content : {
        marginLeft : width * 0.03,
        marginTop : height * 0.01
    },
    nameContainer : {
        flexDirection : 'row',
        alignItems : 'center',
        width : width * 0.45,
        justifyContent : 'space-between'
    },
    userName : {
        fontFamily : fonts?.montserratBold,
        fontSize : width * 0.045,
        lineHeight : width * 0.06
    },
    buttons : {
        flexDirection : 'row',
        alignItems : 'center',
        marginTop : height * 0.004
    },
    button : {
        borderWidth : width * 0.003,
        borderColor : colors?.RGB1,
        borderRadius : width * 0.01,
        paddingHorizontal : width * 0.009,
        paddingVertical : width * 0.003,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginVertical : height * 0.004,
        marginHorizontal : width * 0.005
        // width : width * 0.19
    },
    buttonIcon : {
        marginHorizontal : width * 0.007
    },
    buttonText : {
        fontFamily : fonts?.montserratMedium,
        fontSize : width * 0.03
    }
})