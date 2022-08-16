import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { HomeScreen, RoomScreen } from './source/screens'
import { HOME, ROOM } from './source/utils/screens'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={HOME} component={HomeScreen} />
      <Stack.Screen name={ROOM} component={RoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App