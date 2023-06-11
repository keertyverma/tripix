import { Box, Typography } from "@mui/material";

import { ProtectedRoute } from "@/components";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: { xs: "30px", sm: "40px" } }}
      >
        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "20px", sm: "40px" },
          }}
        >
          <span className="gradient">Discover & Share </span> - Travel Memories
        </Typography>
      </Box>
    </ProtectedRoute>
  );
};

export default Dashboard;
