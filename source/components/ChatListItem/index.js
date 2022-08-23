import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import UserApi from '../../api/user'
import { fontScale, generateRandomColor } from '../../utils/functions'
import Avatar from '../Avatar'
import ImageView from '../Image'
import { styles } from './style'

const ChatListItem = ({ right, message, label, uid }) => {
    const [name, setName] = useState('');
    useEffect(() => {
        const getNameByUId = async (uid) => {
            const { result } = await UserApi.getUserByUid(uid);
            setName(result?.name)
        }
        getNameByUId(uid)
    }, [message]);

    if (right) {
        return (
            <View style={styles.rightContainer}>
                <Text>{message}</Text>
            </View>
        )
    } else {
        return (
            <View style={{ flexDirection: "row", marginVertical: fontScale(5) }}>
                <Avatar text={name} backgroundColor={'#4e73ff'} />
                <View>
                    <View style={styles.leftContainer}>
                    <Text style={styles.name}>{name}</Text>
                        <Text>{message}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default ChatListItem