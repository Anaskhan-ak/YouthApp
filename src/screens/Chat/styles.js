import { StyleSheet } from 'react-native'
import { height, width } from '../../constant'
import { colors } from '../../utils/colors'

export const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : colors?.white,
    },
    list : {
        padding : width * 0.03
    },
    messages : {
        height : height * 0.8
    }
})