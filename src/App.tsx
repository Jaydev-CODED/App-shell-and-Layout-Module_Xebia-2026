import "./App.css";

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
    display: "flex",
    justifyContent: "center",
    padding: "40px",
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: "650px",
      background: "#ffffff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    }}
  >
        <h1>Design System Demo</h1>

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

        <Button>Submit</Button>
      </div>
    </div>
  );
}

export default App;