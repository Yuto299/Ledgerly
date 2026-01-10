import { useQuery } from "@tanstack/react-query";

interface Alert {
  id: string;
  invoiceNumber: string | null;
  dueAt: Date;
  totalAmount: number;
  paidAmount: number;
  customer: {
    name: string;
  };
  project: {
    name: string;
  } | null;
}

interface AlertsData {
  overdue: Alert[];
  upcoming: Alert[];
  urgent: Alert[];
  summary: {
    overdueCount: number;
    upcomingCount: number;
    urgentCount: number;
    overdueAmount: number;
  };
}

async function fetchAlerts(): Promise<AlertsData> {
  const response = await fetch("/api/alerts");
  if (!response.ok) {
    throw new Error("Failed to fetch alerts");
  }
  const data = await response.json();

  // 日付を Date オブジェクトに変換
  return {
    overdue: data.overdue.map((item: Alert) => ({
      ...item,
      dueAt: new Date(item.dueAt),
    })),
    upcoming: data.upcoming.map((item: Alert) => ({
      ...item,
      dueAt: new Date(item.dueAt),
    })),
    urgent: data.urgent.map((item: Alert) => ({
      ...item,
      dueAt: new Date(item.dueAt),
    })),
    summary: data.summary,
  };
}

export function useAlerts() {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: fetchAlerts,
    staleTime: 5 * 60 * 1000, // 5分間キャッシュ
  });
}
