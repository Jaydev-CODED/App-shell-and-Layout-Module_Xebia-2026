export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}