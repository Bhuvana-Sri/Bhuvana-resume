import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-center px-5 md:px-10">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.04em]">
        This page doesn't exist.
      </h1>
      <a
        href="/"
        className="mt-8 w-fit font-medium underline decoration-primary decoration-2 underline-offset-4 hover:text-primary"
      >
        Back to the portfolio
      </a>
    </main>
  );
};

export default NotFound;
