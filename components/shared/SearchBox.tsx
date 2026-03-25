import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Search, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import useGetSearchedResult, {
  SearchMode,
} from "@/services/hooks/home/useGetSearchedResult";

interface SearchBoxProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmitSearch?: () => void;
  mode?: SearchMode;
}

const SearchBox = ({
  placeholder,
  value,
  onChangeText,
  onSubmitSearch,
  mode = "clients",
}: SearchBoxProps) => {
  const router = useRouter();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(value), 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  const { results, isFetching } = useGetSearchedResult(debouncedQuery, mode);

  useEffect(() => {
    const show = debouncedQuery.trim().length >= 1 && results.length > 0;
    setShowSuggestions(show);
  }, [results, debouncedQuery]);

  const handleClear = () => {
    onChangeText("");
    setShowSuggestions(false);
    setDebouncedQuery("");
  };

  const handleSelectClient = (id: string, name: string) => {
    onChangeText(name);
    setShowSuggestions(false);
    router.push({ pathname: "/client/clientProfile", params: { id } });
  };

  const handleSelectVisit = (id: string, serviceType: string) => {
    onChangeText(serviceType);
    setShowSuggestions(false);
    router.push(`/client/visitDetails?id=${id}`);
  };

  const screenHeight = Dimensions.get("window").height;
  const dropdownMaxHeight = Math.min(screenHeight * 0.4, 320);

  return (
    <View style={{ zIndex: 999 }}>
      {/* Search Input */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          height: 64,
          borderWidth: 1,
          borderColor: showSuggestions ? "#C9A367" : "#4F4F59",
          borderRadius: showSuggestions ? 16 : 16,
          borderBottomLeftRadius: showSuggestions ? 0 : 16,
          borderBottomRightRadius: showSuggestions ? 0 : 16,
          backgroundColor: "#101012",
          zIndex: 1000,
        }}
      >
        {isFetching ? (
          <ActivityIndicator
            size="small"
            color="#F1F1F2"
            style={{ marginRight: 8 }}
          />
        ) : (
          <Search size={22} color="#F1F1F2" style={{ marginRight: 8 }} />
        )}
        <TextInput
          style={{ flex: 1, color: "#F1F1F2", fontSize: 16, height: "100%" }}
          placeholder={placeholder}
          placeholderTextColor="#3f3f46"
          value={value}
          onChangeText={(t) => {
            onChangeText(t);
            if (t.trim().length === 0) setShowSuggestions(false);
          }}
          onSubmitEditing={onSubmitSearch}
          returnKeyType="search"
          cursorColor="#F1F1F2"
          selectionColor="#6366f1"
          autoCapitalize="none"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <X size={18} color="#6B6B8A" />
          </TouchableOpacity>
        )}
      </View>

      {/* Inline Dropdown — sits directly below input, no overlay */}
      {showSuggestions && (
        <View
          style={{
            backgroundColor: "#101012",
            borderWidth: 1,
            borderTopWidth: 0,
            borderColor: "#F1F1F2",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            maxHeight: dropdownMaxHeight,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.5,
            shadowRadius: 12,
            elevation: 20,
            overflow: "hidden",
            zIndex: 999,
          }}
        >
          <FlatList
            data={results}
            keyExtractor={(item: any) => item._id}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: any }) => {
              if (mode === "clients") {
                return (
                  <TouchableOpacity
                    onPress={() => handleSelectClient(item._id, item.fullName)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: "#1e1e2a",
                    }}
                  >
                    {item.picture ? (
                      <Image
                        source={{ uri: item.picture }}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          marginRight: 12,
                          backgroundColor: "#2a2a35",
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          marginRight: 12,
                          backgroundColor: "#2a2a35",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: "#F1F1F2", fontWeight: "700" }}>
                          {item.fullName?.[0] ?? "?"}
                        </Text>
                      </View>
                    )}
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 14,
                          fontWeight: "600",
                        }}
                      >
                        {item.fullName}
                      </Text>
                      <Text
                        style={{ color: "#6B6B8A", fontSize: 12, marginTop: 1 }}
                      >
                        {item.email}
                      </Text>
                    </View>
                    <Search size={14} color="#F1F1F2" />
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  onPress={() => handleSelectVisit(item._id, item.serviceType)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: "#4F4F59",
                  }}
                >
                  {item.photos?.[0] ? (
                    <Image
                      source={{ uri: item.photos[0] }}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        marginRight: 12,
                        backgroundColor: "#2a2a35",
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        marginRight: 12,
                        backgroundColor: "#2a2a35",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Search size={16} color="#F1F1F2" />
                    </View>
                  )}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {item.serviceType}
                    </Text>
                    <Text
                      style={{ color: "#6B6B8A", fontSize: 12, marginTop: 1 }}
                    >
                      {item.clientName} •{" "}
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Text>
                  </View>
                  <Search size={14} color="#F1F1F2" />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBox;
