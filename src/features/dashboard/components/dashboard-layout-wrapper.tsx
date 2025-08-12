"use client";

import { DashboardLayout } from "./dashboard-layout";
import { useRouter } from "waku";

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  userGreeting?: string;
}

export const DashboardLayoutWrapper = ({ 
  children, 
  userGreeting 
}: DashboardLayoutWrapperProps) => {
  const router = useRouter();

  return (
    <DashboardLayout currentPath={router.path} userGreeting={userGreeting || ''}>
      {children}
    </DashboardLayout>
  );
};
