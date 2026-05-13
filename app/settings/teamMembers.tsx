import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { router, useRouter } from 'expo-router'
import BackButton from '@/components/shared/BackButton'

// ─── Constants 

const ACCENT = '#5B2EFF'

const MEMBERS = [
    {
        id: 1,
        name: 'Rafsan Ahmed',
        role: 'Mixing & Mastering',
        experience: '8 years experience',
        email: 'rafsan@loudhouse.studio',
        phone: '+880 1712-345678',
        rating: 4.9,
        sessions: 45,
        revenue: '$675k',
        revenueGenerated: '$675,000',
        totalPaid: '$337,500',
        pendingPayout: '$45,000',
        iconColor: '#5B2EFF',
        iconBg: '#5B2EFF22',
        iconName: 'headphones' as const,
    },
    {
        id: 2,
        name: 'Sadia Rahman',
        role: 'Recording & Production',
        experience: '6 years experience',
        email: 'sadia@loudhouse.studio',
        phone: '+880 1733-458789',
        rating: 4.8,
        sessions: 38,
        revenue: '$570k',
        revenueGenerated: '$570,000',
        totalPaid: '$285,000',
        pendingPayout: '$37,000',
        iconColor: '#FC5C7D',
        iconBg: '#FC5C7D22',
        iconName: 'pencil' as const,
    },
    {
        id: 3,
        name: 'Imran Khan',
        role: 'Beat Making & Hip-Hop',
        experience: '5 years experience',
        email: 'imran@loudhouse.studio',
        phone: '+880 1734-567890',
        rating: 4.7,
        sessions: 32,
        revenue: '$480k',
        revenueGenerated: '$480,000',
        totalPaid: '$240,500',
        pendingPayout: '$17,000',
        iconColor: '#F5A623',
        iconBg: '#F5A62322',
        iconName: 'piano' as const,
    },
]

const OVERALL_STATS = [
    { label: 'Total\nSessions', value: '115', icon: 'calendar-outline', iconColor: ACCENT },
    { label: 'Total\nRevenue', value: '$1725k', icon: 'trending-up', iconColor: '#4ADE80' },
    { label: 'Paid Out', value: '$863k', icon: 'checkmark-circle-outline', iconColor: '#4ADE80' },
    { label: 'Pending', value: '$99k', icon: 'time-outline', iconColor: '#F5A623' },
]

// ─── Sub Components 

const StatCard = ({ label, value, icon, iconColor }: typeof OVERALL_STATS[0]) => (
    <View className="flex-1 bg-[#000000] rounded-lg p-3">
        <View className="flex-row items-center gap-1 mb-2">
            <Ionicons name={icon as any} size={13} color={iconColor} />
            <Text className="text-gray-400 text-xs">{label}</Text>
        </View>
        <Text className="text-white font-bold text-xl">{value}</Text>
    </View>
)

const EngineerEarningCard = ({ member }: { member: typeof MEMBERS[0] }) => (
    <View className="bg-[#111111] rounded-2xl p-4 mb-4">
        {/* Top */}
        <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: member.iconBg }}>
                    <MaterialCommunityIcons name={member.iconName} size={20} color={member.iconColor} />
                </View>
                <View>
                    <Text className="text-white font-bold text-sm">{member.name}</Text>
                    <Text className="text-gray-400 text-xs">{member.role}</Text>
                </View>
            </View>
            <View className="flex-row items-center gap-1 bg-[#F5A62322] px-2 py-0.5 rounded-full">
                <Ionicons name="star" size={11} color="#F5A623" />
                <Text className="text-[#F5A623] text-xs font-bold">{member.rating}</Text>
            </View>
        </View>

        {/* Rows */}
        <View className="gap-2 mb-4">
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                    <Ionicons name="calendar-outline" size={13} color="#9CA3AF" />
                    <Text className="text-gray-400 text-xs">Sessions Worked</Text>
                </View>
                <Text className="text-white text-xs font-semibold">{member.sessions}</Text>
            </View>
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                    <Ionicons name="trending-up" size={13} color="#4ADE80" />
                    <Text className="text-gray-400 text-xs">Revenue Generated</Text>
                </View>
                <Text className="text-[#4ADE80] text-xs font-semibold">{member.revenueGenerated}</Text>
            </View>
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                    <Ionicons name="checkmark-circle-outline" size={13} color="#9CA3AF" />
                    <Text className="text-gray-400 text-xs">Total Paid</Text>
                </View>
                <Text className="text-white text-xs font-semibold">{member.totalPaid}</Text>
            </View>

            {/* Divider */}
            <View className="border-t border-gray-800 mt-1 pt-2 flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                    <Ionicons name="cash-outline" size={13} color="#F5A623" />
                    <Text className="text-gray-300 text-xs font-semibold">Pending Payout</Text>
                </View>
                <Text className="text-[#F5A623] text-xs font-bold">{member.pendingPayout}</Text>
            </View>
        </View>

        {/* Process Button */}
        <TouchableOpacity className="flex-row items-center justify-center gap-2 bg-[#00C95033] rounded-xl py-3">
            <Ionicons name="cash-outline" size={14} color="#4ADE80" />
            <Text className="text-[#05DF72] text-sm font-semibold">
                Process Payment ({member.pendingPayout})
            </Text>
        </TouchableOpacity>
    </View>
)

