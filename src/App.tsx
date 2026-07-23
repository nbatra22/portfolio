import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionProvider } from "./contexts/SessionContext";
import Navigation from "./components/Navigation";
import ChatWidget from "./components/ChatWidget";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <SessionProvider>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/work" element={<Index />} />
        <Route path="/vault" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatWidget />
    </BrowserRouter>
  </SessionProvider>
);

export default App;
