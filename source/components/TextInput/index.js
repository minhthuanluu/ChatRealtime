import React from 'react'
import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import { colors, Icon } from 'react-native-elements'
import { images } from '../../utils/images'
import ImageView from '../Image'
import { styles } from './style'

const TextField = ({ autoFocus, placeholder, style, iconName, iconColor, transparent, onChangeText, onSend, rightIcon, onRightIconPress }) => {
    return (
        transparent
            ?
            <TextInput autoFocus={autoFocus} placeholder={placeholder} style={styles.input} onChangeText={onChangeText} />
            :
            <View style={{ ...style, ...styles.container }}>
                {
                    iconName ? <Icon name={iconName} color={iconColor || 'grey'} style={styles.icon} /> : null
                }
                <TextInput autoFocus={autoFocus} placeholder={placeholder} style={{ ...styles.input, width: rightIcon ? '84%' : '90%', }} onChangeText={onChangeText} />
                {
                    rightIcon
                        ?
                        <TouchableOpacity onPress={onRightIconPress}>
                            <ImageView source={images.microphone} size={20} color={colors.grey2} />
                        </TouchableOpacity>
                        :
                        null
                }
            </View>

    )
}

export default TextField