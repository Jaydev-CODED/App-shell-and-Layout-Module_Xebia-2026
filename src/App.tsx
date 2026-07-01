import {
  Card,
  Badge,
  Avatar,
  EmptyState,
  ErrorState,
  Table,
} from "./components";

import xebiaLogo from "./assets/xebia-logo.png";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(true);

  return (
    <main className="app">
      <img
        src={xebiaLogo}
        alt="Xebia Logo"
        className="logo"
      />

      <h1>University Dashboard Design System</h1>

      <p className="subtitle">
        Reusable UI Components built for the University Dashboard.
      </p>

      <section className="demo-section">
        <h2>📦 Card</h2>

        <Card
          title="Student Dashboard"
          subtitle="University Management System"
        >
          Welcome to the University Dashboard Design System 🚀
        </Card>
      </section>

      <section className="demo-section">
        <h2>🏷️ Badge</h2>

        <div className="demo-row">
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="danger">Failed</Badge>
          <Badge variant="info">New</Badge>
        </div>
      </section>

      <section className="demo-section">
        <h2>👤 Avatar</h2>

        <div className="demo-row">
          <Avatar initials="SS" size="sm" />
          <Avatar initials="SS" size="md" />
          <Avatar initials="SS" size="lg" />
        </div>
      </section>

      <section className="demo-section">
        <h2>📂 Empty State</h2>

        <EmptyState
          title="No Students Found"
          description="There are currently no students in the system."
        />
      </section>

      <section className="demo-section">
        <h2>⚠️ Error State</h2>

        <ErrorState
          title="Something went wrong"
          description="Unable to load student records."
          action={
            <button className="demo-button">
              Retry
            </button>
          }
        />
      </section>

      <section className="demo-section">
        <h2>📋 Table</h2>

        <Table
          columns={["Name", "Email", "Role"]}
          data={[
            [
              "John Doe",
              "john@example.com",
              <Badge variant="success">Student</Badge>,
            ],
            [
              "Jane Smith",
              "jane@example.com",
              <Badge variant="warning">Faculty</Badge>,
            ],
            [
              "Alex Brown",
              "alex@example.com",
              <Badge variant="info">Admin</Badge>,
            ],
          ]}
        />
      </section>

      <footer
        style={{
          marginTop: "4rem",
          textAlign: "center",
          color: "var(--color-text-muted)",
        }}
      >
        University Dashboard Design System • Reusable Components
      </footer>
    </main>
  );
}

export default App;