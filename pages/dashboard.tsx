import { ProtectedRoute } from "@/components";
import Logout from "@/components/auth/Logout";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div>dashboard</div>
      <Logout />
    </ProtectedRoute>
  );
};

export default Dashboard;
