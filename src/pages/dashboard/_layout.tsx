import { getContextData } from "waku/middleware/context";
import type { Session } from "../../features/auth/types";
import { DashboardLayoutWrapper } from "../../features/dashboard";
import { Redirect } from "../../shared/components";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = getContextData().session as Session | undefined;
  
  // If not authenticated, redirect to home
  if (!session) {
    return <Redirect to="/" />;
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
