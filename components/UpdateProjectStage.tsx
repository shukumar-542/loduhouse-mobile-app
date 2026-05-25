import React, { useState } from 'react'
import { Modal, Pressable, Text, View } from 'react-native'
import { ChevronDown, Check } from 'lucide-react-native'

const STAGES = ['Recording', 'Mixing', 'Mastering',  'Delivered']

function UpdateProjectStage() {
    const [selected, setSelected] = useState('Mixing')
    const [open, setOpen] = useState(false)

    return (
        <View className="bg-[#111111] rounded-2xl p-5 mb-5 ">
            {/* Title */}
            <Text className="text-white font-semibold text-base mb-4">
                Update Project Stage
            </Text>

            {/* Dropdown trigger */}
            <Pressable
                onPress={() => setOpen(true)}
                className="flex-row items-center justify-between px-4 py-3 rounded-xl border border-zinc-700 bg-[#000000]"
            >
                <Text className="text-white text-xl font-semibold">
                    {selected}
                </Text>
                <ChevronDown size={18} color="#a1a1aa" />
            </Pressable>

            {/* Helper text */}
            <Text className="text-zinc-500 text-xs mt-3 leading-5">
                Updating the stage will notify the client and update the project workflow.
            </Text>

            {/* Dropdown Modal */}
            <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
                <Pressable
                    className="flex-1 justify-center items-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                    onPress={() => setOpen(false)}
                >
                    <View
                        className="w-96 rounded-2xl overflow-hidden border border-zinc-700"
                        style={{
                            backgroundColor: '#000000',
                            alignSelf: 'stretch',  
                            marginHorizontal: 30, 
                        }}
                    >
                        {STAGES.map((stage, i) => (
                            <Pressable
                                key={stage}
                                onPress={() => { setSelected(stage); setOpen(false) }}
                                className="flex-row items-center justify-between px-5 py-3.5"
                                style={{
                                    borderTopWidth: i !== 0 ? 1 : 0,
                                    borderColor: '#27272a',
                                }}
                            >
                                <Text className={`text-sm font-medium ${selected === stage ? 'text-white ' : 'text-zinc-400'}`}>
                                    {stage}
                                </Text>
                                {selected === stage && <Check size={20} color="#5B2EFF" />}
                            </Pressable>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </View>
    )
}

export default UpdateProjectStage