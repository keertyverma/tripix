import { ProtectedRoute } from "@/components";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div>dashboard</div>
    </ProtectedRoute>
  );
};

export default Dashboard;