const MemberCard = ({ member, onEdit }: {
    member: typeof MEMBERS[0]
    onEdit: () => void 
}) => (
    <View className="bg-[#111111] rounded-2xl p-4 mb-4">
        <View className="flex-row items-start gap-3 mb-3">
            <View className="w-12 h-12 rounded-full items-center justify-center" style={{ backgroundColor: member.iconBg }}>
                <MaterialCommunityIcons name={member.iconName} size={24} color={member.iconColor} />
            </View>
            <View className="flex-1">
                <View className="flex-row items-center justify-between">
                    <Text className="text-white font-bold text-base">{member.name}</Text>
                    <View className="flex-row items-center gap-1 bg-[#F5A62322] px-2 py-0.5 rounded-full">
                        <Ionicons name="star" size={11} color="#F5A623" />
                        <Text className="text-[#F5A623] text-xs font-bold">{member.rating}</Text>
                    </View>
                </View>
                <Text className="text-gray-400 text-xs mt-0.5">{member.role}</Text>
                <Text className="text-gray-500 text-xs mt-0.5">{member.experience}</Text>
            </View>
        </View>

        <View className="mb-3 gap-1">
            <View className="flex-row items-center gap-2">
                <Ionicons name="mail-outline" size={13} color="#9CA3AF" />
                <Text className="text-gray-400 text-xs">{member.email}</Text>
            </View>
            <View className="flex-row items-center gap-2">
                <Ionicons name="call-outline" size={13} color="#9CA3AF" />
                <Text className="text-gray-400 text-xs">{member.phone}</Text>
            </View>
        </View>

        <View className="flex-row gap-4 mb-4">
            <View className="flex-1 bg-[#000000] rounded-xl p-3">
                <Text className="text-gray-400 text-xs mb-1">Sessions</Text>
                <Text className="text-white font-bold text-lg">{member.sessions}</Text>
            </View>
            <View className="flex-1 bg-[#000000] rounded-xl p-3">
                <View className="flex-row items-center gap-1 mb-1">
                    <Ionicons name="trending-up" size={12} color="#4ADE80" />
                    <Text className="text-gray-400 text-xs">Revenue</Text>
                </View>
                <Text className="text-white font-bold text-lg">{member.revenue}</Text>
            </View>
        </View>

        <View className="flex-row gap-3">
            <TouchableOpacity onPress={onEdit} className="flex-1 flex-row items-center justify-center gap-2 border border-gray-600 rounded-xl py-2.5">
                <Ionicons name="create-outline" size={15} color="#fff" />
                <Text className="text-white text-sm font-medium">Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> router.push("/settings/engineeriSession")} className="flex-1 items-center justify-center bg-[#201741]  rounded-xl py-2.5">
                <Text className="text-[#5B2EFF] text-sm font-medium">View Sessions</Text>
            </TouchableOpacity>
        </View>
    </View>
)

// ─── Main Screen

export default function TeamMembers() {

    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'engineers' | 'earnings'>('engineers')

    return (
        <View className="flex-1 bg-[#000000] px-4 pt-5">

            {/* Header */}
            <BackButton title='Team Members' subTitle='Manage your studio engineers and view earnings' />

            {/* Tab Switcher */}
            <View className="flex-row bg-[#111111] rounded-xl p-1 mb-4">
                {(['engineers', 'earnings'] as const).map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        className={`flex-1 py-2 rounded-lg items-center justify-center ${activeTab === tab ? 'bg-[#5B2EFF]' : ''}`}
                    >
                        <Text className={`text-sm font-semibold text-center ${activeTab === tab ? 'text-white' : 'text-gray-400'}`}>
                            {tab === 'engineers' ? 'Engineers' : 'Earnings\nDashboard'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {activeTab === 'engineers' ? (
                <>
                    {/* Add New Engineer Button */}
                    <TouchableOpacity onPress={() => router.push("/settings/addNewEngineers")} className="flex-row items-center justify-center gap-2 rounded-xl py-3 mb-5" style={{ backgroundColor: ACCENT }}>
                        <Ionicons name="add" size={18} color="#fff" />
                        <Text className="text-white font-semibold text-sm">Add New Engineer</Text>
                    </TouchableOpacity>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
                        {MEMBERS.map((member) => <MemberCard
                            onEdit={() => router.push({
                                pathname: `/settings/editEngineer/${member.id}`,
                                params: {
                                    name: member.name,
                                    email: member.email,
                                    phone: member.phone,
                                    speciality: member.role,
                                    experience: member.experience,
                                    avatar: String(member.id),
                                }
                            })}
                            key={member.id} member={member} />)}
                    </ScrollView>
                </>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
                    {/* Overall Stats */}
                    <View className='bg-[#111111] p-4 rounded-xl my-5'>
                        <Text className="text-white font-bold text-xl mb-3">Overall Statistics</Text>
                        <View className="flex-row gap-3 mb-3">
                            <StatCard {...OVERALL_STATS[0]} />
                            <StatCard {...OVERALL_STATS[1]} />
                        </View>
                        <View className="flex-row gap-3 mb-6">
                            <StatCard {...OVERALL_STATS[2]} />
                            <StatCard {...OVERALL_STATS[3]} />
                        </View>

                    </View>


                    {/* Engineer Earnings */}
                    <Text className="text-white font-bold text-xl mb-3">Engineer Earnings</Text>
                    {MEMBERS.map((member) => <EngineerEarningCard key={member.id} member={member} />)}
                </ScrollView>
            )}
        </View>
    )
} 