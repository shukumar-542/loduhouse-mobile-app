import { View, Text, Switch } from 'react-native'
import React from 'react'
import { Mail, MapPin, Moon, Phone } from 'lucide-react-native'

const ProfileCard = () => {
    const [darkMode, setDarkMode] = React.useState(true)
    return (
        <View>
            <View className="px-5 pt-10 pb-4">
                <Text className="text-white text-3xl font-bold tracking-tight">
                    Profile
                </Text>
                <Text className="text-zinc-500 text-sm mt-0.5">Manage your studio</Text>
            </View>
            <View className=" bg-[#111111] mx-5 border border-[#4F4F59] rounded-2xl">
                <View className="px-4 py-4 flex-row items-center gap-4">
                    {/* Avatar */}
                    <View className="w-14 h-14 rounded-2xl bg-indigo-600 items-center justify-center overflow-hidden">
                        {/* Placeholder avatar with initials */}
                        <Text className="text-white text-xl font-bold">LH</Text>
                    </View>

                    {/* Info */}
                    <View className="flex-1">
                        <Text className="text-white text-[17px] font-semibold tracking-tight">
                            Loud House Studios
                        </Text>
                        <Text className="text-zinc-400 text-xs mt-0.5">Studio Owner</Text>
                    </View>
                </View>

                {/* Contact Details */}
                <View className=" px-4 py-1">
                    {/* Email */}
                    <View className="flex-row items-center gap-3 py-2 ">
                        <Mail color={"#ffff"} size={24} />
                        <Text className="text-zinc-300 text-xl">studio@loudhouse.com</Text>
                    </View>

                    {/* Phone */}
                    <View className="flex-row items-center gap-3 py-2 ">
                        <Phone color={"#ffff"} size={24} />
                        <Text className="text-zinc-300 text-xl">+1 (555) 987-6543</Text>
                    </View>

                    {/* Address */}
                    <View className="flex-row items-center gap-3 py-2">
                        <MapPin color={"#ffff"} size={24} />
                        <Text className="text-zinc-300 text-xl">
                            123 Music Street, Los Angeles, CA
                        </Text>
                    </View>
                </View>

            </View>
            {/* Appearance */}
            <View className="mx-5 mt-6 ">
                <Text className="text-white text-[17px] font-semibold mb-3">
                    Appearance
                </Text>
                <View className="bg-[#111111] border border-[#4F4F59] rounded-2xl px-4 py-4 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 rounded-md bg-[#5B2EFF33] items-center justify-center">
                            <Moon color={"#5B2EFF"} />
                        </View>
                        <View>
                            <Text className="text-white text-[15px] font-medium">
                                Dark Mode
                            </Text>
                            <Text className="text-zinc-500 text-xs mt-0.5">
                                Easy on the eyes
                            </Text>
                        </View>
                    </View>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        trackColor={{ false: "#3f3f46", true: "#6366f1" }}
                        thumbColor="#ffffff"
                    />
                </View>
            </View>
        </View>
    )
}

export default ProfileCard