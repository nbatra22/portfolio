import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { SessionProvider } from "./contexts/SessionContext";
import Navigation from "./components/Navigation";
import ChatWidget from "./components/ChatWidget";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { PAGE_STOPS, projectSlug, projects } from "./data/projects";

const App = () => (
  <SessionProvider>
    <BrowserRouter>
      <Navigation />
      <Routes>
        {/* Every scroll stop (cover, each project, index) is the same page. */}
        {PAGE_STOPS.map((stop) => (
          <Route key={stop.path} path={stop.path} element={<Index />} />
        ))}
        {/* Old section links from before Work/Vault were merged. */}
        <Route
          path="/work"
          element={<Navigate to={`/${projectSlug(projects[0].title)}`} replace />}
        />
        <Route path="/vault" element={<Navigate to="/second-skin" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatWidget />
    </BrowserRouter>
  </SessionProvider>
);

export default App;
