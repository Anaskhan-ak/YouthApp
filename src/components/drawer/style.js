import { StyleSheet } from 'react-native'
import { width } from '../../constant'
import { colors } from '../../utils/colors'
import { fonts } from '../../utils/fonts'

export const styles = StyleSheet.create({
    container : {
        // backgroundColor : 'red',
        marginVertical : width * 0.02,
        marginHorizontal : -width * 0.03
    },
    itemContainer : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        padding : width * 0.035,
        borderTopWidth : width * 0.002,
        borderColor : colors?.extraLightGrey,
        backgroundColor : colors?.white
    },
    itemText : {
        fontFamily : fonts?.montserratSemiBold,
        color : colors?.text,
        
    }
})