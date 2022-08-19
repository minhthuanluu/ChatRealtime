import React from 'react'
import { Image, View } from 'react-native'
import { images } from '../../utils/images'
import TextView from '../TextView'
import { styles } from './style'

const LanguageItem = ({icon,label}) => {
  return (
   <View style={styles.container}>
    <Image source={icon} defaultSource={images.sky} style={styles.icon} resizeMode="contain"/>
    <TextView>{label}</TextView>
   </View>
  )
}

export default LanguageItem