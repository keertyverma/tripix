import { Box, Typography } from "@mui/material";

import { ProtectedRoute } from "@/components";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: { xs: "25px", sm: "20px" } }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "16px", sm: "30px" },
          }}
        >
          <span className="gradient">Discover</span> Inspiring Travel Stories
        </Typography>
      </Box>
    </ProtectedRoute>
  );
};

export default Dashboard;
