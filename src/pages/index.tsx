import { Link } from "waku";

import { Counter } from "../features/counter";
import { AuthForms } from "../features/auth";
import { LandingPage } from "../features/landing";
import { getContextData } from "waku/middleware/context";
import { getSessionFromContext } from "../shared/utils";
import { Redirect } from "../shared/components";

export default async function HomePage() {
  const session = getSessionFromContext(getContextData());

  // If not signed in, show landing page
  if (!session) {
    return <LandingPage />;
  }

  // If signed in, redirect to dashboard using client-side navigation
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="mb-4">Redirecting to dashboard...</p>
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          Go to Dashboard
        </Link>
        <Redirect to="/dashboard" replace />
      </div>
    </div>
  );
}

const getData = async () => {
  const data = {
    title: "Waku",
    headline: "Waku",
    body: "Hello world!",
  };
  return data;
};

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
