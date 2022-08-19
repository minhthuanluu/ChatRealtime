import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const TextView = ({ children, color, bold, fontSize, onPress,center,style }) => {
    return (
        onPress ?
            <TouchableOpacity style={style} onPress={onPress}>
                <Text style={{ color: color, textAlign:center?'center':'auto',fontWeight: bold ? "bold" : "normal", fontSize }}>{children}</Text>
            </TouchableOpacity>
            :
            <Text style={{...style, color: color, textAlign:center?'center':'auto', fontWeight: bold ? "bold" : "normal", fontSize }}>{children}</Text>
    )
}

export default TextView