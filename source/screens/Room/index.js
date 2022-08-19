import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import RoomApi from '../../api/room';
import { Operation, Header, Container, TextInput, Button } from '../../components'
import { fontScale } from '../../utils/functions';
import { images } from '../../utils/images';
import { useKeyboard } from '../../utils/keyboard';
import { styles } from './style';
import Voice from 'react-native-voice';
import ChatApi from '../../api/chat';
import { auth } from '../../api/constant';
import ChatListItem from '../../components/ChatListItem';
import { ROOMSETTINGS } from '../../utils/screens';
import UserApi from '../../api/user';
import ImageView from '../../components/Image';
// import { colors } from 'react-native-elements';
import { colors } from '../../utils/colors'
import { width } from '../../utils/variable';
import { retriveData } from '../../utils/localstorage';

const Room = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { roomName, roomId, uid } = route.params;
    const [updatingName, setUpdatingName] = useState(false);
    const [title, setTitle] = useState(roomName);
    const [results, setResults] = useState([]);
    const [partialResults, setPartialResults] = useState([]);
    const [pitch, setPitch] = useState('');
    const [error, setError] = useState('');
    const [started, setStarted] = useState('');
    const [end, setEnd] = useState('');
    const [voiceMessage, setVoiceMessage] = useState('');
    const [textMessage, setTextMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [ortherUser, setOrtherUser] = useState();
    const [loading, setLoading] = useState(false);
    const [userInfor, setUserInfor] = useState(null);
    const [userLanguage,setUserLanguage] = useState(null);
    const ref = useRef();


    const onSaveTitle = (title) => {
        setUpdatingName(false);
        RoomApi.updateRoomName(roomId, title);
    }

    const getUserInfor = async () => {
        const {result,error} = await UserApi.getUserByUid(uid);
        setUserInfor(result);
        await retriveData("devicelanguage").then((item) => {
            if (item) {
                setUserLanguage(item);
            };
        });
    }

    const keyboardHeight = useKeyboard();

    useEffect(() => {
        //Setting callbacks for the process status
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
        getUserInfor();
        return () => {
            //destroy the process after switching the screen
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, [voiceMessage]);

    const onSpeechStart = (e) => {
        //Invoked when .start() is called without error
        console.log('onSpeechStart: ', e);
        setStarted('√');
    };

    const onSpeechEnd = (e) => {
        //Invoked when SpeechRecognizer stops recognition
        console.log('onSpeechEnd: ', e);
        setEnd('√');
    };

    const onSpeechError = (e) => {
        //Invoked when an error occurs.
        console.log('onSpeechError: ', e);
        setError(JSON.stringify(e.error));
    };

    const onSpeechResults = async (e) => {
        // nhận diện giọng nói thành công
        console.log('onSpeechResults: ', e);
        const message = e.value;
        message.join();
    };

    const onSpeechPartialResults = async (e) => {
        //Invoked when any results are computed
        setPartialResults(e.value);
        let newMessage = e.value[0];
        //Base message send to server
        console.log('message send to server: ', newMessage);

        setVoiceMessage(newMessage);
        try {
            const { data } = await ChatApi.translateMessage(newMessage, 'en');
            const { status, text_need_trans, translation_text } = data;
            const uid = auth.currentUser?.uid;
            await ChatApi.createMessage(uid, newMessage, translation_text, roomId);
        } catch (error) {
            console.log(error)
        }
    };

    const onSpeechVolumeChanged = (e) => {
        //Invoked when pitch that is recognized changed
        console.log('onSpeechVolumeChanged: ', e);
        setPitch(e.value);
    };

    const startRecognizing = async () => {
        //Starts listening for speech for a specific locale
        try {
            await Voice.start('vi-VN');
            setPitch('');
            setError('');
            setStarted('');
            setResults([]);
            setPartialResults([]);
            setEnd('');
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    const stopRecognizing = async () => {
        //Stops listening for speech
        try {
            await Voice.stop();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    const sendMessage = async (textMessage) => {
        // Model: message, roomId, uId
        setLoading(true)
        try {
            const { data } = await ChatApi.translateMessage(textMessage, 'en');
            const { status, text_need_trans, translation_text } = data;
            const uid = auth.currentUser?.uid;
            await ChatApi.createMessage(uid, textMessage, translation_text, roomId);

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const getMessageByRoomId = async () => {
        try {
            const { result, error } = await ChatApi.getMessageByRoomId(roomId);
            setMessageList(result);
        } catch (error) {

        }
    }

    const checkPermission = () => {
        if (auth.currentUser.uid === route.params.uid) {
            navigation.navigate(ROOMSETTINGS)
        }
    }

    useFocusEffect(() => {
        getMessageByRoomId();
    });
    return (
        <Container>
            <ImageBackground source={images.sky} resizeMode="cover" style={styles.container}>
                <Header
                    onChangeTitle={(value) => setTitle(value)}
                    onSaveTitle={() => onSaveTitle(title)}
                    onPressTitle={() => setUpdatingName(true)}
                    titleInput={updatingName}
                    title={title}
                    source={images.groupavatar}
                    subtitle={roomId}
                    rightIcon={images.options}
                    onRightIconPress={() => { checkPermission() }}
                    style={styles.header} />
                <FlatList
                    data={messageList}
                    key={(item, index) => { item.message }}
                    style={styles.messageList}
                    renderItem={({ item, index }) => {
                        return <ChatListItem right={item.uid === auth.currentUser.uid ? true : false} key={item.id} label={item.name}
                            message={userLanguage=="vi" ?  item.message : item.messageEn} />
                    }}
                />
                
                <View style={{ ...styles.bottomContain, bottom: keyboardHeight == 0 ? fontScale(20) : keyboardHeight + fontScale(20) }}>
                    {
                        userInfor?.voiceMode === true
                            ?
                           <View style={{flex:1,justifyContent:"flex-end",position:"absolute",left:width-fontScale(50),bottom:fontScale(50)}}>
                             <TouchableOpacity onLongPress={() => startRecognizing()}>
                                <ImageView source={images.microphone} size={40} color={colors.blue} />
                            </TouchableOpacity>
                           </View>
                            :
                            <Operation
                                value={textMessage.toString()}
                                onChangeText={(value) => setTextMessage(value)}
                                onSend={() => sendMessage(textMessage)}
                                loading={loading}
                                onSpeechStart={() => startRecognizing()}
                                onSpeechEnd={() => stopRecognizing()} />
                    }
                </View>
            </ImageBackground>
        </Container>
    )
}

export default Room