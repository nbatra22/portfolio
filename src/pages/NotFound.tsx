import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper text-ink">
      <div className="text-center">
        <h1 className="mb-4 text-8xl font-bold tracking-[-0.05em]">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="underline decoration-2 underline-offset-4 hover:text-accent">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
