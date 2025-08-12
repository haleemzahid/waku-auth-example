import "../app/styles/globals.css";

import { Suspense, type ReactNode } from "react";

import { Header, Footer } from "../app/layout";
import { getContextData } from "waku/middleware/context";
import { Session } from "../features/auth/api/auth-client";

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();
  const session = getContextData().session as Session | undefined;
  console.log("Session in layout:", session);

  return (
    <div className="font-['Nunito']">
      <meta name="description" content={data.description} />
      <link rel="icon" type="image/png" href={data.icon} />
      <Header greeting={session ? `Hello, ${session.user.name}` : ""} />
      <main className="m-6 flex items-center *:min-h-64 *:min-w-64 lg:m-0 lg:min-h-svh lg:justify-center">
        <Suspense>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
}

const getData = async () => {
  const data = {
    description: "An internet website!",
    icon: "/images/favicon.png",
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
