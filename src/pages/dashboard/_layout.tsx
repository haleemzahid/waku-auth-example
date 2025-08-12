import { getContextData } from "waku/middleware/context";
import { DashboardLayout } from "../../features/dashboard";
import { Redirect } from "../../shared/components";
import { getSessionFromContext } from "../../shared/utils";

interface DashboardLayoutPageProps {
  children: React.ReactNode;
}

export default async function DashboardLayoutPage({ children }: DashboardLayoutPageProps) {
  const session = getSessionFromContext(getContextData());
  
  // If not authenticated, redirect to home
  if (!session) {
    return <Redirect to="/" />;
  }

  const userGreeting = `Hello, ${session.user.name}`;

  return (
    <DashboardLayout userGreeting={userGreeting}>
      {children}
    </DashboardLayout>
  );
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
