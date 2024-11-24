import { useEffect } from 'react'
import { Platform, SafeAreaView, View } from 'react-native'
import { SplashIcon } from '../../static-img-url';

const SplashScreen = ({ navigation }) => {

    const requestMicrophonePermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: "Microphone Permission",
                    message: "This app needs access to your microphone to record audio.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Microphone permission granted");
            } else {
                console.log("Microphone permission denied");
            }
        }
    };

    useEffect(() => {
        requestMicrophonePermission();
        setTimeout(() => {
            navigation.navigate('ChatListScreen')
        }, 3000);
    }, []);

    return (
        <SafeAreaView className="flex-1 justify-center bg-white items-center py-5">
            <SplashIcon />
        </SafeAreaView>
    );
}

export default SplashScreen;
