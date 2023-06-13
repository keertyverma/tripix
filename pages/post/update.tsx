import usePost from "@/hooks/post/usePost";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import { UpdatePostForm } from "@/components";
import { IPost } from "@/entities";

const UpdatePost = () => {
  const router = useRouter();
  const postId = router.query.id as string;

  const post = usePost(postId) as IPost;

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
        fontWeight="blod"
        sx={{ fontSize: { xs: "25px", sm: "35px" } }}
        textAlign="center"
      >
        <span className="gradient">Update Memory</span>
      </Typography>
      {post && <UpdatePostForm post={post} />}
    </Box>
  );
};

export default UpdatePost;
