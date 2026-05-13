// app/(studio)/create-studio.tsx

import {
    View, Text, TextInput, TouchableOpacity,
    ScrollView, KeyboardAvoidingView, Platform,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ArrowLeft, Building2, FileText, Image, MapPin, Upload, User } from "lucide-react-native";
import FormCard from "@/components/shared/FormCard";
import Field from "@/components/shared/TextField";
import AddEquipmentModal from "@/components/AddEquipmentModal/AddEquipmentModal";
import StepPricing, { defaultSchedule } from "@/components/AddEquipmentModal/StepPricing";
import StepPolicies from "@/components/AddEquipmentModal/StepPolicies";

// ── Types
type FormData = {
    studioName: string;
    description: string;
    location: string;
    photos: string[];
    equipments: Equipment[];
    policy: string;
    hourlyRate: string;
    schedule: typeof defaultSchedule;
};

type Equipment = {
    name: string;
    category: string;
};

const TOTAL_STEPS = 5;

// ── Progress Bar 
const ProgressBar = ({ step }: { step: number }) => (
    <View className="flex-row gap-1.5 mt-2 mb-6">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View
                key={i}
                className={`h-1 flex-1 rounded-full ${i < step ? "bg-[#5B2EFF]" : "bg-zinc-700"
                    }`}
            />
        ))}
    </View>
);

// ── Step 1: Basic Information 
const StepBasicInfo = ({
    data,
    onChange,
}: {
    data: FormData;
    onChange: (key: keyof FormData, value: string) => void;
}) => (
    <View>
        <FormCard title="Studio Name" icon={<Building2 color="#5B2EFF" size={22} />}>
            <Field
                placeholder="e.g. Loud House Premium Studio"
                value={data.studioName}
                onChangeText={(v) => onChange("studioName", v)}
            />
        </FormCard>

        <FormCard title="Studio Description" icon={<FileText color="#5B2EFF" size={22} />}>
            <Field
                placeholder="Describe your studio"
                value={data.description}
                onChangeText={(v) => onChange("description", v)}
                multiline
            />
        </FormCard>

        <FormCard title="Location" icon={<MapPin color="#5B2EFF" size={22} />}>
            <Field
                placeholder="Address"
                value={data.location}
                onChangeText={(v) => onChange("location", v)}
            />
        </FormCard>
    </View>
);

// ── Step 2: Studio Gallery
const StepGallery = ({ photos }: { photos: string[] }) => (
    <View className="gap-4 ">
        {/* Upload Box */}
        <TouchableOpacity className="bg-zinc-900 rounded-2xl items-center justify-center py-12 border border-dashed border-zinc-700">
            <Text className="text-4xl mb-3 bg-[#5B2EFF33] p-4 rounded-full"><Upload size={40} color={"#5B2EFF"} /></Text>
            <Text className="text-white font-semibold text-2xl">Click to upload photos</Text>
            <Text className="text-zinc-500 text-xs mt-1">PNG, JPG up to 10MB each</Text>
        </TouchableOpacity>

        {/* Count */}
        <View className="flex-row justify-between">
            <Text className="text-zinc-400 text-sm">{photos.length} Images uploaded</Text>
            {photos.length < 4 && (
                <Text className="text-red-400 text-sm">
                    {4 - photos.length} more required
                </Text>
            )}
        </View>

        {/* Tips */}
        <View className="border border-[#5B2EFF] rounded-2xl p-4 gap-1.5">
            <View className="flex-row items-center gap-2 mb-2">
                <Image color={"#5B2EFF"} />
                <Text className="text-[#5B2EFF] text-xl flex-row font-semibold ">Photo Tips:</Text>
            </View>
            {[
                "Use well-lit, high-resolution images",
                "Show different angles of your studio",
                "Highlight your best equipment",
                "Keep images professional and clean",
            ].map((tip, i) => (
                <Text key={i} className="text-[#5B2EFF] text-sm ml-8">• {tip}</Text>
            ))}
        </View>
    </View>
);

