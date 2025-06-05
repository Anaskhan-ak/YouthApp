import { StyleSheet } from "react-native";
import { height, width } from "../../constant";

export const styles = StyleSheet?.create({
    header : {
        position : 'absolute',
        top : height * 0.03,
        left : width * 0.02,
        zIndex : 10
    },
    backButton : {
        padding : width * 0.03,
    }
})