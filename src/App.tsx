import { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  Radio,
  Switch,
  Select,
  Badge,
  Alert,
  Toast,
  EmptyState,
  ErrorState,
  Loader,
  Skeleton,
  Tabs,
  Accordion,
  Breadcrumb,
  Pagination,
  Card,
  StatisticCard,
  ProfileCard,
  NewsCard,
  DataTable,
  Modal,
  Drawer,
  DropdownMenu,
  Tooltip,
  BarChart,
  LineChart,
  DonutChart,
  AreaChart,
  Avatar,
} from "./components";
import "./App.css";

// Sample Data for components
const sampleBreadcrumbs = [
  { label: "Lumina UMS", href: "#" },
  { label: "Design System", href: "#" },
  { label: "Components Preview" },
];

const sampleAccordionItems = [
  {
    id: "pre-req",
    title: "Course Prerequisites & Requirements",
    content:
      "Students must have completed Introduction to Computer Science (CS101) with a minimum grade of B-. Concurrent enrollment in Data Structures (CS201) is strongly recommended.",
  },
  {
    id: "readings",
    title: "Required Reading Materials",
    content: "Introduction to Algorithms (4th Edition) by Cormen, Leiserson, Rivest, and Stein.",
  },
  {
    id: "grading",
    title: "Grading Policy & Distribution",
    content: "Assignments: 30%, Midterm: 30%, Final Project: 40%.",
  },
];

const sampleStudentsData = [
  {
    id: "STU-24-091",
    name: "Alex Carter",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5kYHNGCAt1FazWMvJS8v3jklwNG8t1mkMyWkZadbBlkbTsrfMNSJ0QIQMJEFkPYSSSl4nGz1gtuy66pM6drRnKr6YsUo6SM8WDh6zuc-WBrPeHwAR-mRtZrGMhMiiVhAHvsvldqdXNx2dcNTZutW9xAyUdV7Dc6ttRcSuPhgasNxevx80rsi7tpiqSI1hiM-kKo8VciOElKA1pUT4qoxs-NA8QsTG9OmCTROLpKqFbPmcBZbFe3vYAfgD5ks_BycP0i5cAM75Jm3w",
    department: "Computer Science",
    status: <Badge variant="success">Active</Badge>,
    lastActive: "2 hours ago",
  },
  {
    id: "STU-24-042",
    name: "Maria Lopez",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAL_L9KfZjCEXBz9t7U2H_eZ4h9iA-RL_9h-D1DlPKW90JCQqW-AvyGKq31NWbwQRAjCopvpuD5hA76Ly_cokYMM1rcWkdJUxSNrmQAFCc71t3ls_4vZWs-Dj92Qw1jS5bns8ZyQo8stXYwxyBihMDBSkoElCIRihcX1Xh-AAQSqpPK4oPjkCK5r9BAH6zR_p9cRVII2kT7hQ65YjHECY0qOH10JXe2x6YOsDlsDK4Xt1so1cKNhA4Ayp5Dtv0Ca3505qQCG2Xl8jf_",
    department: "Business Admin",
    status: <Badge variant="warning">On Leave</Badge>,
    lastActive: "Yesterday",
  },
  {
    id: "STU-23-118",
    name: "James Wilson",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-nTNzGiYWP_sJVpnZC2JQ3dlj4nn_b5mb9uLlXhx-PuKoyVviCcZXeYcl0wJPVtCUpeL5JIlLHiHML9fkwmjeeAXcqamQMfErQSTyv8Fp5bKRU1pO9v1QisEs8XJUhiqYf_LWepde-ja5hWQ_wVqguxoqDUqLAbnhGxRHEStrwlsotRErHlh1xc0UluACobHgv6iGOv8bJbkCdOt3tEb3kXAygGW3xzTLcQS2heU6VXsJePvNlEIanoChj-SDUWHrtC-nlsOzSFlH",
    department: "Engineering",
    status: <Badge variant="success">Active</Badge>,
    lastActive: "3 days ago",
  },
  {
    id: "STU-24-205",
    name: "Sarah Chen",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiy0HlRuaZ__-IvOzgAwhqEv6ULBzQDs1uFDnd-T-itnrpIRZbOe6EKEtqE7SL8BjMFP11SUrEEBuNQYfLY8nek34rDhB22bBJo3juOPEOsYtB0O375R-4wvTVUHT845ZukjXOmkXwfAwzgB_UOUMYOA6GW2Eoeus1dKgRcvJUOKWo6G9FXY1Zl0OwhtGt2ueICYsamLc5RS-V1AkR5FAMcfsLjHXP-uhE5WCFwEpVWeZpEBlChrcaYQWMdEzkeDfaDaxJim6Gaxom",
    department: "Arts & Humanities",
    status: <Badge variant="danger">Suspended</Badge>,
    lastActive: "1 week ago",
  },
];

