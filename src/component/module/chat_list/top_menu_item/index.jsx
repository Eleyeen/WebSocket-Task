import { View } from 'react-native'
import { Cameraicon, Menuicon, Pluscircleicon } from '../../../../../static-img-url';

const TapMenuItem = () =>

    <View className='mt-[16px] justify-between ml-[16px] flex-row'>
        <Menuicon />
        <View className='flex-row w-[70px] justify-between  mr-[16px]'>
            <Cameraicon />
            <Pluscircleicon />
        </View>
    </View>

export default TapMenuItem;
