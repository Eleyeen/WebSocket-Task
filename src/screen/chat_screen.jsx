import { StatusBar, View } from 'react-native'
import { useEffect, useState } from 'react';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import TopNameImage from '../component/module/chat-screen/top_image_name_section';
import ChatSection from '../component/module/chat-screen/chat_section';
import SendMsg from '../component/module/chat-screen/send_msg';
import { Web_Socket } from '../../config';

const ChatScreen = ({ navigation }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const audioRecorderPlayer = new AudioRecorderPlayer();

    const startCall = () => {
        const ws = new WebSocket(Web_Socket);

        ws.onopen = () => { setSocket(ws); };

        ws.onmessage = async (event) => {
            let message;
            try {
                message = JSON.parse(event.data);
            } catch (error) {
                console.error("Error parsing WebSocket message", error);
                return;
            }

            if (message && message.type === 'audio' && message.data.startsWith('//uQ')) {
                const audioPath = saveAudioFile(message.data);
                if (audioPath) {
                    setMessages((prev) => [...prev, { type: 'audio', audioPath }]);
                }
            } else if (message && message.type === 'message') {
                const { data } = message;
                // if (message.data.frist) { 
                if (data.content) {
                    setMessages((prev) => [...prev, { type: 'received', text: data.content }]);
                    // }
                }
            } else {
                console.warn("Unhandled message type or structure:", message);
            }
        };

        ws.onerror = (error) => { console.error('WebSocket error:', error); };
        ws.onclose = () => { setSocket(null); };
    };

    const sendMessage = () => {
        if (socket && input.trim()) {
            const message = { data: input.trim(), type: 'transcribed' };
            socket.send(JSON.stringify(message));
            console.log('Message sent to server:', message);
            setMessages((prevMessages) => [...prevMessages, { type: 'sent', text: input.trim() }]);
            setInput('');
        }
    };

    // Play audio file
    const playAudio = (audioPath) => {
        const sound = new Sound(audioPath, '', (error) => {
            if (error) {
                console.error('Failed to load the sound', error);
                return;
            }
            sound.play((success) => {
                if (!success) { console.error('Playback failed'); }
                sound.release();
            });
        });
    };

    const saveAudioFile = (base64Audio) => {
        const path = `${RNFS.DocumentDirectoryPath}/audio-${Date.now()}.mp3`;
        RNFS.writeFile(path, base64Audio, 'base64')
            .then(() => console.log('Audio file saved:', path))
            .catch((error) => console.error('Error saving audio file', error));
        return path;
    };

    const startRecording = async () => {
        const result = await audioRecorderPlayer.startRecorder();
        console.log('Recording started:', result);
    };

    const stopRecording = async () => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        console.log('Recording stopped, file path:', result);
        return result; // The recorded file path
    };

    const readAudioFileAsPCM = async (filePath) => {
        try {
            const audioData = await RNFS.readFile(filePath, 'base64'); // Read as Base64
            return audioData;
        } catch (error) {
            console.error('Error reading audio file:', error);
            return null;
        }
    };

    const recordAndSendAudio = async () => {
        if (!socket || socket.readyState !== WebSocket.OPEN) { console.error('WebSocket is not open.'); return; }

        try {
            await startRecording();
            setTimeout(async () => {
                const filePath = await stopRecording();
                console.log('Reading audio file...');
                const base64Audio = await readAudioFileAsPCM(filePath);

                if (base64Audio) {
                    console.log('Sending audio to WebSocket...');
                    const message = { type: 'audio', data: base64Audio, };
                    socket.send(JSON.stringify(message));
                    setMessages((prev) => [...prev, { typeuser: 'audio', type: 'sent', filePath }]);
                }
            }, 5000);
        } catch (error) {
            console.error('Error during recording or sending audio:', error);
        }
    };

    useEffect(() => {
        startCall();
    }, []);

    return (
        <View className='bg-[#F6F6F6] flex-1'>
            <StatusBar backgroundColor='#fff' />
            {/* top */}
            <TopNameImage navigation={navigation} />
            {/* chat section */}
            <ChatSection playAudio={playAudio} messages={messages} />
            {/* type message section */}
            <SendMsg setInput={setInput} input={input} recordAndSendAudio={recordAndSendAudio} sendMessage={sendMessage} />
        </View>
    )
}

export default ChatScreen;
