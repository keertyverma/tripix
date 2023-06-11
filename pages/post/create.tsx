import { CreatePostForm } from "@/components";
import { Box, Typography, Container } from "@mui/material";

const Create = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: { xs: "10px" } }}>
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
    </Container>
  );
};

export default Create;
