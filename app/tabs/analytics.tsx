import React, { useState, useEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView, Text } from "react-native";
import { useAnalytics } from "@/services/hooks/analytics/useAnalytics";
import AnalyticsBoxes from "@/components/Analytics/AnalyticsBoxes";
import AnalyticsHeader from "@/components/Analytics/AnalyticsHeader";
import RevenueChart from "@/components/Analytics/RevenueChart";
import AnalyticsSkeleton from "@/constants/skeletons/AnalyticsSkeleton";

const Analytics = () => {
  // Get current year and month in the format your hook expects (e.g., "2025", "Jun 05")
  const getCurrentYear = () => new Date().getFullYear().toString();
  const getCurrentMonth = () => {
    const now = new Date();
    const month = now.toLocaleString("default", { month: "short" }); // "Jun"
    const day = "01"; 
    return `${month} ${day}`;
  };

  const [selectedYear, setSelectedYear] = useState(getCurrentYear());
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const { data, initialLoading, error } = useAnalytics(
    selectedYear,
    selectedMonth,
  );

  // If the current month isn't in the available months list, fallback to first month
  useEffect(() => {
    if (data?.months && !data.months.includes(selectedMonth)) {
      setSelectedMonth(data.months[0]);
    }
  }, [data]);

  if (initialLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0D0A15" }}>
        <AnalyticsSkeleton />
      </View>
    );
  }

  if (error && !data) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0D0A15",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 32,
        }}
      >
        <Text
          style={{
            color: "#B8974A",
            fontSize: 14,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0A15" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              paddingTop: 52,
              paddingBottom: 32,
            }}
          >
            <AnalyticsHeader
              title="Analytics"
              subtitle="Performance overview"
            />

            {data && (
              <AnalyticsBoxes
                todayTotal={data.todayTotal}
                todayService={data.todayService}
                todayTips={data.todayTips}
                weekTotal={data.weekTotal}
                weekGrowthPercent={data.weekGrowthPercent}
                tipsTotal={data.tipsTotal}
                tipsRevenuePercent={data.tipsRevenuePercent}
              />
            )}

            {data && (
              <RevenueChart
                chartData={data.chartData}
                years={data.years}
                months={data.months}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                onYearChange={setSelectedYear}
                onMonthChange={setSelectedMonth}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Analytics;
