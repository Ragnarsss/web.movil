import { ReactNode } from "react";
import { entryType, roles } from "../common/enum";
import { BaseResponse } from "./response.interface";

interface MarkSlotProps {
  entryId: number;
  isExpanded: boolean;
  updateComplete: React.Dispatch<React.SetStateAction<boolean>>;
  isComplete: boolean;
  date: string | null;
  entry: string | null;
  exit: string | null;
  user: User;
}
interface FiltersModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DataModalProps {
  name: string;
  timeCards: TimeCardType[];
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
}

interface User {
  userId: string;
  authToken: string;
  refreshToken: string;
  role: string;
  email: string;
  userName?: string;
  lastName?: string;
  firstName?: string;
}

interface ShiftCardProps {
  entry: TimeCardEntryType;
  entryId: number;
}

interface TimeCardEntryType {
  id: number;
  date: Date;
  entry: Date;
  exit: Date;
  user: User;
}

interface TimeCardType {
  id: string;
  user: User;
  userId: number;
  periodStart: Date;
  periodEnd: Date;
  entries: TimeCardEntryType[];
}

interface ProviderProps {
  children: ReactNode;
}

interface TimeCardProps {
  id: string;
  entries: TimeCardEntryType[];
  periodStart: Date;
  periodEnd: Date;
  user: User;
}

interface AuthContextType {
  isLoading: boolean;
  refreshToken: string | null;
  authToken: string | null;
  email: string | null;
  role: roles | null;
  register: (
    userName: string,
    email: string,
    password: string
  ) => Promise<BaseResponse>;
  update: (userData: any) => Promise<BaseResponse>;
  refreshAuthToken: (token: string) => Promise<BaseResponse>;
  login: (email: string, password: string) => Promise<BaseResponse>;
  logout: () => void;
}

interface MarkingContextType {
  entry: Date | null;
  exit: Date | null;
  mark: (id: number, mark: entryType) => Promise<boolean>;
}

export {
  MarkSlotProps,
  FiltersModalProps,
  DataModalProps,
  TimeCardType,
  TimeCardEntryType,
  User,
  AuthContextType,
  MarkingContextType,
  ProviderProps,
  ShiftCardProps,
  TimeCardProps,
};
