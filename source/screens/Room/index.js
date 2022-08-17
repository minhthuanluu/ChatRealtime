import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ImageBackground, Text, View } from 'react-native';
import RoomApi from '../../api/room';
import { Operation, Header, Container, TextInput, Button } from '../../components'
import { fontScale } from '../../utils/functions';
import { images } from '../../utils/images';
import { useKeyboard } from '../../utils/keyboard';
import { styles } from './style';
import Voice from 'react-native-voice';

const Room = () => {
    const route = useRoute();
    const { roomName, roomId } = route.params;
    const [updatingName, setUpdatingName] = useState(false);
    const [title, setTitle] = useState(roomName);
    const [results, setResults] = useState([]);
    const [partialResults, setPartialResults] = useState([]);
    const [pitch, setPitch] = useState('');
    const [error, setError] = useState('');
    const [started, setStarted] = useState('');
    const [end, setEnd] = useState('');
    const [voiceMessage,setVoiceMessage] = useState('')

    const onSaveTitle = (title) => {
        setUpdatingName(false);
        RoomApi.updateRoomName(roomId, title);
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
    
        return () => {
            //destroy the process after switching the screen
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

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

    const onSpeechResults = (e) => {
        //Invoked when SpeechRecognizer is finished recognizing
        setResults(e.value);

    };

    const onSpeechPartialResults = (e) => {
        //Invoked when any results are computed
        console.log('onSpeechPartialResults: ', e);
        setPartialResults(e.value);
        setVoiceMessage(e.value)
    };

    const onSpeechVolumeChanged = (e) => {
        //Invoked when pitch that is recognized changed
        console.log('onSpeechVolumeChanged: ', e);
        setPitch(e.value);
    };

    const startRecognizing = async () => {
        //Starts listening for speech for a specific locale
        console.log('start recording voice...')
        try {
            await Voice.start('en-US');
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
        console.log('stop recording voice...')
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    };

    const cancelRecognizing = async () => {
        //Cancels the speech recognition
        try {
            await Voice.cancel();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    const destroyRecognizer = async () => {
        //Destroys the current SpeechRecognizer instance
        try {
            await Voice.destroy();
            setPitch('');
            setError('');
            setStarted('');
            setResults([]);
            setPartialResults([]);
            setEnd('');
        } catch (e) {
            console.error(e);
        }
    };

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
                    subtitle={'Active now'}
                    style={styles.header} />
                <View style={{ ...styles.bottomContain, bottom: keyboardHeight == 0 ? fontScale(20) : keyboardHeight + fontScale(20) }}>
                    <Operation
                        value={voiceMessage.toString()}
                        onChangeText={(value)=>setVoiceMessage(value)}
                        onSend={() => console.log('abc')}
                        onSpeechStart={() => startRecognizing()}
                        onSpeechEnd={() => stopRecognizing()} />
                </View>
            </ImageBackground>
        </Container>
    )
}

export default Room