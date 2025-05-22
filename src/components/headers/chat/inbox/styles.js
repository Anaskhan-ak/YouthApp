import { StyleSheet } from 'react-native'
import { height, width } from '../../../../constant'
import { colors } from '../../../../utils/colors'
import { fonts } from '../../../../utils/fonts'

export const styles = StyleSheet.create({
    container : {
        height : height * 0.12,
        flexDirection : 'row',
        alignItems : "flex-end",
        paddingHorizontal : width * 0.05,
        paddingVertical : height * 0.02,
        backgroundColor : colors?.white,
        justifyContent: 'space-between',
        borderBottomWidth : width * 0.001,
        borderColor : colors?.gray
    },
    title : {
        fontFamily : fonts?.montserratExtraBold,
        color : colors?.text,
        fontSize : width * 0.05,
        flex : 0.6,
        textAlign : "center"
    },
    backButton : {
        alignItems : 'center',
        justifyContent  :'center',
        paddingVertical: width * 0.01,
        paddingHorizontal: width * 0.03,
        flex : 0.1,
    },
    buttonContainer : {
        flexDirection : "row",
        alignItems : "flex-end",
        justifyContent : "center",
    },
    button : {
        borderWidth : width * 0.003,
        borderColor : colors?.white,
        borderRadius : width * 0.01,
        padding : width * 0.01,
        alignItems : 'center',
        justifyContent : "flex-end",
    },
})