import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, RoomScreen, SigninScreen, SplashScreen } from './source/screens';
import { HOME, ROOM, SIGNIN, SPLASH } from './source/utils/screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SPLASH} component={SplashScreen} />
        <Stack.Screen name={SIGNIN} component={SigninScreen} />
        <Stack.Screen name={HOME} component={HomeScreen} />
        <Stack.Screen name={ROOM} component={RoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;