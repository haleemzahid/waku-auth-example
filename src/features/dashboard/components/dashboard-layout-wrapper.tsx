"use client";

import { DashboardLayout } from "./dashboard-layout";

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  userGreeting?: string;
}

export const DashboardLayoutWrapper = ({ 
  children, 
  userGreeting 
}: DashboardLayoutWrapperProps) => {
  return (
    <DashboardLayout userGreeting={userGreeting || ''}>
      {children}
    </DashboardLayout>
  );
};
