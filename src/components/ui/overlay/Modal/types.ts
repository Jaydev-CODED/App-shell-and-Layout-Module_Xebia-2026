export interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
  className?: string;
}