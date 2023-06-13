import { CreatePostForm } from "@/components";
import { Box, Typography } from "@mui/material";

const Create = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      sx={{ mt: { xs: "30px", sm: "40px" } }}
      gap={1}
      position="relative"
    >
      <Typography
        variant="h3"
        component="h1"
        fontWeight="bold"
        sx={{ fontSize: { xs: "25px", sm: "35px" } }}
        textAlign="center"
      >
        <span className="gradient">Create Memory</span>
      </Typography>
      <CreatePostForm />
    </Box>
  );
};

export default Create;
