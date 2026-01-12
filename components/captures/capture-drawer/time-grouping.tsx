import { CaptureItem } from "@/store/capture-store"

export function groupCapturesByTime(captures: CaptureItem[]) {
  const now = new Date()

  // Normalize boundaries to start-of-day
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfYesterday = new Date(startOfToday)
  startOfYesterday.setDate(startOfToday.getDate() - 1)

  const startOfLast7Days = new Date(startOfToday)
  startOfLast7Days.setDate(startOfToday.getDate() - 7)

  const startOfLast30Days = new Date(startOfToday)
  startOfLast30Days.setDate(startOfToday.getDate() - 30)

  const groups: Record<string, CaptureItem[]> = {
    Today: [],
    Yesterday: [],
    "Last 7 Days": [],
    "Last 30 Days": [],
    Older: [],
  }

  for (const capture of captures) {
    const createdAt = new Date(capture.createdAt)

    if (createdAt >= startOfToday) {
      groups.Today.push(capture)
    } else if (createdAt >= startOfYesterday) {
      groups.Yesterday.push(capture)
    } else if (createdAt >= startOfLast7Days) {
      groups["Last 7 Days"].push(capture)
    } else if (createdAt >= startOfLast30Days) {
      groups["Last 30 Days"].push(capture)
    } else {
      groups.Older.push(capture)
    }
  }

  return groups
}