const sampleStudentColumns = [
  {
    key: "name",
    header: "Student Name",
    sortable: true,
    render: (row: { name: string; avatar?: string }) => (
      <div className="flex items-center gap-3">
        <Avatar src={row.avatar} alt={row.name} size="sm" />
        <span className="font-body-md font-medium text-on-background">{row.name}</span>
      </div>
    ),
  },
  { key: "id", header: "ID", sortable: true },
  { key: "department", header: "Department", sortable: true },
  { key: "status", header: "Status" },
  { key: "lastActive", header: "Last Active" },
];

const sampleBarData = [
  { label: "Eng", value: 3400 },
  { label: "Bus", value: 2400 },
  { label: "Arts", value: 1600 },
  { label: "Sci", value: 3000 },
  { label: "Law", value: 1200 },
  { label: "Med", value: 2000 },
];

const sampleLineData = [
  { label: "Aug", value: 75 },
  { label: "Sep", value: 90 },
  { label: "Oct", value: 85 },
  { label: "Nov", value: 92 },
  { label: "Dec", value: 88 },
  { label: "Jan", value: 94 },
];

const sampleDonutData = [
  { label: "Tuition Fees", value: 8.5, percentage: 60, subtitle: "$8.5M" },
  { label: "Gov Grants", value: 3.5, percentage: 25, subtitle: "$3.5M" },
  { label: "Donations", value: 2.2, percentage: 15, subtitle: "$2.2M" },
];

const sampleAreaDatasets = [
  { label: "Admin", data: [20, 30, 25, 40, 35, 50, 30, 25], color: "#D3C7F2" },
  { label: "Faculty", data: [40, 70, 50, 80, 70, 90, 60, 45], color: "#9A74D6" },
  { label: "Students", data: [90, 140, 100, 160, 120, 200, 130, 90], color: "#7D4AB4" },
];
const sampleAreaLabels = ["12 AM", "3 AM", "6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"];

