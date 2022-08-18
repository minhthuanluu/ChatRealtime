import React, { useEffect, useState } from 'react'
import { Operation, Header, Container, TextInput, Button } from '../../../components'
import { ImageBackground, View } from 'react-native';
import { images } from '../../../utils/images';
import { Text } from '../../../utils/text';
import { styles } from './style';
import ToggleSwitch from 'toggle-switch-react-native'
import { colors } from '../../../utils/colors';
import TextView from '../../../components/TextView';
import { fontScale } from '../../../utils/functions';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import RoomApi from '../../../api/room';
import { ROOM } from '../../../utils/screens';
import UserApi from '../../../api/user';
import { auth } from '../../../api/constant';

const RoomSettings = () => {
  const route = useRoute();
  const { voiceMode, roomId } = route.params;
  const [toggle, setToggle] = useState(false);
  const [roomInfor, setRoomInfor] = useState(null);
  const isFocus = useIsFocused();

  const activeVoiceMode = async (mode) => {
    try {
      await UserApi.updateVoiceMode(auth?.currentUser?.uid, mode).then(({ voiceMode }) => {
        setToggle(!toggle);
      });
    } catch (error) {
      console.log(error)
    }
  }

  const initial = async () => {
    try {
      const data = await UserApi.getUserByUid(auth.currentUser.uid);
      setRoomInfor(data);
      setToggle(data?.voiceMode)
      console.log(data?.voiceMode)
    } catch (error) {

    }
  }

  useEffect(() => {
    initial();
  }, [])

  return (
    <Container>
      <ImageBackground source={images.sky} resizeMode="cover" style={styles.container}>
        <Header normal title={Text.roomsettings} />
        <View style={styles.content}>
          <View style={styles.voiceMenu}>
            <TextView color={colors.white} bold fontSize={fontScale(15)}>Turn on voice chat</TextView>
            <ToggleSwitch
              isOn={toggle}
              onColor={colors.blue}
              offColor={colors.lightgrey}
              animationSpeed={100}
              size="medium"
              onToggle={isOn => activeVoiceMode(isOn)}
            />
          </View>
        </View>
      </ImageBackground>
    </Container>
  )
}

export default RoomSettings