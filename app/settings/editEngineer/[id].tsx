import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import BackButton from '@/components/shared/BackButton'
import FormCard from '@/components/shared/FormCard'
import { Mail, Phone, User, Users, Briefcase, Trash2 } from 'lucide-react-native'
import Field from '@/components/shared/TextField'
import { useRouter, useLocalSearchParams } from 'expo-router'
import SelectField from '@/components/shared/SelectField'
import AvatarSelector from '@/components/AvatarSelector/AvatarSelector'
import StatusSelector from '@/components/StatusSelector/StatusSelector'


export default function EditEngineer() {
    const router = useRouter()

    const { name, email, phone, speciality, experience, avatar } =
        useLocalSearchParams<{
            name: string
            email: string
            phone: string
            speciality: string
            experience: string
            avatar: string
        }>()

    const [selectedAvatar, setSelectedAvatar] = React.useState(Number(avatar) || 1)
    const [fullName, setFullName] = React.useState(name || '')
    const [emailVal, setEmailVal] = React.useState(email || '')
    const [phoneNumber, setPhoneNumber] = React.useState(phone || '')
    const [specialityVal, setSpecialityVal] = React.useState(speciality || '')
    const [experienceVal, setExperienceVal] = React.useState(experience || '')
    const [status, setStatus] = React.useState<'active' | 'inactive'>('active')

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
            className="flex-1 bg-[#000000] px-4 pt-5"
        >
            <BackButton title="Edit Engineer" subTitle="Update engineer details" />

            <AvatarSelector selected={selectedAvatar} onSelect={setSelectedAvatar} />

            <FormCard title="Full Name" icon={<User color="#5B2EFF" size={22} />}>
                <Field
                    placeholder="Shukumar Ghosh"
                    value={fullName}
                    onChangeText={setFullName}
                />
            </FormCard>

            <FormCard title="Email Address" icon={<Mail color="#5B2EFF" size={22} />}>
                <Field
                    placeholder="shukumar@gmail.com"
                    value={emailVal}
                    onChangeText={setEmailVal}
                />
            </FormCard>

            <FormCard title="Phone Number" icon={<Phone color="#5B2EFF" size={22} />}>
                <Field
                    placeholder="01872999038"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="numeric"
                />
            </FormCard>

            <FormCard title="Speciality" icon={<Briefcase color="#5B2EFF" size={22} />}>
                <SelectField
                    value={specialityVal}
                    placeholder="Mixing & Mastering"
                    options={['Mixing & Mastering', 'Recording & Production', 'Beat Making & Hip-Hop', 'Vocal Recording', 'Music Production']}
                    onSelect={setSpecialityVal}
                />
            </FormCard>

            <FormCard title="Experience" icon={<Users color="#5B2EFF" size={22} />}>
                <Field
                    placeholder="5 years"
                    value={experienceVal}
                    onChangeText={setExperienceVal}
                />
            </FormCard>

            <StatusSelector status={status} onSelect={setStatus} />

            <TouchableOpacity
                onPress={() => router.back()}
                className="py-4 mt-2 rounded-xl items-center bg-[#5B2EFF]"
            >
                <Text className="text-white font-semibold text-lg">Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.back()}
                className="py-4 mt-3 mb-6 rounded-xl flex-row items-center justify-center gap-2"
                style={{ backgroundColor: '#1A0A0A', borderWidth: 1, borderColor: '#7F1D1D' }}
            >
                <Trash2 size={16} color="#EF4444" />
                <Text className="text-red-500 font-semibold text-base">Remove Engineer</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}