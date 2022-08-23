import React, { useEffect, useState } from 'react'
import { Operation, Header, Container, TextInput, Button,Menu } from '../../../components'
import { ImageBackground, View } from 'react-native';
import { images } from '../../../utils/images';
import { Text } from '../../../utils/text';
import { styles } from './style';
import ToggleSwitch from 'toggle-switch-react-native'
import { colors } from '../../../utils/colors';
import TextView from '../../../components/TextView';
import { fontScale } from '../../../utils/functions';
import UserApi from '../../../api/user';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ROOM } from '../../../utils/screens';
import { auth } from '../../../api/constant';
import Modal from "react-native-modal";

const RoomSettings = () => {
  const [toggle, setToggle] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [showUpdateSecCodeModal,setShowUpdateSecCodeModal] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getUserInfor = () => {
    try {
      UserApi.getUserByUid().then(({ result, error }) => {
        setUser(result)
        setToggle(result?.voiceMode)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onToggle=async(value)=>{
    setToggle(value)
    try {
      await UserApi.updateVoiceMode(value).then(({ result, error }) => {
        
      })
    } catch (error) {
      console.log(error)
    } finally{
      ()=>navigation.goBack()
    }
  }

  useEffect(() => {
    getUserInfor();
  }, [user,toggle])

    const onCheckSecCode=()=>{
      const uid = route.params?.uid;
      setShowUpdateSecCodeModal(!showUpdateSecCodeModal);
    }

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
              offColor={colors.grey}
              size="medium"
              onToggle={isOn => onToggle(isOn)}
            />
          </View>
            {route.params?.uid=== auth.currentUser.uid&&<Menu label="Sec code" style={styles.menu} onPress={()=>toggleModal()}/>}
        </View>
      </ImageBackground>
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1,backgroundColor:"brown" }}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </Container>
  )
}

export default RoomSettings