import { View, Text } from "react-native";
import React from "react";
import { Users, Crown, CircleUser } from "lucide-react-native";

// ─── Types ────────────────────────────────────────────────────────────────────

type MemberRole = "owner" | "collaborator" | "viewer";

interface Member {
    id: string;
    name: string;
    email: string;
    addedDate: string;
    role: MemberRole;
    initials: string;
    avatarBg: string;
}

// ─── Role Badge Config ─────────────────────────────────────────────────────────

const ROLE_CONFIG: Record<MemberRole, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
    owner:        { label: "Owner",        bg: "#2B1F00", text: "#F59E0B", icon: <Crown color="#F59E0B" size={12} /> },
    collaborator: { label: "Collaborator", bg: "#0D1F2B", text: "#38BDF8", icon: <CircleUser color="#38BDF8" size={12} /> },
    viewer:       { label: "Viewer",       bg: "#1A1A2E", text: "#A78BFA", icon: <Users color="#A78BFA" size={12} /> },
};

// ─── Member Card ──────────────────────────────────────────────────────────────

const MemberCard = ({ member }: { member: Member }) => {
    const role = ROLE_CONFIG[member.role];

    return (
        <View className="flex-row items-center bg-[#000000] border border-gray-800 rounded-2xl p-4 mb-3">

            {/* Avatar */}
            <View
                className="w-12 h-12 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: member.avatarBg }}
            >
                <Text className="text-white font-bold text-sm">{member.initials}</Text>
            </View>

            {/* Info */}
            <View className="flex-1">
                <Text className="text-white font-semibold text-base">{member.name}</Text>
                <Text className="text-gray-500 text-xs mt-0.5">{member.email}</Text>
                <Text className="text-gray-500 text-xs mt-0.5">Added {member.addedDate}</Text>
            </View>

            {/* Role Badge */}
            <View
                className="flex-row items-center gap-1 px-3 py-1.5 rounded-full"
                style={{ backgroundColor: role.bg }}
            >
                {role.icon}
                <Text className="text-xs font-semibold ml-1" style={{ color: role.text }}>
                    {role.label}
                </Text>
            </View>
        </View>
    );
};

// ─── Project Members ──────────────────────────────────────────────────────────

interface ProjectMembersProps {
    members?: Member[];
}

const ProjectMembers: React.FC<ProjectMembersProps> = ({ members = DEMO_MEMBERS }) => (
    <View>
        {/* Header */}
        <View className="flex-row items-center gap-3 mb-4">
            <Users color="#5B2EFF" size={22} />
            <View>
                <Text className="text-white text-xl font-bold">Project Members</Text>
                <Text className="text-gray-400 text-sm">({members.length})</Text>
            </View>
        </View>

        {/* Member Cards */}
        {members.map(member => (
            <MemberCard key={member.id} member={member} />
        ))}
    </View>
);

// ─── Demo Data ────────────────────────────────────────────────────────────────

const DEMO_MEMBERS: Member[] = [
    {
        id: "1",
        name: "Rob",
        email: "rob111222@gmail.com",
        addedDate: "Feb 15, 2026",
        role: "owner",
        initials: "SO",
        avatarBg: "#1E1B4B",
    },
    {
        id: "2",
        name: "John Doe",
        email: "johndoe@gmail.com",
        addedDate: "Feb 15, 2026",
        role: "collaborator",
        initials: "JD",
        avatarBg: "#1E1B4B",
    },
    {
        id: "3",
        name: "Jane Sn",
        email: "janee@gmail.com",
        addedDate: "Feb 15, 2026",
        role: "viewer",
        initials: "JS",
        avatarBg: "#1E1B4B",
    },
];

export default ProjectMembers;

// ─── Usage ───────────────────────────────────────────────────────────────────
// <ProjectMembers />
// <ProjectMembers members={myMembers} />