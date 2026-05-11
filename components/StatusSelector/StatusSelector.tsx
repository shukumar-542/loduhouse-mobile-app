import { View, Text, TouchableOpacity } from 'react-native'

export default function StatusSelector({ status, onSelect }: {
    status: 'active' | 'inactive'
    onSelect: (s: 'active' | 'inactive') => void
}) {
    return (
        <View className="bg-[#111111] rounded-2xl p-4 mb-4 mt-6">
            <Text className="text-white font-semibold text-base mb-3">Status</Text>
            <View className="flex-row gap-3">
                <TouchableOpacity
                    onPress={() => onSelect('active')}
                    className="flex-1 py-2.5 rounded-xl items-center justify-center"
                    style={{
                        backgroundColor: status === 'active' ? '#05140D' : '#1E1E2E',
                        borderWidth: 1,
                        borderColor: status === 'active' ? '#4ADE80' : 'transparent',
                    }}
                >
                    <Text style={{ color: status === 'active' ? '#4ADE80' : '#6B7280' }}
                        className="font-semibold text-sm">Active</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onSelect('inactive')}
                    className="flex-1 py-2.5 rounded-xl items-center justify-center"
                    style={{
                        backgroundColor: '#1E1E2E',
                        borderWidth: 1,
                        borderColor: status === 'inactive' ? '#6B7280' : 'transparent',
                    }}
                >
                    <Text style={{ color: status === 'inactive' ? '#fff' : '#6B7280' }}
                        className="font-semibold text-sm">Inactive</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}