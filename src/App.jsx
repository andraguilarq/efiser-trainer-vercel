import { useEffect, useState } from "react";

import "./App.css";

import Sidebar from "./components/Sidebar";
import ProfileGate from "./components/ProfileGate";
import AuthGate from "./components/AuthGate";
import Dashboard from "./pages/Dashboard";
import Exam from "./pages/Exam";
import Library from "./pages/Library";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import AdminResults from "./pages/AdminResults";
import { getActiveProfile } from "./data/profiles";
import { ensureMyProfile, getSession, signOut, touchLastActive } from "./data/auth";
import { isSupabaseConfigured, supabase } from "./data/supabase";

function App() {
  const [page, setPage] = useState("dashboard");
  const [activeProfile, setActiveProfile] = useState(isSupabaseConfigured ? null : getActiveProfile);
  const [authReady, setAuthReady] = useState(!isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return undefined;
    let active = true;

    async function loadAuthenticatedProfile(session) {
      if (!session?.user) {
        if (active) {
          setActiveProfile(null);
          setAuthReady(true);
        }
        return;
      }
      try {
        const profile = await ensureMyProfile(session.user);
        await touchLastActive();
        if (active) setActiveProfile(profile);
      } catch (error) {
        console.error("No se pudo cargar el perfil", error);
        if (active) setActiveProfile(null);
      } finally {
        if (active) setAuthReady(true);
      }
    }

    getSession().then(loadAuthenticatedProfile).catch(() => { if (active) setAuthReady(true); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      loadAuthenticatedProfile(session);
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    try {
      await signOut();
      setPage("dashboard");
      setActiveProfile(null);
    } catch (error) {
      alert(error.message || "No fue posible cerrar sesión.");
    }
  }

  if (isSupabaseConfigured && !authReady) return <main className="profile-gate"><p>Cargando tu cuenta…</p></main>;
  if (isSupabaseConfigured && !activeProfile) return <AuthGate />;
  if (!isSupabaseConfigured && !activeProfile) return <ProfileGate onCreated={setActiveProfile} />;

  const renderPage = () => {
    switch (page) {
      case "exam": return <Exam key="general-exam" />;
      case "bank-exam": return <Exam bankOnly key="bank-exam" />;
      case "library": return <Library />;
      case "statistics": return <Statistics userId={activeProfile.id} />;
      case "admin-results": return activeProfile.role === "admin" ? <AdminResults /> : <Dashboard profile={activeProfile} />;
      case "settings": return <Settings activeProfile={activeProfile} onProfileChange={(profile) => { setActiveProfile(profile); setPage("dashboard"); }} secureMode={isSupabaseConfigured} />;
      default: return <Dashboard profile={activeProfile} />;
    }
  };

  return (
    <div className="app">
      <Sidebar onSignOut={handleSignOut} profile={activeProfile} secureMode={isSupabaseConfigured} setPage={setPage} />
      <main className="content" key={activeProfile.id}>{renderPage()}</main>
    </div>
  );
}

export default App;
