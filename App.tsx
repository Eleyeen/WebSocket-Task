import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import './global.css';
import 'react-native-reanimated';
import ChatListScreen from './src/screen/chat_llist';
import SplashScreen from './src/screen/splash-screen';
import ChatScreen from './src/screen/chat_screen';
import CallScreen from './src/screen/call-screen';
const Stack = createNativeStackNavigator();


const App = () =>

  <NavigationContainer>

    <Stack.Navigator initialRouteName="splashscreen">
      <Stack.Screen component={SplashScreen} name="splashscreen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="callscreen" component={CallScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen name="ChatListScreen" component={ChatListScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="ChatScreen" component={ChatScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>

export default App;
