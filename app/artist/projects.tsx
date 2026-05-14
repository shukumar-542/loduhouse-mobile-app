import ProjectRow from '@/components/ProjectRow/ProjectRow';
import { Search } from 'lucide-react-native'
import React from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'


type StatusType = "Mixing" | "Recording" | "Delivered" | "Mastering";

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

const projects: Project[] = [
    {
        id: "1",
        title: "Summer Vibes EP",
        songCount: 4,
        date: "March 2026",
        tracks: [
            { id: "t1", title: "Sunset Dreams", duration: "3:24", updatedAgo: "2 hours ago", status: "Mixing", collaborators: ["A", "B", "C", "D"] },
            { id: "t2", title: "Beach Waves", duration: "4:12", updatedAgo: "5 hours ago", status: "Recording", collaborators: ["A", "B", "C", "D"] },
            { id: "t3", title: "Golden Hour", duration: "3:45", updatedAgo: "1 day ago", status: "Delivered", collaborators: ["A", "B", "C"] },
            { id: "t4", title: "Island Breeze", duration: "3:58", updatedAgo: "3 hours ago", status: "Mastering", collaborators: ["A", "B", "C"] },
        ],
    },
    {
        id: "2",
        title: "Midnight Sessions Album",
        songCount: 3,
        date: "February 2026",
        tracks: [
            { id: "t5", title: "Midnight Rain", duration: "3:10", updatedAgo: "2 days ago", status: "Mixing", collaborators: ["A", "B"] },
            { id: "t6", title: "Dark Thoughts", duration: "4:00", updatedAgo: "3 days ago", status: "Recording", collaborators: ["C", "D"] },
            { id: "t7", title: "Luna", duration: "3:33", updatedAgo: "1 week ago", status: "Delivered", collaborators: ["A"] },
        ],
    },
    {
        id: "3",
        title: "Acoustic Singles",
        songCount: 2,
        date: "January 2026",
        tracks: [
            { id: "t8", title: "Wooden Heart", duration: "2:58", updatedAgo: "2 weeks ago", status: "Delivered", collaborators: ["B", "C"] },
            { id: "t9", title: "String Theory", duration: "3:20", updatedAgo: "3 weeks ago", status: "Mastering", collaborators: ["A", "D"] },
        ],
    },
];

const Projects = () => {
    const [search, setSearch] = React.useState("")

    const filtered = projects.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    console.log(filtered)


    return (
        <View className="flex-1 bg-zinc-950">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="px-5  pb-2">
                    <Text className="text-white text-4xl font-semibold">My Projects</Text>
                    <Text className="text-white text-sm mt-0.5">Manage your creative work</Text>
                </View>

                <View className="mx-5 mt-4 mb-5 flex-row items-center bg-zinc-900 rounded-2xl px-4 gap-3">
                    <Search color="#6b7280" size={18} />
                    <TextInput
                        className="flex-1 text-white py-3.5 text-sm"
                        placeholder="Search projects or clients..."
                        placeholderTextColor="#6b7280"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
                <View className="px-5">
                    {filtered.map((project) => (
                        <ProjectRow key={project.id} project={project} />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default Projects