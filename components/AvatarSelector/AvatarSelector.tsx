import { View, Text, TouchableOpacity } from 'react-native'
import { User, Drum } from 'lucide-react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const AVATARS = [
    { id: 1, icon: 'headphones', lib: 'mci' },
    { id: 2, icon: 'microphone-variant', lib: 'mci' },
    { id: 3, icon: 'piano', lib: 'mci' },
    { id: 4, icon: 'guitar-electric', lib: 'mci' },
    { id: 5, icon: 'music-note-eighth', lib: 'mci' },
    { id: 6, icon: 'playlist-music', lib: 'mci' },
    { id: 7, icon: 'trumpet', lib: 'mci' },
    { id: 8, icon: 'drum', lib: 'lucide' },
] as const

export default function AvatarSelector({ selected, onSelect }: {
    selected: number
    onSelect: (id: number) => void
}) {
    return (
        <View className="bg-[#111111] rounded-2xl p-4 mb-4">
            <View className="flex-row items-center gap-2 mb-4">
                <User size={20} color="#5B2EFF" />
                <Text className="text-white font-semibold text-xl">Select Avatar</Text>
            </View>
            <View className="flex-row flex-wrap">
                {AVATARS.map((avatar) => {
                    const isSelected = selected === avatar.id
                    return (
                        <TouchableOpacity
                            key={avatar.id}
                            onPress={() => onSelect(avatar.id)}
                            className="w-10 h-11 rounded-xl items-center justify-center"
                            style={{
                                backgroundColor: isSelected ? '#5B2EFF' : '#1E1E2E',
                                marginRight: 8,
                                marginBottom: 8,
                            }}
                        >
                            {avatar.lib === 'lucide' ? (
                                <Drum size={20} color={isSelected ? '#fff' : '#6B7280'} />
                            ) : (
                                <MaterialCommunityIcons
                                    name={avatar.icon as any}
                                    size={22}
                                    color={isSelected ? '#fff' : '#6B7280'}
                                />
                            )}
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}