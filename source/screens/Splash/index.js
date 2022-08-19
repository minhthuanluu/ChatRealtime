import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Operation, Header, Container, TextInput, Button } from '../../components'
import { styles } from './style'
import { ActivityIndicator } from 'react-native'
import { colors } from '../../utils/colors'
import { auth } from '../../api/constant'
import { useNavigation } from '@react-navigation/native'
import { HOME, LANGUAGE, SIGNIN } from '../../utils/screens'
import { retriveData } from '../../utils/localstorage'

const Splash = props => {
    const { navigate } = useNavigation();
    useEffect(() => {
        const initial = () => {
            setTimeout(async () => {
                await retriveData('isUsed').then((item) => {
                    if (item!==undefined) {
                        auth.onAuthStateChanged((user) => {
                            if (user) {
                                navigate(HOME)
                            } else {
                                navigate(SIGNIN)
                            }
                        })
                    } else {
                        navigate(LANGUAGE);
                    }
                })

            }, 3000);
        }
        initial();
    }, [''])
    return (
        <Container style={styles.container}>
            <ActivityIndicator size="small" color={colors.white} />
        </Container>
    )
}

Splash.propTypes = {}

export default Splash