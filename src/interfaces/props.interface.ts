import { User } from "./apiModels.interface";

import { ReactNode } from "react";

interface MarkSlotProps {
  status: "marked" | "notMarked" | "late";
  showTime?: boolean;
  markTime?: string;
}
interface FiltersModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DaySlotProps {
  WeekDay: string;
}

interface AuthContextProps {
  isLoading: boolean;
  refreshToken: string | null;
  user: User | null;
  authToken: string | null;
  register: (userName: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export {
  MarkSlotProps,
  FiltersModalProps,
  DaySlotProps,
  AuthContextProps,
  AuthProviderProps,
};
