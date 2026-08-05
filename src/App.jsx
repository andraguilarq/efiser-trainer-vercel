import { useState } from "react";

import "./App.css";

import Sidebar from "./components/Sidebar";
import ProfileGate from "./components/ProfileGate";

import Dashboard from "./pages/Dashboard";
import Exam from "./pages/Exam";
import Library from "./pages/Library";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import { getActiveProfile } from "./data/profiles";

function App() {

  const [page, setPage] = useState("dashboard");
  const [activeProfile, setActiveProfile] = useState(getActiveProfile);

  if (!activeProfile) {
    return <ProfileGate onCreated={setActiveProfile} />;
  }

  const renderPage = () => {

    switch (page) {

      case "exam":
        return <Exam />;

      case "library":
        return <Library />;

      case "statistics":
        return <Statistics />;

      case "settings":
        return (
          <Settings
            activeProfile={activeProfile}
            onProfileChange={(profile) => {
              setActiveProfile(profile);
              setPage("dashboard");
            }}
          />
        );

      default:
        return <Dashboard profile={activeProfile} />;
    }

  };

  return (

    <div className="app">

      <Sidebar profile={activeProfile} setPage={setPage} />

      <main className="content" key={activeProfile.id}>

        {renderPage()}

      </main>

    </div>

  );

}

export default App;
