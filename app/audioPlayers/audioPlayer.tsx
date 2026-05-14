import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Dimensions,
} from 'react-native'
import { Audio, AVPlaybackStatus } from 'expo-av'
import { useRouter } from 'expo-router'
import {
    X,
    Music2,
    SkipBack,
    SkipForward,
    Pause,
    Play,
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    Shuffle,
} from 'lucide-react-native'

const { width } = Dimensions.get('window')

const playlist = [
    {
        id: '1',
        title: 'Sunset Dreams',
        album: 'Summer Vibes EP',
        tag: 'MIXING',
        duration: '3:24',
        durationSec: 204,
        // Replace with real audio URLs
        uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        id: '2',
        title: 'Beach Waves',
        album: 'Summer Vibes EP',
        tag: null,
        duration: '4:12',
        durationSec: 252,
        uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
        id: '3',
        title: 'Golden Hour',
        album: 'Summer Vibes EP',
        tag: null,
        duration: '3:45',
        durationSec: 225,
        uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
        id: '4',
        title: 'Island Breeze',
        album: 'Summer Vibes EP',
        tag: null,
        duration: '3:58',
        durationSec: 238,
        uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
]

const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000)
    const m = Math.floor(totalSec / 60)
    const s = totalSec % 60
    return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioPlayer() {
    const router = useRouter()
    const soundRef = useRef<Audio.Sound | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [positionMs, setPositionMs] = useState(0)
    const [durationMs, setDurationMs] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const currentTrack = playlist[currentIndex]
    const progress = durationMs > 0 ? positionMs / durationMs : 0

    // Load and play audio
    const loadTrack = async (index: number, autoPlay = true) => {
        setIsLoading(true)
        try {
            if (soundRef.current) {
                await soundRef.current.unloadAsync()
                soundRef.current = null
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                staysActiveInBackground: true,
                playsInSilentModeIOS: true,
            })

            const { sound } = await Audio.Sound.createAsync(
                { uri: playlist[index].uri },
                { shouldPlay: autoPlay },
                onPlaybackStatusUpdate
            )
            soundRef.current = sound
            setIsPlaying(autoPlay)
        } catch (e) {
            console.error('Audio load error:', e)
        } finally {
            setIsLoading(false)
        }
    }

    const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (!status.isLoaded) return
        setPositionMs(status.positionMillis)
        setDurationMs(status.durationMillis ?? 0)
        if (status.didJustFinish) {
            handleNext()
        }
    }

    useEffect(() => {
        loadTrack(0)
        return () => {
            soundRef.current?.unloadAsync()
        }
    }, [])

    const togglePlay = async () => {
        if (!soundRef.current) return
        if (isPlaying) {
            await soundRef.current.pauseAsync()
            setIsPlaying(false)
        } else {
            await soundRef.current.playAsync()
            setIsPlaying(true)
        }
    }

    const handleNext = () => {
        const next = (currentIndex + 1) % playlist.length
        setCurrentIndex(next)
        loadTrack(next)
    }

    const handlePrev = () => {
        const prev = (currentIndex - 1 + playlist.length) % playlist.length
        setCurrentIndex(prev)
        loadTrack(prev)
    }

    const handleSeek = async (ratio: number) => {
        if (!soundRef.current || durationMs === 0) return
        await soundRef.current.setPositionAsync(ratio * durationMs)
    }

    const handleSelectTrack = (index: number) => {
        setCurrentIndex(index)
        loadTrack(index)
    }

    const handleRestart = async () => {
        if (!soundRef.current) return
        await soundRef.current.setPositionAsync(0)
    }

    return (
        <View className="flex-1 bg-[#0C0C0F]">
            <StatusBar barStyle="light-content" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 pt-8 mb-6">
                    <View>
                        <Text className="text-white text-xl font-bold">Now Playing</Text>
                        <Text className="text-[#666680] text-sm mt-0.5">
                            {playlist.length} tracks
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-9 h-9 rounded-full bg-[#1E1E2A] items-center justify-center"
                    >
                        <X size={16} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Album Art */}
                <View className="items-center mb-6 px-5">
                    <View
                        className="w-56 h-56 rounded-3xl items-center justify-center"
                        style={{
                            backgroundColor: '#6C3FFF',
                            shadowColor: '#6C3FFF',
                            shadowOpacity: 0.5,
                            shadowRadius: 30,
                            shadowOffset: { width: 0, height: 10 },
                        }}
                    >
                        <Music2 size={72} color="rgba(255,255,255,0.9)" />
                    </View>
                </View>

                {/* Track Info */}
                <View className="items-center px-5 mb-6">
                    <Text className="text-white text-2xl font-bold mb-1">
                        {currentTrack.title}
                    </Text>
                    <Text className="text-[#666680] text-sm mb-3">
                        {currentTrack.album}
                    </Text>
                    {currentTrack.tag && (
                        <View className="bg-[#6C3FFF33] border border-[#6C3FFF66] px-3 py-1 rounded-full">
                            <Text className="text-[#A78BFF] text-xs font-semibold tracking-widest">
                                {currentTrack.tag}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Progress Bar */}
                <View className="px-5 mb-2">
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={(e) => {
                            const x = e.nativeEvent.locationX
                            const barWidth = width - 40
                            handleSeek(Math.min(Math.max(x / barWidth, 0), 1))
                        }}
                    >
                        <View className="h-1 bg-[#1E1E2A] rounded-full w-full">
                            <View
                                className="h-1 bg-[#6C3FFF] rounded-full"
                                style={{ width: `${progress * 100}%` }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Time */}
                <View className="flex-row justify-between px-5 mb-6">
                    <Text className="text-[#666680] text-xs">{formatTime(positionMs)}</Text>
                    <Text className="text-[#666680] text-xs">{formatTime(durationMs)}</Text>
                </View>

                {/* Controls */}
                <View className="flex-row items-center justify-between px-8 mb-8">
                    {/* Restart */}
                    <TouchableOpacity onPress={handleRestart} activeOpacity={0.7}>
                        <RotateCcw size={20} color="#666680" />
                    </TouchableOpacity>

                    {/* Skip Prev */}
                    <TouchableOpacity
                        onPress={handlePrev}
                        className="w-11 h-11 items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <SkipBack size={26} color="#fff" fill="#fff" />
                    </TouchableOpacity>

                    {/* Play/Pause */}
                    <TouchableOpacity
                        onPress={togglePlay}
                        activeOpacity={0.8}
                        className="w-16 h-16 rounded-full bg-[#6C3FFF] items-center justify-center"
                        style={{
                            shadowColor: '#6C3FFF',
                            shadowOpacity: 0.5,
                            shadowRadius: 16,
                            shadowOffset: { width: 0, height: 4 },
                        }}
                    >
                        {isPlaying ? (
                            <Pause size={28} color="#fff" fill="#fff" />
                        ) : (
                            <Play size={28} color="#fff" fill="#fff" />
                        )}
                    </TouchableOpacity>

                    {/* Skip Next */}
                    <TouchableOpacity
                        onPress={handleNext}
                        className="w-11 h-11 items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <SkipForward size={26} color="#fff" fill="#fff" />
                    </TouchableOpacity>

                    {/* Shuffle */}
                    <TouchableOpacity activeOpacity={0.7}>
                        <Shuffle size={20} color="#666680" />
                    </TouchableOpacity>
                </View>

                {/* Playlist */}
                <View className="px-5">
                    <View className="flex-row items-center gap-x-2 mb-4">
                        <Music2 size={16} color="#6C3FFF" />
                        <Text className="text-white text-base font-bold">Playlist</Text>
                    </View>

                    <View className="bg-[#111116] rounded-2xl overflow-hidden border border-[#1E1E2A]">
                        {playlist.map((track, index) => {
                            const isActive = index === currentIndex
                            return (
                                <TouchableOpacity
                                    key={track.id}
                                    onPress={() => handleSelectTrack(index)}
                                    activeOpacity={0.7}
                                    className={`flex-row items-center px-4 py-3.5 ${
                                        index < playlist.length - 1
                                            ? 'border-b border-[#1E1E2A]'
                                            : ''
                                    } ${isActive ? 'bg-[#6C3FFF22]' : ''}`}
                                >
                                    {/* Icon */}
                                    <View
                                        className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
                                            isActive ? 'bg-[#6C3FFF]' : 'bg-[#1E1E2A]'
                                        }`}
                                    >
                                        {isActive && isPlaying ? (
                                            <Pause size={14} color="#fff" fill="#fff" />
                                        ) : (
                                            <Play size={14} color={isActive ? '#fff' : '#666680'} fill={isActive ? '#fff' : '#666680'} />
                                        )}
                                    </View>

                                    {/* Info */}
                                    <View className="flex-1">
                                        <Text
                                            className={`text-sm font-semibold ${
                                                isActive ? 'text-[#A78BFF]' : 'text-white'
                                            }`}
                                        >
                                            {track.title}
                                        </Text>
                                        <Text className="text-[#666680] text-xs mt-0.5">
                                            {track.album}
                                        </Text>
                                    </View>

                                    {/* Duration */}
                                    <View className="flex-row items-center gap-x-1">
                                        <Text className="text-[#666680] text-xs">
                                            {track.duration}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}