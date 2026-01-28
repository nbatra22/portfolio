import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type SessionContextType = {
  sessionId: string | null;
  isLoading: boolean;
};

const SessionContext = createContext<SessionContextType>({
  sessionId: null,
  isLoading: true,
});

export const useSession = () => useContext(SessionContext);

const PING_ENDPOINT = "https://nbchatbotserver.azurewebsites.net/ping";

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const response = await fetch(PING_ENDPOINT);
        if (response.ok) {
          const data = await response.json();
          setSessionId(data.sessionId);
        } else {
          console.error("Failed to fetch sessionId from ping endpoint");
        }
      } catch (error) {
        console.error("Error pinging server:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionId();
  }, []);

  return (
    <SessionContext.Provider value={{ sessionId, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};
