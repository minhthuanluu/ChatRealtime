import { StyleSheet } from "react-native";
import { fontScale } from "../../utils/functions";

export const styles = StyleSheet.create({
    container:{
        flexDirection:"row"
    },
    icon:{
        width:fontScale(35),
        height:fontScale(30),
        borderRadius:fontScale(10)
    }
})