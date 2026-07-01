import { useState } from "react";
import styles from "./Tabs.module.css";
import type { TabsProps } from "./types";

export function Tabs({ tabs, activeTabId, onTabChange, className = "" }: TabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id);
  const activeId = activeTabId !== undefined ? activeTabId : internalActiveTab;

  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  const currentTab = tabs.find((tab) => tab.id === activeId);

  return (
    <div className={`${styles.tabsContainer} ${className}`}>
      <div className={styles.tabList} role="tablist" aria-label="Tabs navigation">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              className={`${styles.tab} ${isActive ? styles.active : ""} font-label-md`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`panel-${activeId}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeId}`}
        className={styles.content}
      >
        {currentTab?.content}
      </div>
    </div>
  );
}
