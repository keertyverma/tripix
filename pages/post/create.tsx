import { CreatePostForm } from "@/components";
import { Box, Typography } from "@mui/material";

const Create = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      p="2rem"
      gap={1}
      position="relative"
    >
      <Typography variant="h4" fontWeight="bold" textAlign="center">
        <span className="gradient">Create Memory</span>
      </Typography>
      <CreatePostForm />
    </Box>
  );
};

export default Create;
