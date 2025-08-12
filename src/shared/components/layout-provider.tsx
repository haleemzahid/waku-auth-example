"use client";

import { useEffect, useState } from "react";
import { Header, Footer } from "../../app/layout";

interface LayoutProviderProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}

export const LayoutProvider = ({ children, isAuthenticated = false }: LayoutProviderProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen">{children}</div>;
  }

  if (isAuthenticated) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header greeting="" />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
