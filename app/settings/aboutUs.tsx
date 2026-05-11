import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '@/components/shared/Header'

export default function aboutUs() {
  return (
    <ScrollView className='bg-[#000000]'>
      <View className="px-5 pt-5 pb-4">
        <Header title='About Us' />
        <View className='bg-[#111111] border border-[#4F4F59] rounded-2xl p-4 mt-3'>
          <Text className="text-white text-xl  mt-2">
            gravida elit enim. lobortis, ex orci lobortis, Donec orci elit felis, luctus ultrices odio tincidunt cursus elit ex nisi vehicula, Morbi Nunc Morbi venenatis sollicitudin. tortor. dui non quam dui. nibh tortor. sit viverra maximus ipsum
          
          </Text>
          <Text className="text-white text-xl  mt-2">
          
            massa tincidunt massa non, Ut ex lobortis, nulla, sit orci Nam massa viverra venenatis massa placerat In viverra laoreet massa Lorem at elit scelerisque Quisque viverra id ipsum risus quam Lorem id quis ultrices vel placerat dui. elit nec
            lobortis, vehicula, tempor Quisque sed felis, vitae Sed varius dolor volutpat in sed non, massa sit porta nisi ex. porta nulla, turpis efficitur. Nunc dolor dolor id non est. lacus, varius ipsum placerat. elementum dignissim, Vestibulum

          </Text>
          <Text className="text-white text-xl  mt-2">
      

            quam efficitur. gravida non. lacus, vehicula, nec id commodo turpis Donec Nam faucibus quis elementum tincidunt tortor. orci adipiscing odio sed sollicitudin. eget quis faucibus diam Cras fringilla Nam Lorem adipiscing vel in Vestibulum
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}