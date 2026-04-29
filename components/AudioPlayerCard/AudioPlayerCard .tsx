import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Play, Pause, Download } from "lucide-react-native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
const audioSource = require("@/assets/audio/sample.mp3");

const AudioPlayerCard = () => {
    const [audioUri, setAudioUri] = useState<string | null>(null);
    const player = useAudioPlayer(audioUri ?? "");
    const status = useAudioPlayerStatus(player);

    useEffect(() => {
        const loadAsset = async () => {
            const asset = await Asset.fromModule(
                require("@/assets/audio/sample.mp3")
            ).downloadAsync();
            const uri = asset.localUri ?? asset.uri;
            console.log("Resolved URI:", uri);  
            setAudioUri(uri);
        };
        loadAsset();
    }, []);

    const isPlaying = status.playing;
    const isLoaded = status.isLoaded;

    // Stable waveform bars
    const waveformBars = useMemo(
        () => Array.from({ length: 40 }, () => Math.random() * 30 + 5),
        []
    );

    // Auto-rewind when track finishes
    useEffect(() => {
        if (status.didJustFinish) {
            player.seekTo(0);
        }
    }, [status.didJustFinish]);

    // ── Play / Pause ──────────────────────────────────────────────────────────
    const handlePlay = () => {
        if (!isLoaded) return;
        if (isPlaying) {
            player.pause();
        } else {
            player.play();
        }
    };

    // ── Download
    const handleDownload = async () => {
        try {
            const uri = FileSystem.Paths.document + "/track.mp3";

            await FileSystem.downloadAsync(
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                uri
            );

            Alert.alert("Success", "Downloaded successfully!");
        } catch (e) {
            // console.error("Download error:", e);
            Alert.alert("Error", "Download failed.");
        }
    };

    // ── UI ────────────────────────────────────────────────────────────────────
    return (
        <View className="bg-[#111111] p-4 rounded-2xl border border-gray-800">

            {/* Title */}
            <Text className="text-white font-semibold text-base">
                Track_01_Master_v3.wav
            </Text>
            <Text className="text-gray-400 text-xs mt-1 mb-3">
                v3 • March 1, 2026 • 3:42
            </Text>

            {/* Waveform */}
            <View className="h-12 bg-black rounded-xl mb-4 flex-row items-end px-2">
                {waveformBars.map((height, i) => (
                    <View
                        key={i}
                        style={{
                            width: 3,
                            height,
                            marginHorizontal: 1,
                            backgroundColor: isPlaying ? "#7C3AED" : "#4B2FA0",
                            borderRadius: 2,
                        }}
                    />
                ))}
            </View>

            {/* Buttons */}
            <View className="flex-row gap-3">

                {/* Play / Pause */}
                <TouchableOpacity
                    onPress={handlePlay}
                    disabled={!isLoaded}
                    className={`flex-1 py-3 rounded-xl flex-row items-center justify-center gap-2 ${isLoaded ? "bg-[#5B2EFF]" : "bg-[#3a2a6e]"
                        }`}
                >
                    {isPlaying ? (
                        <Pause color="white" size={18} />
                    ) : (
                        <Play color="white" size={18} />
                    )}
                    <Text className="text-white font-medium">
                        {!isLoaded ? "Loading..." : isPlaying ? "Pause" : "Play"}
                    </Text>
                </TouchableOpacity>

                {/* Download */}
                <TouchableOpacity
                    onPress={handleDownload}
                    className="flex-1 border border-gray-700 py-3 rounded-xl flex-row items-center justify-center gap-2"
                >
                    <Download color="white" size={18} />
                    <Text className="text-white font-medium">Download</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AudioPlayerCard;