import { FlatList, TouchableOpacity, View } from 'react-native'
import TextComponent from '../../../global/text-component';
import { playAudio } from '../../../../../static-functions';

const ChatSection = ({  messages }) =>

    <View className='flex-1 bg-slate-100 '>
        {messages && <FlatList
            data={messages}
            renderItem={({ item }) => (
                <View className='pb-[12px]'>
                    {item.type === 'sent' ?
                        <View>
                            {
                                item.typeuser === 'audio' ?
                                    <View className='justify-end items-end'>
                                        <TouchableOpacity className='bg-[#fff] mt-[8px] rounded-[8px] p-[6px] max-w-[200px] mx-[16px]' onPress={() => playAudio(item.filePath)}>
                                            <TextComponent css="text-[12px] font-[400] font-[600] text-[#000]" text='Play Audio' />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View className='justify-end items-end'>
                                        <View className='bg-[#fff] mt-[8px] rounded-[8px] p-[6px] max-w-[200px] mx-[16px]'>
                                            <TextComponent css="text-[12px] font-[400] font-[600] text-[#000]" text={item.text || undefined} />
                                        </View>
                                    </View>
                            }
                        </View>


                        : item.type === 'audio' ?
                            <TouchableOpacity className='bg-[#DCF7C5] mt-[8px] rounded-[8px] p-[6px] max-w-[200px] mx-[16px]' onPress={() => playAudio(item.audioPath)}>
                                <TextComponent css="text-[12px] font-[400] font-[600] text-[#000]" text='Play Audio' />
                            </TouchableOpacity>
                            :

                            <View className='bg-[#DCF7C5] mt-[8px] rounded-[8px] p-[6px] max-w-[200px] mx-[16px]'>
                                <TextComponent css="text-[12px] font-[400] font-[600] text-[#000]" text={item.text || undefined} />
                            </View>
                    }
                </View>
            )}
        />
        }
    </View>

export default ChatSection;
