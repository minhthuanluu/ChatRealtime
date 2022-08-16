import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TextInput, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from '../../utils/colors'
import { fontScale } from '../../utils/functions'
import { images } from '../../utils/images'
import ImageView from '../Image'
import TextView from '../TextView'
import { styles } from './style'

const Header = ({ title, subtitle, onPressTitle, titleInput, onChangeTitle, onSaveTitle, subtitleColor }) => {
    const { goBack } = useNavigation();
    return (
        <View style={styles.container}>
            <Icon name="chevron-left" color={colors.white} size={35} onPress={() => goBack()} />
            <ImageView size={fontScale(50)} circle />
            <View style={styles.textContainer}>
                {
                    titleInput == true
                        ?
                        <View style={styles.updatingTitle}>
                            <TextInput placeholder={title} value={title} style={styles.input} onChangeText={onChangeTitle} />
                            <View style={styles.checkContainer}>
                                <ImageView onPress={onSaveTitle} size={18} source={images.check} color={'white'} />
                            </View>
                        </View>
                        :
                        <TextView onPress={onPressTitle} bold fontSize={17} color={'white'}>{title}</TextView>
                }
                <TextView fontSize={12} color={subtitleColor || 'white'}>{subtitle}</TextView>
            </View>
        </View>
    )
}

export default Header