import { StyleSheet } from "react-native";
import { fontScale } from "../../utils/functions";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    langOpt:{
        flexDirection:"row",
        padding:fontScale(7),
        marginVertical:fontScale(5)
    },
    label:{
        marginLeft:fontScale(10)
    },
    languageContent:{
        marginTop:fontScale(15)
    }
})