import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:10,
        shadowColor: "#666",
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:10
    },
    label:{
        fontWeight:'bold'
    }
})