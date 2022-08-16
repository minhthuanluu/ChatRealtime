import { Platform, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { fontScale } from "../../utils/functions";
import { height, width } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    recordingContain:{
        padding:fontScale(10),
        height:height/4,
        marginLeft:-fontScale(8),
        width:width,
        backgroundColor:colors.white,
        justifyContent:'center',
        alignItems:'center'
    },
    recordingIcon:{
        padding:fontScale(15),
        marginTop:fontScale(20),
        borderRadius:fontScale(50),
        borderColor:colors.grey,
        borderWidth:3
    }
})