import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, View,ImageBackground } from 'react-native'
import { Container, TextView } from '../../components'
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
            navigation.navigate(SIGNIN);
        });
    }
    return (
        <Container style={styles.container}>
             <ImageBackground source={images.langbg} resizeMode="cover" style={styles.container}>
            <TextView color={colors.white} fontSize={fontScale(20)} bold>Choose language</TextView>
            <View style={styles.languageContent}>
                <TouchableOpacity style={styles.langOpt} onPress={() => setLanguage('vi')}>
                    <LanguageItem icon={images.vi} />
                    <TextView fontSize={fontScale(19)} color={colors.white}  style={styles.label}>Vietnam</TextView>
                </TouchableOpacity>
                <TouchableOpacity style={styles.langOpt} onPress={() => setLanguage('en')}>
                    <LanguageItem icon={images.us} />
                    <TextView fontSize={fontScale(19)} color={colors.white}  style={styles.label}>English</TextView>
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </Container>
    )
}

export default Language