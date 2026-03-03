import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { DayData } from "@/services/hooks/analytics/useAnalytics";

// Colors
const CARD_BG = "#101012";
const CARD_BORDER = "#4F4F59";
const SERVICE_COLOR = "#C9A367";
const TIPS_COLOR = "#fff";
const SERVICE_DIM = "#C9A367";
const TIPS_DIM = "#FFFFFF";
const LABEL_COLOR = "#6B6B8A";
const TOOLTIP_BG = "#101012";

const BAR_MAX_HEIGHT = 150;
const BAR_WIDTH = 48;
const TOOLTIP_OFFSET = 50; // Increased offset to ensure tooltip visibility

type Props = {
  chartData: DayData[];
  years: string[];
  months: string[];
  selectedYear: string;
  selectedMonth: string;
  onYearChange: (y: string) => void;
  onMonthChange: (m: string) => void;
};

// Clean month string: extract only the month name (e.g., "Jun 05" → "Jun")
const cleanMonthString = (month: string): string => {
  return month.split(" ")[0];
};

const Dropdown = ({
  value,
  options,
  onSelect,
}: {
  value: string;
  options: string[];
  onSelect: (val: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
          backgroundColor: "#101012",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.12)",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "500" }}>
          {value}
        </Text>
        <Text style={{ color: LABEL_COLOR, fontSize: 10 }}>▾</Text>
      </Pressable>
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)" }}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  position: "absolute",
                  top: "33%",
                  left: "18%",
                  right: "18%",
                  backgroundColor: "#101012",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.1)",
                  maxHeight: 250,
                  overflow: "hidden",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.7,
                  shadowRadius: 24,
                  elevation: 24,
                }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  {options.map((opt) => {
                    const isActive = opt === value;
                    return (
                      <TouchableOpacity
                        key={opt}
                        onPress={() => {
                          onSelect(opt);
                          setOpen(false);
                        }}
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 13,
                          borderBottomWidth: 1,
                          borderBottomColor: "rgba(255,255,255,0.05)",
                          backgroundColor: isActive
                            ? "rgba(184,151,74,0.1)"
                            : "transparent",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: isActive ? "600" : "400",
                            color: isActive ? SERVICE_COLOR : "#B0A8C0",
                          }}
                        >
                          {opt}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const RevenueChart = ({
  chartData,
  years,
  months,
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const maxValue = Math.max(...chartData.map((d) => d.service + d.tips), 1);

  // Scroll to the end (last items) when data changes
  useEffect(() => {
    if (scrollViewRef.current && chartData.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }, 100);
    }
  }, [chartData]);

  return (
    <View
      style={{
        backgroundColor: CARD_BG,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: CARD_BORDER,
        padding: 16,
        overflow: "visible", // Crucial for Android to allow tooltip overflow
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 15,
            fontWeight: "600",
            letterSpacing: -0.2,
          }}
        >
          Revenue Breakdown
        </Text>
        <View style={{ flexDirection: "row", gap: 6 }}>
          <Dropdown
            value={selectedYear}
            options={years}
            onSelect={onYearChange}
          />
          <Dropdown
            value={cleanMonthString(selectedMonth)}
            options={months.map(cleanMonthString)}
            onSelect={(displayValue) => {
              const original =
                months.find((m) => cleanMonthString(m) === displayValue) ||
                displayValue;
              onMonthChange(original);
            }}
          />
        </View>
      </View>

      {/* Legend */}
      <View style={{ flexDirection: "row", gap: 14, marginBottom: 18 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: SERVICE_COLOR,
            }}
          />
          <Text style={{ color: LABEL_COLOR, fontSize: 11 }}>Service</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: TIPS_COLOR,
            }}
          />
          <Text style={{ color: LABEL_COLOR, fontSize: 11 }}>Tips</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          height: BAR_MAX_HEIGHT + 80, 
          overflow: "hidden",
        }}
        contentContainerStyle={{
          alignItems: "flex-end",
          paddingHorizontal: 32, 
          paddingRight: 48, 
          paddingTop: 40,
        }}
      >
        {chartData.map((item, index) => {
          const total = item.service + item.tips;
          const totalH = (total / maxValue) * BAR_MAX_HEIGHT;
          const tipsH = (item.tips / total) * totalH || 0;
          const serviceH = totalH - tipsH;
          const isSelected = selectedIndex === index;

          return (
            <Pressable
              key={item.day}
              onPress={() => setSelectedIndex(index)}
              style={{
                alignItems: "center",
                width: BAR_WIDTH,
                marginHorizontal: 2,
              }}
            >
              {isSelected && (
                <View
                  style={{
                    position: "absolute",
                    bottom: BAR_MAX_HEIGHT - totalH + TOOLTIP_OFFSET,
                    backgroundColor: TOOLTIP_BG,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    zIndex: 10,
                    minWidth: 108,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.1)",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                    elevation: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: "700",
                      marginBottom: 3,
                    }}
                  >
                    {item.day}
                  </Text>
                  <Text
                    style={{
                      color: SERVICE_COLOR,
                      fontSize: 11,
                      fontWeight: "500",
                    }}
                  >
                    Service: {item.service}
                  </Text>
                  <Text
                    style={{
                      color: TIPS_COLOR,
                      fontSize: 11,
                      fontWeight: "500",
                    }}
                  >
                    Tips: {item.tips}
                  </Text>
                </View>
              )}

              <View
                style={{
                  width: 26,
                  height: totalH,
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    height: tipsH,
                    backgroundColor: isSelected ? TIPS_COLOR : TIPS_DIM,
                    width: "100%",
                  }}
                />
                <View
                  style={{
                    height: serviceH,
                    backgroundColor: isSelected ? SERVICE_COLOR : SERVICE_DIM,
                    width: "100%",
                  }}
                />
              </View>

              <Text
                style={{
                  color: isSelected ? "#FFFFFF" : LABEL_COLOR,
                  fontSize: 11,
                  marginTop: 7,
                  fontWeight: isSelected ? "500" : "400",
                }}
              >
                {item.day}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default RevenueChart;
