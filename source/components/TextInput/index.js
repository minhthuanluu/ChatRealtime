import React from 'react'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { colors, Icon } from 'react-native-elements'
import { images } from '../../utils/images'
import ImageView from '../Image'
import { styles } from './style'

const TextField = ({ autoFocus, placeholder, style, iconName, autoCapitalize, iconColor, transparent, onChangeText, rightIcon, onRightIconPress, value, password, loading, ref, ...props }) => {
    return (
        transparent
            ?
            <TextInput {...props} autoFocus={autoFocus} autoCapitalize={autoCapitalize} secureTextEntry={password ? true : false} value={value} placeholder={placeholder} style={styles.input} onChangeText={onChangeText} />
            :
            <View style={{ ...style, ...styles.container }}>
                {
                    iconName ? <Icon name={iconName} color={iconColor || 'grey'} style={styles.icon} /> : null
                }
                <TextInput autoFocus={autoFocus} autoCapitalize={autoCapitalize} secureTextEntry={password ? true : false} value={value} placeholder={placeholder} style={{ ...styles.input, width: rightIcon ? '84%' : '90%', }} onChangeText={onChangeText} />
                {/* {
                    rightIcon
                        ?
                        <TouchableOpacity onPress={onRightIconPress}>
                            <ImageView source={images.microphone} size={20} color={colors.grey2} />
                        </TouchableOpacity>
                        :
                        loading ?
                        <ActivityIndicator color={colors.success} size="small"/>
                        :
                        rightIcon
                } */}
                {
                    rightIcon ?
                        loading
                            ?
                            <ActivityIndicator color={colors.grey2} size="small" />
                            :
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