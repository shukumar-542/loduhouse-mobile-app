import { View, Text, TextInput } from "react-native";
import { FileText } from "lucide-react-native";

type Props = {
  policy: string;
  onChange: (text: string) => void;
};

export default function StepPolicies({ policy, onChange }: Props) {
  return (
    <View className="gap-4">
      <View className="bg-zinc-900 rounded-2xl p-4">
        <View className="flex-row items-center gap-2 mb-3">
          <FileText color="#5B2EFF" size={20} />
          <Text className="text-white font-semibold">Add Custom Policy</Text>
        </View>
        <TextInput
          className="bg-zinc-950 text-white rounded-xl px-4 py-3 text-sm"
          placeholder="e.g. No smoking allowed in studio."
          placeholderTextColor="#6b7280"
          multiline
          numberOfLines={6}
          value={policy}
          onChangeText={onChange}
          style={{ textAlignVertical: "top", minHeight: 120 }}
        />
      </View>
    </View>
  );
}