import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { CheckCheck, ChevronDown, ChevronUp, Folder, Mic, Music, SlidersHorizontal, Sparkles } from 'lucide-react-native';




type StatusType = "Mixing" | "Recording" | "Delivered" | "Mastering";

const STATUS_COLORS: Record<StatusType, { bg: string; text: string }> = {
    Mixing: { bg: "bg-[#AD46FF33]", text: "text-[#C27AFF]" },
    Recording: { bg: "bg-[#5B2EFF33]", text: "text-[#5B2EFF]" },
    Delivered: { bg: "bg-[#00C95033]", text: "text-[#05DF72]" },
    Mastering: { bg: "bg-[#F6339A33]", text: "text-[#FB64B6]" },
};

const STEP_ICONS = [Mic, SlidersHorizontal, Sparkles, CheckCheck];

type Track = {
    id: string;
    title: string;
    duration: string;
    updatedAgo: string;
    status: StatusType;
    collaborators: string[];
};

type Project = {
    id: string;
    title: string;
    songCount: number;
    date: string;
    tracks: Track[];
};

const STATUS_STEPS: Record<StatusType, number> = {
    Recording: 0,
    Mixing: 1,
    Mastering: 2,
    Delivered: 3,
};


// ── Track Card 
const TrackCard = ({ track }: { track: Track }) => (
    <View className="bg-[#000000] rounded-2xl px-4 py-3 mb-2">
        <View className="flex-row items-center gap-3">
            {/* Icon */}
            <View className="w-11 h-11 rounded-xl bg-[#5B2EFF1A] items-center justify-center">
                <Music color="#5B2EFF" size={22} />
            </View>

            {/* Info */}
            <View className="flex-1">
                <Text className="text-white font-bold text-[15px]">{track.title}</Text>
                <Text className="text-zinc-500 text-xs mt-0.5">
                    {track.duration} • {track.updatedAgo}
                </Text>

                {/* Icon buttons row */}
                <View className="flex-row items-center mt-2">
                    {STEP_ICONS.map((Icon, i) => {
                        const activeStep = STATUS_STEPS[track.status];
                        const isCompleted = i < activeStep;
                        const isCurrent = i === activeStep;
                        return (
                            <View key={i} className="flex-row items-center">
                                <View
                                    className="w-7 h-7 rounded-full bg-transparent items-center justify-center"
                                    style={{
                                        borderWidth: 1.5,
                                        borderColor: isCompleted
                                            ? "#00C95080"
                                            : isCurrent
                                                ? "#5B2EFF"
                                                : "#3f3f46",
                                    }}
                                >
                                    <Icon
                                        size={14}
                                        color={isCompleted ? "#00C950" : isCurrent ? "#5B2EFF" : "#6b7280"}
                                    />
                                </View>
                                {i < 3 && (
                                    <Text className="text-zinc-600 text-xs mx-1">—</Text>
                                )}
                            </View>
                        );
                    })}
                </View>
            </View>

            {/* Status badge */}
            <View className={`px-3 py-1.5 rounded-full ${STATUS_COLORS[track.status].bg}`}>
                <Text className={`text-sm font-semibold ${STATUS_COLORS[track.status].text}`}>
                    {track.status}
                </Text>
            </View>
        </View>
    </View>
);

const ProjectRow = ({ project }: { project: Project }) => {
    const [expanded, setExpanded] = useState(project.id === "1");
  return (
    <View className="bg-[#111111] rounded-2xl mb-3  overflow-hidden">
            {/* Header */}
            <TouchableOpacity
                onPress={() => setExpanded((v) => !v)}
                activeOpacity={0.7}
                className="flex-row items-center px-4 py-4 gap-3"
            >
                <View className="w-11 h-11 rounded-xl bg-indigo-600 items-center justify-center">
                    <Folder color="#ffffff" size={20} />
                </View>
                <View className="flex-1">
                    <Text className="text-white font-bold text-[15px]">{project.title}</Text>
                    <Text className="text-zinc-500 text-xs mt-0.5">
                        {project.songCount} songs • {project.date}
                    </Text>
                </View>
                {expanded
                    ? <ChevronUp color="#6b7280" size={18} />
                    : <ChevronDown color="#6b7280" size={18} />}
            </TouchableOpacity>

            {/* Tracks */}
            {expanded && project.tracks.length > 0 && (
                <View className="px-3 pb-3">
                    {project.tracks.map((track) => (
                        <TrackCard key={track.id} track={track} />
                    ))}
                </View>
            )}
        </View>
  )
}

export default ProjectRow