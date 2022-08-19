import { StyleSheet } from "react-native";
import { fontScale } from "../../utils/functions";

export const styles = StyleSheet.create({
    container:{
        flexDirection:"row"
    },
    icon:{
        width:fontScale(30),
        height:fontScale(20),
        borderRadius:fontScale(5)
    }
})