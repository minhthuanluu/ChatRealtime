import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { fontScale } from '../../utils/functions'
import { images } from '../../utils/images'
import ImageView from '../Image'
import TextView from '../TextView'
import { styles } from './style'

const Menu = ({label,style}) => {
  return (
    <TouchableOpacity style={{...styles.container,...style}}>
        <TextView color={"white"} bold >{label}</TextView>
        <ImageView source={images.rightarrow} color={"white"} size={fontScale(15)}/>
    </TouchableOpacity>
  )
}

export default Menu