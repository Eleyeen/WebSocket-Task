import { TouchableOpacity, View } from 'react-native'
import { Profileicon } from '../../../../../static-img-url';
import TextComponent from '../../../global/text-component';

const ChatListTile = ({ navigation }) =>

    <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')} className='flex-row mx-[16px]'>

        <View className='rounded-[80px] h-[60px] w-[60px] bg-slate-600' >
            <Profileicon width={60} height={60} />
        </View>

        <View className='ml-[12px] justify-center w-[80%]'>
            <View className='flex-row justify-between '>
                <TextComponent css="text-[16px] font-[400] font-[600] text-[#000]" text='Openhome' />
                <TextComponent css="text-[14px] font-[400] font-[600] text-[#8E8E93]" text='online' />
            </View>
            <TextComponent css="text-[14px] font-[400] font-[600] text-[#8E8E93]" text='Hi, welcome toopenhome' />
            <View className='h-[1px] bg-slate-200 mt-[12px]' />
        </View>

    </TouchableOpacity>

export default ChatListTile;
