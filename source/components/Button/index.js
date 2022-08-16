import React from 'react'
import { TouchableOpacity,Text } from 'react-native'
import { styles } from './style'

const Button = ({ onPress, label,style }) => {
    return (
        <TouchableOpacity style={{...styles.container,...style}} onPress={onPress}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
}

export default Button