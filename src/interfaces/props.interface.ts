interface MarkSlotProps {
  status: "marked" | "notMarked" | "late";
  showTime?: boolean;
  markTime?: string;
}
interface FiltersModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export { MarkSlotProps, FiltersModalProps };
