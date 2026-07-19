import { useState } from "react";

import "./App.css";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Exam from "./pages/Exam";
import Library from "./pages/Library";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";

function App() {

  const [page, setPage] = useState("dashboard");

  const renderPage = () => {

    switch (page) {

      case "exam":
        return <Exam />;

      case "library":
        return <Library />;

      case "statistics":
        return <Statistics />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }

  };

  return (

    <div className="app">

      <Sidebar setPage={setPage} />

      <main className="content">

        {renderPage()}

      </main>

    </div>

  );

}

export default App;
