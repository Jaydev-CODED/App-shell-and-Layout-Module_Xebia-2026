export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
}