import { useState, useEffect, useRef } from "react";
import {
  useGetAnalyticsQuery,
  useGetRevenueBreakdownQuery,
} from "@/services/api/analyticsApi";

export type DayData = {
  day: string;
  service: number;
  tips: number;
};

export type AnalyticsData = {
  todayTotal: number;
  todayService: number;
  todayTips: number;
  weekTotal: number;
  weekGrowthPercent: number;
  tipsTotal: number;
  tipsRevenuePercent: number;
  chartData: DayData[];
  years: string[];
  months: string[];
};

type UseAnalyticsReturn = {
  data: AnalyticsData | null;
  initialLoading: boolean; // true only during first load
  refreshing: boolean; // true during subsequent refetches
  error: string | null;
  refetch: () => void;
};

export const useAnalytics = (
  selectedYear?: string,
  selectedMonthLabel?: string,
): UseAnalyticsReturn => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFirstLoad = useRef(true);

  // Consistent month mapping (all "MMM 01")
  const monthMap: Record<string, string> = {
    "Jan 01": "01",
    "Feb 01": "02",
    "Mar 01": "03",
    "Apr 01": "04",
    "May 01": "05",
    "Jun 01": "06",
    "Jul 01": "07",
    "Aug 01": "08",
    "Sep 01": "09",
    "Oct 01": "10",
    "Nov 01": "11",
    "Dec 01": "12",
  };

  const getApiMonth = (): string | undefined => {
    if (!selectedMonthLabel) return monthMap["Jan 01"];
    return monthMap[selectedMonthLabel];
  };
  const apiMonth = getApiMonth();

  // RTK Query hooks with loading states
  const {
    data: analyticsResponse,
    error: analyticsError,
    isLoading: analyticsLoading,
    refetch: refetchAnalytics,
  } = useGetAnalyticsQuery(undefined);

  const {
    data: revenueResponse,
    error: revenueError,
    isLoading: revenueLoading,
    refetch: refetchRevenue,
  } = useGetRevenueBreakdownQuery(
    { year: selectedYear || "2025", month: apiMonth! },
    { skip: !selectedYear || !apiMonth },
  );

  // Combined loading state
  const queriesLoading = analyticsLoading || revenueLoading;

  // Fetch & map data
  useEffect(() => {
    if (queriesLoading) return; // Wait until both queries settle

    const fetchData = async () => {
      try {
        setError(null);
        if (isFirstLoad.current) setInitialLoading(true);
        else setRefreshing(true);

        if (analyticsError || revenueError) {
          throw new Error("Failed to load analytics data.");
        }

        if (analyticsResponse?.data) {
          const chartData: DayData[] = [];
          if (revenueResponse?.data) {
            Object.entries(revenueResponse.data).forEach(([day, val]) => {
              const { service = 0, tips = 0 } = val as {
                service?: number;
                tips?: number;
              };
              chartData.push({ day, service, tips });
            });
          }

          const mapped: AnalyticsData = {
            todayTotal: analyticsResponse.data.todaysEarning.total,
            todayService: analyticsResponse.data.todaysEarning.service,
            todayTips: analyticsResponse.data.todaysEarning.tips,
            weekTotal: analyticsResponse.data.thisWeek.totalEarning,
            weekGrowthPercent: analyticsResponse.data.thisWeek.growthPercentage,
            tipsTotal: analyticsResponse.data.tips.totalTips,
            tipsRevenuePercent:
              analyticsResponse.data.tips.tipsPercentageComparetotalEarning,
            chartData,
            years: ["2022", "2023", "2024", "2025", "2026"],
            months: Object.keys(monthMap),
          };

          setData(mapped);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setInitialLoading(false);
        setRefreshing(false);
        isFirstLoad.current = false;
      }
    };

    fetchData();
  }, [
    queriesLoading,
    analyticsResponse,
    revenueResponse,
    analyticsError,
    revenueError,
  ]);

  const refetch = () => {
    refetchAnalytics();
    refetchRevenue();
  };

  return { data, initialLoading, refreshing, error, refetch };
};
