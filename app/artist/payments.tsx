import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { CalendarDays, CheckCircle2, Clock4 } from 'lucide-react-native'

const historyData = [
    {
        id: '1',
        title: 'Booking Deposit',
        subtitle: 'Loud House Premium',
        date: 'March 1, 2026',
        amount: '$150',
        status: 'Completed',
    },
    {
        id: '2',
        title: 'Booking Deposit',
        subtitle: 'Loud House Premium',
        date: 'February 20, 2026',
        amount: '$150',
        status: 'Completed',
    },
]

const pendingData = [
    {
        id: '3',
        title: 'Studio Session',
        subtitle: 'Loud House Premium',
        date: 'April 10, 2026',
        amount: '$200',
        status: 'Pending',
    },
]

type Transaction = {
    id: string
    title: string
    subtitle: string
    date: string
    amount: string
    status: string
}

const TransactionCard = ({ item }: { item: Transaction }) => {
    const isCompleted = item.status === 'Completed'

    return (
        <View className="bg-[#161616] rounded-2xl p-4 mb-3 border border-[#232323]">
            <View className="flex-row items-start justify-between">
                {/* Left: Icon + Info */}
                <View className="flex-row items-start gap-x-3 flex-1">
                    {/* Check Icon */}
                    <View className="bg-[#0D2E1A] rounded-full p-2 mt-0.5">
                        {isCompleted ? (
                            <CheckCircle2 size={20} color="#05DF72" />
                        ) : (
                            <Clock4 size={20} color="#F59E0B" />
                        )}
                    </View>

                    {/* Title & Subtitle */}
                    <View className="flex-1">
                        <Text className="text-white text-base font-bold mb-0.5">
                            {item.title}
                        </Text>
                        <Text className="text-[#888888] text-sm font-medium mb-3">
                            {item.subtitle}
                        </Text>

                        {/* Date Row */}
                        <View className="flex-row items-center gap-x-1.5">
                            <CalendarDays size={14} color="#888888" />
                            <Text className="text-[#888888] text-sm">
                                {item.date}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Right: Amount + Status */}
                <View className="items-end">
                    <Text className="text-white text-base font-bold mb-1">
                        {item.amount}
                    </Text>
                    <Text
                        className="text-sm font-semibold"
                        style={{ color: isCompleted ? '#05DF72' : '#F59E0B' }}
                    >
                        {item.status}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const Payments = () => {
    const [activeTab, setActiveTab] = useState<'History' | 'Pending'>('History')

    const data = activeTab === 'History' ? historyData : pendingData

    return (
        <View className="flex-1 bg-[#0E0E0E] px-5 pt-14">
            {/* Header */}
            <Text className="text-white text-3xl font-bold mb-1">Payments</Text>
            <Text className="text-[#888888] text-sm mb-6">
                Track your transactions
            </Text>

            {/* Tab Switcher */}
            <View className="bg-[#1A1A1A] rounded-xl flex-row p-1 mb-6">
                {(['History', 'Pending'] as const).map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        className="flex-1 py-2.5 rounded-xl items-center justify-center"
                        style={{
                            backgroundColor:
                                activeTab === tab ? '#5B2EFF' : 'transparent',
                        }}
                    >
                        <Text
                            className="font-semibold text-base"
                            style={{
                                color: activeTab === tab ? '#FFFFFF' : '#888888',
                            }}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Transaction List */}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TransactionCard item={item} />}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text className="text-[#888888] text-center mt-10">
                        No transactions found.
                    </Text>
                }
            />
        </View>
    )
}

export default Payments