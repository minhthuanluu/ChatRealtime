import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { HomeListItem, Container, TextInput, Button, Header, TextView } from '../../components'
import { LanguageItem } from '../../components'
import { colors } from '../../utils/colors'
import { fontScale } from '../../utils/functions'
import { images } from '../../utils/images'
import { storageData } from '../../utils/localstorage'
import { SIGNIN } from '../../utils/screens'
import { styles } from './style'

const Language = () => {
    const navigation = useNavigation();
    const setLanguage = async (lang) => {
        await storageData({id:"isUsed",value:true});
        await storageData({ id: "devicelanguage", value: lang }).then(()=>{
            navigation.navigate(SIGNIN)
        })
    }
    return (
        <Container style={styles.container}>
            <TextView color={colors.blue} fontSize={fontScale(20)} bold>Choose language</TextView>
            <View style={styles.languageContent}>
                <TouchableOpacity style={styles.langOpt} onPress={() => setLanguage('vi')}>
                    <LanguageItem icon={images.vi} />
                    <TextView fontSize={fontScale(19)} style={styles.label}>Vietnam</TextView>
                </TouchableOpacity>
                <TouchableOpacity style={styles.langOpt} onPress={() => setLanguage('en')}>
                    <LanguageItem icon={images.us} />
                    <TextView fontSize={fontScale(19)} style={styles.label}>English</TextView>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

export default Language