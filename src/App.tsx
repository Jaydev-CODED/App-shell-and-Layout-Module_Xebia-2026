import { useState } from "react";
import { Modal } from "./components/ui/overlay/Modal";
import { Toast } from "./components/ui/overlay/Toast";
import { Tabs } from "./components/ui/Tabs";
import { Skeleton } from "./components/ui/feedback/Skeleton";
import "./App.css";
import {
  breakpoints,
  colorPalette,
  radius,
  shadows,
  spacing,
  typography,
} from "./styles";

const tokenSections = [
  {
    title: "Color Palette",
    items: [
      { label: "Neutral 900", value: colorPalette.neutral[900] },
      { label: "Brand 500", value: colorPalette.brand[500] },
      { label: "Accent 500", value: colorPalette.accent[500] },
      { label: "Success", value: colorPalette.semantic.success },
    ],
  },
  {
    title: "Typography",
    items: [
      { label: "Sans", value: typography.fontFamily.sans },
      { label: "Mono", value: typography.fontFamily.mono },
      { label: "Base Size", value: typography.fontSize.base },
      { label: "Heading Size", value: typography.fontSize["3xl"] },
    ],
  },
  {
    title: "Spacing & Radius",
    items: [
      { label: "Space 4", value: spacing[4] },
      { label: "Space 8", value: spacing[8] },
      { label: "Radius MD", value: radius.md },
      { label: "Radius XL", value: radius.xl },
    ],
  },
  {
    title: "Shadows & Breakpoints",
    items: [
      { label: "Shadow MD", value: shadows.md },
      { label: "Breakpoint MD", value: breakpoints.md },
      { label: "Breakpoint LG", value: breakpoints.lg },
    ],
  },
] as const;
const demoTabs = [
  {
    id: "overview",
    label: "Overview",
    content: <p>Overview Content</p>,
  },
  {
    id: "students",
    label: "Students",
    content: <p>Students Content</p>,
  },
  {
    id: "settings",
    label: "Settings",
    content: <p>Settings Content</p>,
  },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(true);

  return (
    <main className="app-shell">
      <section className="hero-panel surface-card">
        <div className="hero-content">
          <p className="eyebrow">Design System Foundation</p>
          <h1>University Dashboard UI Theme</h1>
          <p className="hero-copy">
            Shared tokens, global styles, and utility classes are now available
            for the component team to build on.
          </p>
        </div>
      </section>

      <button onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        title="Test Modal"
        onClose={() => setIsModalOpen(false)}
      >
        <p>Hello Aditya 👋</p>
      </Modal>
      {showToast && (
  <Toast
    message="Data saved successfully!"
    type="success"
    duration={3000}
    onClose={() => setShowToast(false)}
  />
)}
<Tabs tabs={demoTabs} />
<div style={{ margin: "20px 0" }}>
  <Skeleton width="300px" height="20px" />
  <br />
  <Skeleton width="250px" height="20px" />
  <br />
  <Skeleton width="350px" height="20px" />
</div>

      <section className="token-grid grid-responsive">
        {tokenSections.map((section) => (
          <article key={section.title} className="surface-card panel">
            <h2>{section.title}</h2>

            <div className="stack-sm">
              {section.items.map((item) => (
                <div key={item.label} className="token-row">
                  <span>{item.label}</span>
                  <code>{item.value}</code>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;