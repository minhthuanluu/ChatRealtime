import React, { useState } from 'react'
import { Animated, View, Easing, TouchableOpacity, Platform } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from '../../utils/colors'
import { fontScale } from '../../utils/functions'
import { images } from '../../utils/images'
import { Text } from '../../utils/text'
import { height } from '../../utils/variable'
import ImageView from '../Image'
import TextField from '../TextInput'
import TextView from '../TextView'
import { styles } from './style'

const Operation = ({ onSend }) => {
  const [showRecording, setShowRecording] = useState(false);
  const [recordingColor, setRecordingColor] = useState(colors.grey);
  const [endWave, setEndWave] = useState(true)

  const buildWaving = () => {
    setRecordingColor(colors.lightblue);
    setEndWave(false);
  }

  const wavingEnded = () => {
    setRecordingColor(colors.grey);
    setEndWave(true);
  }

  return (
    <View>
      <View style={{ ...styles.container, bottom: Platform.OS == "android" && !showRecording ? fontScale(40) : 0 }}>
        <TextField placeholder={Text.typeMessage} onSend={onSend} rightIcon={'micro-phone'} onRightIconPress={() => setShowRecording(!showRecording)} />
        <Icon name="send" color={colors.blue}  size={fontScale(30)}/>
      </View>
      {
        showRecording
          ?
          <Animated.View style={{ ...styles.recordingContain, height: height / 3, bottom: -fontScale(20)}}>
            <TextView center>{Text.typeToRecording}</TextView>
            <TouchableOpacity style={styles.recordingIcon} onLongPress={() => buildWaving()} onPressOut={() => wavingEnded()}>
              <ImageView source={images.microphone} size={fontScale(50)} color={endWave ? colors.grey : recordingColor} />
            </TouchableOpacity>
          </Animated.View>
          :
          null
      }
    </View>
  )
}

export default Operation