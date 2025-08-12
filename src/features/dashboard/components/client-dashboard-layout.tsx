"use client";

import { DashboardLayout } from "./dashboard-layout";
import { useRouter } from "waku";
import { useMemo } from "react";

interface ClientDashboardLayoutProps {
  children: React.ReactNode;
  userGreeting?: string;
}

export const ClientDashboardLayout = ({ 
  children, 
  userGreeting 
}: ClientDashboardLayoutProps) => {
  const router = useRouter();
  const currentPath = useMemo(() => router.path, [router.path]);

  return (
    <DashboardLayout currentPath={currentPath} userGreeting={userGreeting || ''}>
      {children}
    </DashboardLayout>
  );
};