// ── Step 3: Equipment List  
const StepEquipment = ({
    equipments,
    onAdd,
}: {
    equipments: Equipment[];
    onAdd: () => void;
}) => (
    <View className="gap-4">
        {/* Add Button */}
        <TouchableOpacity
            onPress={onAdd}
            className="bg-indigo-600 rounded-2xl py-4 items-center flex-row justify-center gap-2"
        >
            <Text className="text-white font-semibold text-sm">+ Add Equipment</Text>
        </TouchableOpacity>

        {/* Count */}
        <View className="flex-row justify-between">
            <Text className="text-zinc-400 text-sm">{equipments.length} equipments added</Text>
            {equipments.length < 3 && (
                <Text className="text-red-400 text-sm">
                    {3 - equipments.length} more required
                </Text>
            )}
        </View>

        {/* Empty State */}
        {equipments.length === 0 && (
            <View className="bg-zinc-900 rounded-2xl items-center justify-center py-12">
                <Text className="text-4xl mb-3">🎵</Text>
                <Text className="text-white font-semibold text-sm">No equipment added yet</Text>
                <Text className="text-zinc-500 text-xs mt-1">Click "Add Equipment" to start</Text>
            </View>
        )}

        {/* Equipment Items */}
        {equipments.map((eq, i) => (
            <View key={i} className="bg-zinc-900 rounded-xl px-4 py-3">
                <Text className="text-white text-sm">{eq.name}</Text>
                <Text className="text-zinc-500 text-xs">{eq.category}</Text>
            </View>
        ))}

        {/* Tip */}
        <View className="bg-indigo-950 border border-indigo-800 rounded-2xl p-4">
            <Text className="text-indigo-300 text-xs">
                💡 Tip: List all your professional equipment to attract more clients.
                Be specific with model names and brands.
            </Text>
        </View>
    </View>
);

// ── Main Component ─────────────────────────────────
export default function CreateStudio() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        studioName: "",
        description: "",
        location: "",
        photos: [],
        equipments: [],
        policy: "",
        hourlyRate: "",
        schedule: defaultSchedule,
    });

    const handleChange = (key: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const stepTitles = ["Basic Information", "Studio Gallery", "Equipment List", "Booking Policies", "Pricing & Availability"];
    const buttonLabels = ["Continue to Gallery", "Continue to Equipment", "Continue to Policies", "Continue to Pricing", "Complete Setup"];

    const handleNext = () => {
        if (step < TOTAL_STEPS) {
            setStep((s) => s + 1);
        } else {
            // Final step — submit API call here
            // console.log("Submit:", formData);
            router.push("/settings/complete");
        } 
    };

    const handleBack = () => {
        if (step > 1) setStep((s) => s - 1);
        else router.back();
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-zinc-950"
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header */}
                <View className="px-5 pt-12 pb-2">
                    <View className="flex-row  gap-4 mb-5 ">
                        <TouchableOpacity onPress={handleBack} className="">
                            <ArrowLeft color="white" size={25} />
                        </TouchableOpacity>
                        <View>
                            <Text className="text-white text-2xl font-bold">{stepTitles[step - 1]}</Text>

                            <Text className="text-zinc-500 text-sm">Step {step} of {TOTAL_STEPS}</Text>
                        </View>
                    </View>
                    <ProgressBar step={step} />

                </View>

                {/* Step Content */}
                <View className="px-5">
                    {step === 1 && <StepBasicInfo data={formData} onChange={handleChange} />}
                    {step === 2 && <StepGallery photos={formData.photos} />}
                    {step === 3 && (
                        <>
                            <AddEquipmentModal
                                visible={modalVisible}
                                onClose={() => setModalVisible(false)}
                                onAdd={(name, category) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        equipments: [...prev.equipments, { name, category }],
                                    }))
                                }
                            />
                            <StepEquipment
                                equipments={formData.equipments}
                                onAdd={() => setModalVisible(true)}
                            />
                        </>
                    )}
                    {step === 4 && (
                        <StepPolicies
                            policy={formData.policy}
                            onChange={(v) => setFormData((prev) => ({ ...prev, policy: v }))}
                        />
                    )}
                    {step === 5 && (
                        <StepPricing
                            hourlyRate={formData.hourlyRate}
                            onRateChange={(v) => setFormData((prev) => ({ ...prev, hourlyRate: v }))}
                            schedule={formData.schedule}
                            onScheduleChange={(day, field, value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    schedule: {
                                        ...prev.schedule,
                                        [day]: { ...prev.schedule[day], [field]: value },
                                    },
                                }))
                            }
                        />
                    )}
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View className="px-5 pb-8 pt-3 bg-zinc-950">
                <TouchableOpacity
                    onPress={handleNext}
                    className="bg-[#5B2EFF] rounded-2xl py-4 items-center"
                >
                    <Text className="text-white font-semibold text-[15px]">
                        {buttonLabels[step - 1]}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}