function App() {
  // Modal, Drawer, Toast, Dropdown and stand-alone controls states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "warning" | "info">("success");
  const [viewMode, setViewMode] = useState<"tabs" | "all">("tabs");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Selection Inputs State
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [radioVal, setRadioVal] = useState("A");
  const [switchVal, setSwitchVal] = useState(true);
  const [selectVal, setSelectVal] = useState("");

  const triggerToast = (msg: string, type: typeof toastType) => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
  };

  const handleDataTableAction = (row: { name: string }) => {
    triggerToast(`Action clicked for ${row.name}`, "info");
  };

  const dashboardTabs = [
    {
      id: "actions",
      label: "1. Actions & Form Inputs",
      content: (
        <div className="space-y-8">
          {/* Buttons Section */}
          <section className="level-1-card p-6 space-y-4">
            <h3 className="font-headline-md text-headline-md text-primary mb-4 border-b border-surface-variant pb-2">
              Action Buttons
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="space-y-1">
                <span className="font-label-sm block text-[10px] text-text-secondary">PRIMARY</span>
                <Button variant="primary" onClick={() => triggerToast("Primary Button Clicked", "success")}>
                  Submit
                </Button>
              </div>
              <div className="space-y-1">
                <span className="font-label-sm block text-[10px] text-text-secondary">SECONDARY</span>
                <Button variant="secondary" onClick={() => triggerToast("Secondary Button Clicked", "info")}>
                  Cancel
                </Button>
              </div>
              <div className="space-y-1">
                <span className="font-label-sm block text-[10px] text-text-secondary">GHOST</span>
                <Button variant="ghost" onClick={() => triggerToast("Ghost Button Clicked", "info")}>
                  View Details
                </Button>
              </div>
              <div className="space-y-1">
                <span className="font-label-sm block text-[10px] text-text-secondary">DESTRUCTIVE</span>
                <Button variant="destructive" onClick={() => triggerToast("Destructive Button Clicked", "error")}>
                  Delete
                </Button>
              </div>
              <div className="space-y-1">
                <span className="font-label-sm block text-[10px] text-text-secondary">LOADING</span>
                <Button variant="primary" isLoading>
                  Save changes
                </Button>
              </div>
              <div className="space-y-1">
                <span className="font-label-sm block text-[10px] text-text-secondary">DISABLED</span>
                <Button variant="primary" disabled>
                  Submit
                </Button>
              </div>
            </div>
          </section>

          {/* Form Fields Section */}
          <section className="level-1-card p-6 space-y-6">
            <h3 className="font-headline-md text-headline-md text-primary mb-4 border-b border-surface-variant pb-2">
              Text Inputs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="name@university.edu"
                helperText="Please use your institutional university address."
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                helperText="Password must contain at least 8 characters."
              />
              <Input
                label="Search Student"
                type="search"
                placeholder="Search..."
              />
              <Input
                label="Required Input (Error State)"
                placeholder="Invalid entry"
                error="Please enter a valid format."
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <Textarea
                label="Biography / Cover Letter"
                placeholder="Tell us about yourself..."
                helperText="Maximum 500 characters."
              />
            </div>
          </section>

          {/* Selection Controls Section */}
          <section className="level-1-card p-6 space-y-6">
            <h3 className="font-headline-md text-headline-md text-primary mb-4 border-b border-surface-variant pb-2">
              Selection Controls
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <span className="font-label-sm block text-[10px] text-text-secondary">CHECKBOX</span>
                <Checkbox
                  label="Agree to terms"
                  checked={checkboxVal}
                  onChange={(e) => setCheckboxVal(e.target.checked)}
                />
                <Checkbox label="Disabled option" checked disabled />
              </div>

              <div className="space-y-3">
                <span className="font-label-sm block text-[10px] text-text-secondary">RADIO SELECT</span>
                <Radio
                  label="Option A"
                  name="demo-radio"
                  checked={radioVal === "A"}
                  onChange={() => setRadioVal("A")}
                />
                <Radio
                  label="Option B"
                  name="demo-radio"
                  checked={radioVal === "B"}
                  onChange={() => setRadioVal("B")}
                />
              </div>

              <div className="space-y-3">
                <span className="font-label-sm block text-[10px] text-text-secondary">TOGGLE SWITCH</span>
                <Switch
                  label="Email Notifications"
                  checked={switchVal}
                  onChange={(e) => setSwitchVal(e.target.checked)}
                />
                <Switch label="SMS Notifications" disabled checked={false} />
              </div>

              <div className="space-y-3">
                <span className="font-label-sm block text-[10px] text-text-secondary">SELECT</span>
                <Select
                  options={[
                    { value: "cs", label: "Computer Science" },
                    { value: "eng", label: "Engineering" },
                    { value: "math", label: "Mathematics" },
                  ]}
                  value={selectVal}
                  onChange={(e) => setSelectVal(e.target.value)}
                  placeholder="Select Department"
                />
              </div>
            </div>
          </section>
        </div>
      ),
    },
    {
      id: "feedback",
      label: "2. Navigation & Feedback",
      content: (
        <div className="space-y-8">
          {/* Breadcrumb & Accordion & Pagination */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="level-1-card p-6 space-y-6">
              <h3 className="font-headline-md text-headline-md text-primary mb-4 border-b border-surface-variant pb-2">
                Navigation Elements
              </h3>
              <div className="space-y-4">
                <span className="font-label-sm block text-[10px] text-text-secondary">BREADCRUMB</span>
                <Breadcrumb items={sampleBreadcrumbs} />
              </div>
              <div className="space-y-4 pt-4 border-t border-surface-variant/50">
                <span className="font-label-sm block text-[10px] text-text-secondary">ACCORDION</span>
                <Accordion items={sampleAccordionItems} />
              </div>
              <div className="space-y-4 pt-4 border-t border-surface-variant/50">
                <span className="font-label-sm block text-[10px] text-text-secondary">PAGINATION</span>
                <Pagination currentPage={1} totalPages={12} onPageChange={(p) => triggerToast(`Navigated to page ${p}`, "info")} />
              </div>
            </section>

            <section className="level-1-card p-6 space-y-6">
              <h3 className="font-headline-md text-headline-md text-primary mb-4 border-b border-surface-variant pb-2">
                Role & Status Indicators
              </h3>
              <div className="space-y-4">
                <span className="font-label-sm block text-[10px] text-text-secondary">ROLE BADGES</span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="student">Student</Badge>
                  <Badge variant="faculty">Faculty</Badge>
                  <Badge variant="dept-head">Dept Head</Badge>
                  <Badge variant="admin">Admin</Badge>
                  <Badge variant="auditor">Auditor</Badge>
                  <Badge variant="super-admin">Super Admin</Badge>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-surface-variant/50">
                <span className="font-label-sm block text-[10px] text-text-secondary">STATUS BADGES</span>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="font-label-sm text-[11px] text-text-primary">Enrolled</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary-container" />
                    <span className="font-label-sm text-[11px] text-text-primary">Completed</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span className="font-label-sm text-[11px] text-text-primary">Pending</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-error" />
                    <span className="font-label-sm text-[11px] text-text-primary">Suspended</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-surface-variant/50">
                <span className="font-label-sm block text-[10px] text-text-secondary">LOADERS & SKELETONS</span>
                <div className="flex items-center gap-6">
                  <Loader size="sm" label="Loading data..." />
                  <div className="flex-1 space-y-2">
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-surface-variant/50">
                <span className="font-label-sm block text-[10px] text-text-secondary">AVATARS</span>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Avatar initials="JD" size="sm" alt="John Doe Small" />
                    <Avatar initials="JD" size="md" alt="John Doe Medium" />
                    <Avatar initials="JD" size="lg" alt="John Doe Large" />
                    <span className="font-body-sm text-text-secondary">Initials</span>
                  </div>
                  <div className="flex items-center gap-2 border-l border-surface-variant/50 pl-4">
                    <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5kYHNGCAt1FazWMvJS8v3jklwNG8t1mkMyWkZadbBlkbTsrfMNSJ0QIQMJEFkPYSSSl4nGz1gtuy66pM6drRnKr6YsUo6SM8WDh6zuc-WBrPeHwAR-mRtZrGMhMiiVhAHvsvldqdXNx2dcNTZutW9xAyUdV7Dc6ttRcSuPhgasNxevx80rsi7tpiqSI1hiM-kKo8VciOElKA1pUT4qoxs-NA8QsTG9OmCTROLpKqFbPmcBZbFe3vYAfgD5ks_BycP0i5cAM75Jm3w" size="sm" alt="Image Small" />
                    <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5kYHNGCAt1FazWMvJS8v3jklwNG8t1mkMyWkZadbBlkbTsrfMNSJ0QIQMJEFkPYSSSl4nGz1gtuy66pM6drRnKr6YsUo6SM8WDh6zuc-WBrPeHwAR-mRtZrGMhMiiVhAHvsvldqdXNx2dcNTZutW9xAyUdV7Dc6ttRcSuPhgasNxevx80rsi7tpiqSI1hiM-kKo8VciOElKA1pUT4qoxs-NA8QsTG9OmCTROLpKqFbPmcBZbFe3vYAfgD5ks_BycP0i5cAM75Jm3w" size="md" alt="Image Medium" />
                    <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5kYHNGCAt1FazWMvJS8v3jklwNG8t1mkMyWkZadbBlkbTsrfMNSJ0QIQMJEFkPYSSSl4nGz1gtuy66pM6drRnKr6YsUo6SM8WDh6zuc-WBrPeHwAR-mRtZrGMhMiiVhAHvsvldqdXNx2dcNTZutW9xAyUdV7Dc6ttRcSuPhgasNxevx80rsi7tpiqSI1hiM-kKo8VciOElKA1pUT4qoxs-NA8QsTG9OmCTROLpKqFbPmcBZbFe3vYAfgD5ks_BycP0i5cAM75Jm3w" size="lg" alt="Image Large" />
                    <span className="font-body-sm text-text-secondary">Image</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Empty & Error States */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="space-y-3">
              <span className="font-label-sm block text-[10px] text-text-secondary">EMPTY STATE</span>
              <EmptyState title="No Active Courses" description="No active courses found — browse the catalog to enroll in your first course." />
            </section>

            <section className="space-y-3">
              <span className="font-label-sm block text-[10px] text-text-secondary">ERROR STATE</span>
              <ErrorState
                title="System Connection Error"
                description="Unable to sync student records with the central master registrar database."
                action={<Button variant="secondary" size="sm" onClick={() => triggerToast("Retrying sync...", "info")}>Retry Connection</Button>}
              />
            </section>
          </div>

          {/* Alerts & Toasts */}
          <section className="level-1-card p-6 space-y-6">
            <h3 className="font-headline-md text-headline-md text-primary mb-4 border-b border-surface-variant pb-2">
              Alerts & Notifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Alert
                variant="success"
                title="Record Saved Successfully"
                description="The student's transcript has been updated in the master database."
              />
              <Alert
                variant="error"
                title="Failed to Sync Data"
                description="Unable to connect to the financial aid server. Please try again later."
              />
              <Alert
                variant="warning"
                title="Pending Auditor Review"
                description="This semester's grade distribution requires departmental sign-off."
              />
              <Alert
                variant="info"
                title="System Maintenance Scheduled"
                description="The portal will be offline for 2 hours this Sunday at 2:00 AM EST."
              />
            </div>
            <div className="flex justify-center pt-4 border-t border-surface-variant/50">
              <Button variant="secondary" onClick={() => triggerToast("Success Toast Alert!", "success")}>
                Trigger Popover Toast
              </Button>
            </div>
          </section>
        </div>
      ),
    },
    {
      id: "data",
      label: "3. Cards, Tables & Overlays",
      content: (
        <div className="space-y-8">
          {/* Card Showcase */}
          <section className="space-y-4">
            <h3 className="font-headline-md text-headline-md text-primary mb-4 border-b border-surface-variant pb-2">
              Card Components
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Standard Card */}
              <Card title="Standard Card" subtitle="Raised Elevation" elevation="raised">
                <p className="text-text-secondary font-body-sm">
                  A basic layout container utilizing Lumina UMS standard padding elements.
                </p>
              </Card>

              {/* Statistic Card */}
              <StatisticCard
                title="Total Enrollment"
                value="14,208"
                trend="+5.2%"
                trendDirection="up"
                comparisonText="vs. last semester"
                icon={<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>}
              />

              {/* News Card */}
              <NewsCard
                title="Campus Expansion News"
                description="Construction for the new Science & Technology wing begins next month. Expect minor rerouting near the North Gate."
                imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBQIFb8dYN_jZn-3xu5gXtHcqc5jK8cf7IcLzFLVbwkdbIf0NWOBfKFyDZUzBzOxSYnPwX2fM2hV7ZlVDsdcjzNdSZ7WjgtPJE_6yyQI8nskp6tV1X12JcDRPHrtXUK-pbxROS-1dfnWuodr-wCd3VBxJmFAKAmMruC-NYIFiNq8xAyO3K6XNrStBdAGR20FxRhRx7md-xIXivlBi0a6bEDE4_Gb0d26-7dtLKS3BwjIXYfi0BBEYlxGQBMZctLycOX3LIW7EERt3Oy"
                tag="Announcement"
                onActionClick={() => triggerToast("Announcements clicked", "info")}
              />

              {/* Profile Card */}
              <ProfileCard
                name="Dr. Sarah Jenkins"
                role="Dept Head, Computer Science"
                avatarSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCQuGpnk1PeV6ZFJnH-vsWCZOcQ_h5CBtVap8CU1PrEap2DZ_3fwre45zy226tIulkM1WNiuMpKlU8FxlxzRCcQSifK4kd1oPXTXwwZPuvPcpic2LaSDJuz6-P6GqXodiXuNdf0AWE311-MjJyqec8sLzn9NqKeOsSVoCIJ-xubOZQWK2QqZGODIpnHSUNYka_4FoaPfq1jSQDuZftJ-cgPuDdtST0XOiilsRcRzt_r9rig7UsDpTRsy6Mkrz2j4s7qvbKvWwBBkVYH"
                actions={
                  <>
                    <Button variant="secondary" size="sm" onClick={() => triggerToast("Message Jenkins", "info")}>
                      <span className="material-symbols-outlined text-[18px]">mail</span> Message
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => triggerToast("Schedule with Jenkins", "success")}>
                      <span className="material-symbols-outlined text-[18px]">calendar_month</span> Schedule
                    </Button>
                  </>
                }
              />
            </div>
          </section>

          {/* DataTable Showcase */}
          <section className="space-y-4">
            <h3 className="font-headline-md text-headline-md text-primary mb-4 border-b border-surface-variant pb-2">
              DataTable Component
            </h3>
            <DataTable
              columns={sampleStudentColumns}
              data={sampleStudentsData}
              totalEntries={48}
              entriesPerPage={4}
              currentPage={1}
              onPageChange={(p) => triggerToast(`DataTable page changed: ${p}`, "info")}
              onRowActionClick={handleDataTableAction}
            />
          </section>

          {/* Overlays Section */}
          <section className="level-1-card p-6 space-y-6">
            <h3 className="font-headline-md text-headline-md text-primary mb-4 border-b border-surface-variant pb-2">
              Overlays (Modals, Drawers, Menus & Tooltips)
            </h3>
            <div className="flex flex-wrap gap-6 items-center justify-center">
              {/* Modal trigger */}
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                Open Modal Overlay
              </Button>

              {/* Drawer trigger */}
              <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>
                Open Drawer Panel
              </Button>

              {/* DropdownMenu trigger */}
              <DropdownMenu
                trigger={<Button variant="secondary">Open Dropdown Options <span className="material-symbols-outlined text-[16px]">expand_more</span></Button>}
                items={[
                  { label: "Edit Record", icon: "edit", onClick: () => triggerToast("Edit clicked", "info") },
                  { label: "Export CSV", icon: "download", onClick: () => triggerToast("Export clicked", "success") },
                  { isDivider: true },
                  { label: "Deactivate Account", icon: "block", isDestructive: true, onClick: () => triggerToast("Deactivate clicked", "error") },
                ]}
              />

              {/* Tooltip trigger */}
              <Tooltip content="Score calculated based on last 30 days of compliance reports." position="top">
                <div className="flex items-center gap-1 text-text-secondary cursor-help border border-surface-variant px-3 py-2 rounded-lg bg-surface">
                  <span>Hover for Tooltip</span>
                  <span className="material-symbols-outlined text-[18px]">info</span>
                </div>
              </Tooltip>
            </div>
          </section>
        </div>
      ),
    },
    {
      id: "charts",
      label: "4. Data Visualization Standards",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <BarChart
            title="Student Enrollment by Department"
            subtitle="Current academic year distribution"
            data={sampleBarData}
            yMax={4000}
          />

          {/* Line Chart */}
          <LineChart
            title="Attendance Trend"
            subtitle="Last 6 Months Average"
            data={sampleLineData}
            trend="+2.4%"
            trendDirection="up"
            yMax={100}
          />

          {/* Donut Chart */}
          <DonutChart
            title="Revenue Distribution"
            subtitle="Q1 Financial Breakdown"
            data={sampleDonutData}
            centerValue="$14.2M"
          />

          {/* Area Chart */}
          <AreaChart
            title="System Load & Active Sessions"
            subtitle="Portal usage over 24h cycle"
            labels={sampleAreaLabels}
            datasets={sampleAreaDatasets}
            yMax={450}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="app-layout">
      {/* SideNavBar */}
      <nav className={`sidenav ${isSidebarOpen ? "" : "sidenav-closed"} fixed left-0 top-0 h-full w-[240px] flex flex-col border-r border-surface-variant bg-background z-50 py-4`}>
        <div className="px-6 mb-8 mt-4">
          <h1 className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            Lumina University
          </h1>
          <p className="text-text-secondary font-body-sm mt-1">Design System Sandbox</p>
        </div>
        <div className="flex-1 px-4 flex flex-col gap-1">
          <div className="sidenav-link sidenav-link-active flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container-low">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            <span className="font-label-md text-label-md">Design System</span>
          </div>
        </div>
      </nav>

      {/* Main Content View */}
      <div className={`main-layout flex-1 ${isSidebarOpen ? "md:ml-[240px]" : "main-layout-full"} flex flex-col min-h-screen`}>
        {/* TopAppBar */}
        <header className={`topbar fixed top-0 right-0 ${isSidebarOpen ? "md:w-[calc(100%-240px)]" : "topbar-full"} w-full z-40 bg-background/90 backdrop-blur-md border-b border-surface-variant flex justify-between items-center h-16 px-6 md:px-10`}>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="sidebar-toggle-btn"
              aria-label="Toggle Sidebar"
            >
              <span className="material-symbols-outlined">menu</span>
            </Button>
            <span className="font-headline-sm text-headline-sm font-bold text-primary">Lumina UMS</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-label-md text-primary border-b-2 border-primary pb-1">UI Components Sandbox</span>
          </div>
        </header>

        <main className="content-container mt-16 p-6 md:p-10 max-w-[1440px] mx-auto w-full space-y-8">
          <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Design System Sandbox</h2>
              <p className="font-body-lg text-body-lg text-text-secondary">
                Conversion canvas of design references into reusable React + TypeScript components.
              </p>
            </div>
            <div className="flex gap-2 bg-surface-container-low p-1 rounded-lg border border-surface-variant/50">
              <Button
                variant={viewMode === "tabs" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("tabs")}
                style={{ padding: "6px 12px" }}
              >
                Tabs View
              </Button>
              <Button
                variant={viewMode === "all" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("all")}
                style={{ padding: "6px 12px" }}
              >
                Show All
              </Button>
            </div>
          </div>

          {viewMode === "tabs" ? (
            <Tabs tabs={dashboardTabs} />
          ) : (
            <div className="space-y-10">
              {dashboardTabs.map((tab) => (
                <section key={tab.id} className="level-1-card p-6 space-y-6">
                  <div className="mb-4">
                    <h3 className="font-headline-md text-headline-md text-primary border-b border-surface-variant pb-2">{tab.label}</h3>
                  </div>
                  {tab.content}
                </section>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modal Overlay Component Preview */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Student"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => {
              setIsModalOpen(false);
              triggerToast("Student saved successfully", "success");
            }}>
              Save changes
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="Jane" />
            <Input label="Last Name" placeholder="Doe" />
          </div>
          <Input label="Student ID" placeholder="STU-2024-001" />
          <Select
            label="Department"
            options={["Computer Science", "Engineering", "Arts & Humanities"]}
            placeholder="Select Department"
          />
        </div>
      </Modal>

      {/* Drawer Overlay Component Preview */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Student Details"
        footer={
          <div className="flex flex-col gap-2 w-full">
            <Button variant="secondary" onClick={() => triggerToast("Message clicked", "info")}>
              Message Student
            </Button>
            <Button variant="destructive" onClick={() => {
              setIsDrawerOpen(false);
              triggerToast("Student suspended", "error");
            }}>
              Suspend Account
            </Button>
          </div>
        }
      >
        <div className="space-y-5">
          <div className="flex items-center gap-4 mb-6">
            <Avatar initials="JD" size="lg" />
            <div>
              <div className="font-label-md text-label-md text-text-primary">John Doe</div>
              <div className="font-body-sm text-body-sm text-text-secondary">STU-88291</div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="font-label-sm text-label-sm text-text-secondary mb-1">Status</div>
              <Badge variant="student">Active Enrolled</Badge>
            </div>
            <div>
              <div className="font-label-sm text-label-sm text-text-secondary mb-1">Major</div>
              <div className="font-body-md text-body-md text-text-primary">BSc. Software Engineering</div>
            </div>
          </div>
        </div>
      </Drawer>

      {/* Popover Toast Alerts */}
      {showToast && (
        <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}

export default App;
