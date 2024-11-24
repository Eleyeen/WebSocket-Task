import { TouchableOpacity, View } from 'react-native'
import { Backarrow, Callicon, Profileicon } from '../../../../../static-img-url';
import TextComponent from '../../../global/text-component';

const TopNameImage = ({ navigation }) =>

    <View className='flex-row p-[16px] items-center bg-[#fff]'>
        <TouchableOpacity onPress={() => navigation.pop()}>
            <Backarrow />
        </TouchableOpacity>

        <View className='flex-row ml-[12px] items-center justify-between w-[90%]'>

            <View className='flex-row'>
                <View className='rounded-[80px] h-[40px] mr-[12px] w-[40px] ' >
                    <Profileicon width={40} height={40} />
                </View>
                <View className=' justify-center'>
                    <TextComponent css="text-[14px] font-[400] font-[600] text-[#000]" text='Openhome' />
                    <TextComponent css="text-[12px] font-[400] font-[600] text-[#8E8E93]" text='tap here foe contant info' />
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('callscreen')}>
                <Callicon />
            </TouchableOpacity>

        </View>
    </View>

export default TopNameImage;