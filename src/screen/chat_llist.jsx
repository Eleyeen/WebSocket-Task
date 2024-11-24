import { SafeAreaView, } from 'react-native'
import TextComponent from '../component/global/text-component';
import ChatListTile from '../component/module/chat_list/chat_list_tile';
import TapMenuItem from '../component/module/chat_list/top_menu_item';

const ChatListScreen = ({ navigation }) => {

    return (
        <SafeAreaView className='bg-[#fff] flex-1'>
            {/* Top Icon */}
            <TapMenuItem />
            {/* Chat Text */}
            <TextComponent css="text-[30px] font-[400] font-[600]  m-[16px]  text-[#000]" text='Chats' />
            {/* Chat List Tile */}
            <ChatListTile navigation={navigation}/>
        </SafeAreaView>
    )
};

export default ChatListScreen;
