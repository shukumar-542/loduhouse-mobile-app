import { baseApi } from "./baseApi";

// ─── Types ────────────────────────────────────────────────────────────────

interface RevenueDayData {
  service: number;
  tips: number;
  total: number;
}

interface RevenueBreakdownData {
  [day: string]: RevenueDayData | {}; // API returns empty objects for days with no data
}

interface RevenueBreakdownResponse {
  success: boolean;
  message: string;
  data: RevenueBreakdownData;
}

// ─── Existing Analytics Types ──────────────────────────────────────────────

interface EarningsData {
  total: number;
  service: number;
  tips: number;
}

interface ThisWeekData {
  totalEarning: number;
  growthPercentage: number;
}

interface TipsData {
  totalTips: number;
  tipsPercentageComparetotalEarning: number;
}

interface AnalyticsData {
  todaysEarning: EarningsData;
  thisWeek: ThisWeekData;
  tips: TipsData;
}

interface AnalyticsResponse {
  success: boolean;
  message: string;
  data: AnalyticsData;
}

// ─── API ──────────────────────────────────────────────────────────────────

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // General Analytics
    getAnalytics: builder.query<AnalyticsResponse, void>({
      query: () => ({
        url: "/analytics",
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),

    // Revenue Breakdown for a specific month/year
    getRevenueBreakdown: builder.query<
      RevenueBreakdownResponse,
      { year: string; month: string }
    >({
      query: ({ year, month }) => ({
        url: `/analytics/revenue-breakdown?year=${year}&month=${month}`,
        method: "GET",
      }),
      providesTags: ["RevenueBreakdown"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAnalyticsQuery, useGetRevenueBreakdownQuery } =
  analyticsApi;
