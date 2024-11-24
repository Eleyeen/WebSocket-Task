import { TextInput, TouchableOpacity, View } from 'react-native'
import { Sendicon, Voiceicon } from '../../../../../static-img-url';

const SendMsg = ({ setInput, input, recordAndSendAudio, sendMessage }) =>

    <View className='bg-[#fff] w-[100%] h-[70px] items-center px-[16px]  flex-row'>
        <TextInput
            className='rounded-[40px] pl-[10px] w-[75%] text-[#000]  border-[1px] border-[#8E8E93] h-[40px]'
            placeholder="Type a message"
            value={input}
            onChangeText={setInput}
        />

        <TouchableOpacity className='ml-[16]' onPress={recordAndSendAudio}>
            <Voiceicon />
        </TouchableOpacity>


        <TouchableOpacity className='mx-[16]' onPress={sendMessage}>
            <Sendicon width={40} height={40} />
        </TouchableOpacity>
    </View>

export default SendMsg;
