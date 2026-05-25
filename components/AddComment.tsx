import React, { useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import { MessageSquare } from 'lucide-react-native'

function AddComment({ onSend }: { onSend?: (text: string) => void }) {
    const [comment, setComment] = useState('')

    const handleSend = () => {
        if (!comment.trim()) return
        onSend?.(comment.trim())
        setComment('')
    }

    return (
        <View className='border border-[#4F4F59] mt-3 rounded-2xl p-2 px-4'>
            <View className="flex-row items-center gap-x-2  py-3">
                {/* Input */}
                <View
                    className="flex-1 flex-row items-center px-4 rounded-xl"
                    style={{
                        backgroundColor: '#1c1c1e',
                        borderWidth: 1,
                        borderColor: '#3f3f46',
                        height: 48,
                    }}
                >
                    <TextInput
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Add a comment..."
                        placeholderTextColor="#52525b"
                        className="flex-1 text-white text-sm"
                        style={{ height: 48 }}
                        returnKeyType="send"
                        onSubmitEditing={handleSend}
                    />
                </View>

                {/* Send button */}
                <Pressable
                    onPress={handleSend}
                    className="w-12 h-12 rounded-xl items-center justify-center"
                    style={{ backgroundColor: '#5B2EFF' }}
                >
                    <MessageSquare size={20} color="#fff" />
                </Pressable>
            </View>
        </View>
    )
}

export default AddComment