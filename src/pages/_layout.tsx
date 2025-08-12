import "../app/styles/globals.css";

import { Suspense, type ReactNode } from "react";
import { LayoutProvider } from "../shared/components";
import { getContextData } from "waku/middleware/context";
import { getSessionFromContext } from "../shared/utils";

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();
  const session = getSessionFromContext(getContextData());

  return (
    <div className="font-['Nunito']">
      <meta name="description" content={data.description} />
      <link rel="icon" type="image/png" href={data.icon} />
      <LayoutProvider isAuthenticated={!!session}>
        <Suspense>{children}</Suspense>
      </LayoutProvider>
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
