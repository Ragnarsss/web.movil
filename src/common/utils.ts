import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(date: Date | null): string | null {
  if (date === null) {
    return null;
  }
  return format(new Date(date), "dd/MM/yyyy");
}

export function formatDateTime(date: Date | null): string | null {
  if (date === null) {
    return null;
  }
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
}

export function formatEsDate(date: Date | null): string | null {
  if (date === null) {
    return null;
  }
  // Utiliza la localización como segundo argumento si necesitas español
  return format(new Date(date), "dd-MMM yyyy", { locale: es });
}

export function formatHours(date: Date | null): string | null {
  if (date === null) {
    return null;
  }
  // Utiliza la localización como segundo argumento si necesitas español
  return format(new Date(date), "HH:mm", { locale: es });
}
