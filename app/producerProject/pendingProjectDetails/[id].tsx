import {
  View, Text, ScrollView, TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Users } from "lucide-react-native";

// ── Types 
type ProjectDetails = {
  clientName: string;
  time: string;
  date: string;
  projectName: string;
  projectDescription: string;
  sessionType: string;
  attendees: number;
  sessionNotes: string;
  additionalNotes: string;
};

type Room = {
  name: string;
  type: string;
  people: string;
  equipment: string[];
};

type Payment = {
  hourlyRate: number;
  duration: number;
};

// ── Mock Data 
const projectDetails: ProjectDetails = {
  clientName: "Mike Johnson",
  time: "09:00 AM — 10:00 AM",
  date: "Monday, March 2",
  projectName: "Sound Recoding",
  projectDescription: "This project is a music studio platform that allows users to browse studios, book sessions.",
  sessionType: "Mixing",
  attendees: 5,
  sessionNotes: "Additional features include booking status management, real-time notifications.",
  additionalNotes: "Additional features include booking status management, real-time notifications.",
};

const room: Room = {
  name: "Jupiter Room",
  type: "Recording & Production",
  people: "4-5 people",
  equipment: ["SSL Console", "Neumann Microphones", "Acoustic Treatment"],
};

const payment: Payment = {
  hourlyRate: 150,
  duration: 2,
};

// ── Detail Row 
const DetailRow = ({ label, value }: { label: string; value: string | number }) => (
  <View className="mb-4">
    <Text className="text-zinc-500 text-sm mb-0.5">{label}</Text>
    <Text className="text-white text-md">{value}</Text>
  </View>
);

// ── Main 
export default function PendingProjectDetails() {
  const router = useRouter();

  const subtotal = payment.hourlyRate * payment.duration;

  return (
    <View className="flex-1 bg-zinc-950">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center gap-3 px-5  pb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color="#ffffff" size={22} />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Project Details</Text>
        </View>

        {/* Booking Details */}
        <View className="mx-5 bg-[#111111] rounded-2xl p-4 mb-4">
          <Text className="text-white font-bold text-base mb-4">Booking Details</Text>
          <DetailRow label="Client Name" value={projectDetails.clientName} />
          <DetailRow label="Time" value={projectDetails.time} />
          <DetailRow label="Date" value={projectDetails.date} />
          <DetailRow label="Project Name" value={projectDetails.projectName} />
          <DetailRow label="Project Description" value={projectDetails.projectDescription} />
          <DetailRow label="Session Type" value={projectDetails.sessionType} />
          <DetailRow label="Number of Attendees" value={projectDetails.attendees} />
          <DetailRow label="Session Notes" value={projectDetails.sessionNotes} />
          <View className="mb-0">
            <Text className="text-zinc-500 text-xs mb-0.5">Additional Notes</Text>
            <Text className="text-white text-sm">{projectDetails.additionalNotes}</Text>
          </View>
        </View>

        {/* Select Studio Room */}
        <View className="mx-5 mb-4">
          <Text className="text-white font-bold text-base mb-3">Select Studio Room</Text>
          <View className="bg-[#111111] rounded-2xl p-4">
            <Text className="text-white font-semibold text-[15px] mb-0.5">{room.name}</Text>
            <Text className="text-zinc-500 text-xs mb-3">{room.type}</Text>

            {/* People */}
            <View className="flex-row items-center gap-1.5 mb-3">
              <Users color="#5B2EFF" size={14} />
              <Text className="text-indigo-400 text-xs">{room.people}</Text>
            </View>

            {/* Equipment tags */}
            <View className="flex-row flex-wrap gap-2">
              {room.equipment.map((eq, i) => (
                <View key={i} className="border border-zinc-700 rounded-full px-3 py-1">
                  <Text className="text-zinc-300 text-xs">{eq}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Payment Summary */}
        <View className="mx-5 bg-[#111111] rounded-2xl p-4">
          <Text className="text-white font-bold text-base mb-4">Payment Summary</Text>

          <View className="flex-row justify-between mb-3">
            <Text className="text-zinc-400 text-sm">Hourly Rate</Text>
            <Text className="text-white text-sm font-medium">${payment.hourlyRate}</Text>
          </View>

          <View className="flex-row justify-between mb-3">
            <Text className="text-zinc-400 text-sm">Duration</Text>
            <Text className="text-white text-sm font-medium">{payment.duration} hours</Text>
          </View>

          <View className="h-px bg-zinc-800 mb-3" />

          <View className="flex-row justify-between">
            <Text className="text-zinc-400 text-sm">Subtotal</Text>
            <Text className="text-white text-sm font-bold">${subtotal}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="absolute bottom-0 left-0 right-0 flex-row gap-3 px-5 pb-8 pt-4 bg-zinc-950  ">
        <TouchableOpacity onPress={()=> router.push("/producer/dashboard")} className="flex-1 bg-indigo-600 rounded-2xl py-4 items-center">
          <Text className="text-white font-semibold text-[15px]">Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-red-950 border border-red-800 rounded-2xl py-4 items-center">
          <Text className="text-red-400 font-semibold text-[15px]">Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}