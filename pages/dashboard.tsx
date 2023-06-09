import { ProtectedRoute } from "@/components";
import Logout from "@/components/user/Logout";

const dashboard = () => {
  return (
    <ProtectedRoute>
      <div>dashboard</div>
      <Logout />
    </ProtectedRoute>
  );
};

export default dashboard;
