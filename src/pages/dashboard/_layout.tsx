import { getContextData } from "waku/middleware/context";
import type { Session } from "../../features/auth/types";
import { DashboardLayoutWrapper } from "../../features/dashboard";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = getContextData().session as Session | undefined;
  
  // If not authenticated, don't render dashboard layout
  if (!session) {
    return <div>Redirecting...</div>;
  }

  const userGreeting = `Hello, ${session.user.name}`;

  return (
    <DashboardLayoutWrapper userGreeting={userGreeting}>
      {children}
    </DashboardLayoutWrapper>
  );
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
