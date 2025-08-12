import { Link } from "waku";

import { Counter } from "../features/counter";
import { AuthForms } from "../features/auth";
import { WelcomeSection } from "../features/dashboard";
import { getContextData } from "waku/middleware/context";
import type { Session } from "../features/auth/types";

export default async function HomePage() {
  const data = await getData();
  const session = getContextData().session as Session | undefined;

  // If not signed in, show auth forms
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <title>{data.title}</title>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{data.headline}</h1>
            <p className="text-gray-600">{data.body}</p>
          </div>
          <AuthForms />
        </div>
      </div>
    );
  }

  // If signed in, show main content
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <WelcomeSection 
          title={data.title}
          headline={data.headline}
          body={data.body}
        />
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
