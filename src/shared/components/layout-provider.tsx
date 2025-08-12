"use client";

import { useEffect, useState } from "react";
import { Header, Footer } from "../../app/layout";
import { PageSkeleton } from "./ui/skeleton";

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
    // Show appropriate skeleton based on auth state
    return (
      <div className="min-h-screen">
        {isAuthenticated ? (
          <PageSkeleton />
        ) : (
          <div className="min-h-screen flex flex-col">
            <div className="h-16 border-b bg-background" />
            <main className="flex-1">
              <PageSkeleton />
            </main>
            <div className="h-16 border-t bg-background" />
          </div>
        )}
      </div>
    );
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
