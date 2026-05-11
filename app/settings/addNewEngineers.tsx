import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import BackButton from '@/components/shared/BackButton'
import FormCard from '@/components/shared/FormCard'
import { Mail, Phone, User, Users, Drum, Briefcase } from 'lucide-react-native'
import Field from '@/components/shared/TextField'
import { useRouter } from 'expo-router'
import SelectField from '@/components/shared/SelectField'
import AvatarSelector from '@/components/AvatarSelector/AvatarSelector'




export default function addNewEngineers() {
    const router = useRouter()
    const [selectedAvatar, setSelectedAvatar] = React.useState(1)
    const [fullName, setFullName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [speciality, setSpeciality] = React.useState('')
    const [experience, setExperience] = React.useState('')
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }} className='flex-1 bg-[#000000] px-4 pt-5'>
            <BackButton title='Add New Engineer' subTitle='Fill in engineer details' />
            <AvatarSelector selected={selectedAvatar} onSelect={setSelectedAvatar} />
            <FormCard
                title="Full Name"
                icon={<User color="#5B2EFF" size={22} />}
            >
                <Field
                    placeholder="Shukumar Ghosh"
                    value={fullName}
                    onChangeText={setFullName}
                />
            </FormCard>
            <FormCard
                title="Email Address"
                icon={<Mail color="#5B2EFF" size={22} />}
            >
                <Field
                    placeholder="shukumar@gmail.com"
                    value={email}
                    onChangeText={setEmail}
                />
            </FormCard>
            <FormCard
                title="Phone Number"
                icon={<Phone color="#5B2EFF" size={22} />}
            >
                <Field
                    placeholder="01872999038"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="numeric"
                />
            </FormCard>
          
            <FormCard
                title="Speciality"
                icon={<Briefcase color="#5B2EFF" size={22} />}
            >
                <SelectField
                    value={speciality}
                    placeholder="Mixing & Mastering"
                    options={["Mixing & Mastering", "Recoding & Production", "Beat Making & Hip-Hop", "Vocal Recording", "Music Production"]}
                    onSelect={setSpeciality}
                />
            </FormCard>
            <FormCard
                title="Experience"
                icon={<Users color="#5B2EFF" size={22} />}
            >
                <Field
                    placeholder="5 years"
                    value={experience}
                    onChangeText={setExperience}
                />
            </FormCard>

            <View className="pb-6">
                <TouchableOpacity
                    onPress={() => router.push("/settings/teamMembers")}
                    className={`py-4 mt-5 rounded-xl items-center bg-[#5B2EFF] }`}
                >
                    <Text className="text-white font-semibold text-lg">
                        Add Engineer
                    </Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}