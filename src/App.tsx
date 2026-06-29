import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Textarea from "./components/ui/Textarea";
import Select from "./components/ui/Select";
import Checkbox from "./components/ui/Checkbox";
import Radio from "./components/ui/Radio";
import Switch from "./components/ui/Switch";

function App() {
  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "600px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>🎨 Design System Demo</h1>

      <Input
        label="Username"
        placeholder="Enter username"
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
      />

      <Textarea
        label="Message"
        placeholder="Write your message..."
      />

      <Select
        label="Department"
        options={[
          "Computer Science",
          "Mechanical",
          "Civil",
          "Electrical",
        ]}
      />

      <Checkbox
        label="I agree to the Terms & Conditions"
      />

      <Radio
        label="Gender"
        options={[
          "Male",
          "Female",
          "Other",
        ]}
      />

      <Switch
        label="Enable Notifications"
      />

      <Button>
        Submit
      </Button>
    </div>
  );
}

export default App;