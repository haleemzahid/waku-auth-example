import { Counter } from "../../features/counter";

export default async function DashboardCounterPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Counter</h1>
      <Counter />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
