import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ImageBackground, View } from 'react-native';
import RoomApi from '../../api/room';
import { Operation, Header, Container, TextInput, Button } from '../../components'
import { fontScale } from '../../utils/functions';
import { images } from '../../utils/images';
import { useKeyboard } from '../../utils/keyboard';
import { styles } from './style';

const Room = () => {
    const route = useRoute();
    const { roomName, roomId } = route.params;
    const [updatingName, setUpdatingName] = useState(false);
    const [title, setTitle] = useState(roomName);

    const onSaveTitle = (title) => {
        setUpdatingName(false);
        RoomApi.updateRoomName(roomId, title);
    }

    const keyboardHeight = useKeyboard();

    return (
        <Container>
            <ImageBackground source={images.sky} resizeMode="cover" style={styles.container}>
                <Header
                    onChangeTitle={(value) => setTitle(value)}
                    onSaveTitle={() => onSaveTitle(title)}
                    onPressTitle={() => setUpdatingName(true)}
                    titleInput={updatingName}
                    title={title}
                    subtitle={'Active now'}
                    style={styles.header} />
                <View style={{ ...styles.bottomContain, bottom: keyboardHeight == 0 ? fontScale(20) : keyboardHeight + fontScale(20) }}>
                    <Operation onSend={() => console.log('abc')} />
                </View>
            </ImageBackground>
        </Container>
    )
}

export default Room