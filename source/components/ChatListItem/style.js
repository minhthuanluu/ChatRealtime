import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { fontScale } from "../../utils/functions";
import { width } from "../../utils/variable";

export const styles = StyleSheet.create({
    rightContainer:{
        alignSelf:'flex-end',
        backgroundColor:colors.white,
        padding:fontScale(5),
        borderRadius:fontScale(10),
        marginVertical:fontScale(5)
    },
    leftContainer:{
        alignSelf:'flex-start',
        backgroundColor:colors.white,
        maxWidth:width-fontScale(100),
        padding:fontScale(5),
        marginHorizontal:5,
        borderRadius:fontScale(10),
        marginVertical:fontScale(5)
    },
    name:{
        fontWeight:"bold",
        fontSize:fontScale(12),
        color:"#696969"
    }
})