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
import AdminReports from "./pages/AdminReports";
import Pearls from "./pages/Pearls";
import Review from "./pages/Review";
import SavedQuestions from "./pages/SavedQuestions";
import StudyPlan from "./pages/StudyPlan";
import { getActiveProfile } from "./data/profiles";
import { ensureMyProfile, getSession, signOut, touchLastActive } from "./data/auth";
import { isSupabaseConfigured, supabase } from "./data/supabase";
import { hydrateStudyStateFromRemote, setStudyStateOwnerId, syncStudyStateWhenOnline } from "./data/studyState";

function App() {
  const [page, setPage] = useState("dashboard");
  const [practiceRequest, setPracticeRequest] = useState(null);
  const [reviewFilter, setReviewFilter] = useState(null);
  const [activeProfile, setActiveProfile] = useState(isSupabaseConfigured ? null : getActiveProfile);
  const [authReady, setAuthReady] = useState(!isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return undefined;
    let active = true;

    async function loadAuthenticatedProfile(session) {
      if (!session?.user) {
        if (active) {
          setStudyStateOwnerId("");
          setActiveProfile(null);
          setAuthReady(true);
        }
        return;
      }
      try {
        const profile = await ensureMyProfile(session.user);
        await hydrateStudyStateFromRemote(profile.id);
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

  useEffect(() => {
    const handleOnline = () => syncStudyStateWhenOnline();
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
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

  function navigate(nextPage, payload = null) {
    if (nextPage === "exam") setPracticeRequest(payload);
    if (nextPage === "review") setReviewFilter(payload);
    setPage(nextPage);
  }

  if (isSupabaseConfigured && !authReady) return <main className="profile-gate"><p>Cargando tu cuenta…</p></main>;
  if (isSupabaseConfigured && !activeProfile) return <AuthGate />;
  if (!isSupabaseConfigured && !activeProfile) return <ProfileGate onCreated={setActiveProfile} />;

  const renderPage = () => {
    switch (page) {
      case "exam": return <Exam key={`general-exam-${JSON.stringify(practiceRequest)}`} practiceRequest={practiceRequest} onNavigate={navigate} userName={activeProfile.name} />;
      case "bank-exam": return <Exam bankOnly key="bank-exam" onNavigate={navigate} userName={activeProfile.name} />;
      case "library": return <Library />;
      case "review": return <Review initialFilter={reviewFilter} onPractice={(request) => navigate("exam", request)} />;
      case "pearls": return <Pearls onPractice={(request) => navigate("exam", request)} onReview={(filter) => navigate("review", filter)} />;
      case "saved": return <SavedQuestions onPractice={(request) => navigate("exam", request)} />;
      case "study-plan": return <StudyPlan onPractice={(request) => navigate("exam", request)} onReview={(filter) => navigate("review", filter)} />;
      case "statistics": return <Statistics userId={activeProfile.id} />;
      case "admin-results": return activeProfile.role === "admin" ? <AdminResults /> : <Dashboard profile={activeProfile} />;
      case "admin-reports": return activeProfile.role === "admin" ? <AdminReports /> : <Dashboard profile={activeProfile} />;
      case "settings": return <Settings activeProfile={activeProfile} onProfileChange={(profile) => { setActiveProfile(profile); setPage("dashboard"); }} secureMode={isSupabaseConfigured} />;
      default: return <Dashboard profile={activeProfile} />;
    }
  };

  return (
    <div className="app">
      <Sidebar onSignOut={handleSignOut} profile={activeProfile} secureMode={isSupabaseConfigured} setPage={navigate} />
      <main className="content" key={activeProfile.id}>{renderPage()}</main>
    </div>
  );
}

export default App;
