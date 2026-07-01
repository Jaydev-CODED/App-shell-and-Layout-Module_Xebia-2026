import { useState } from "react";
import styles from "./Tabs.module.css";
import type { TabsProps } from "./types";

export function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  const currentTab = tabs.find(
    (tab) => tab.id === activeTab
  );

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {currentTab?.content}
      </div>
    </div>
  );
}
