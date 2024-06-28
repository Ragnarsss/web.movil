import { format } from "date-fns";

export function formatDate(date: Date | null): string | null {
  if (date === null) {
    return null;
  }
  return format(new Date(date), "yyyy-MM-dd");
}

export function formatDateTime(date: Date | null): string | null {
  if (date === null) {
    return null;
  }
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
}
