import { DashboardHome } from "../../features/dashboard";

export default async function DashboardHomePage() {
  const data = await getData();

  return (
    <DashboardHome 
      title={data.title}
      headline={data.headline}
      body={data.body}
    />
  );
}

const getData = async () => {
  const data = {
    title: "Dashboard",
    headline: "Welcome to your Dashboard",
    body: "This is your personal dashboard!",
  };
  return data;
};

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
