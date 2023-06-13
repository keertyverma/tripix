import { DisplayPost } from "@/components";
import { IPost } from "@/entities";
import usePost from "@/hooks/post/usePost";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";

const PostDetails = () => {
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
        fontWeight="bold"
        sx={{ fontSize: { xs: "20px", sm: "35px" } }}
        textAlign="center"
      >
        Relish the <span className="gradient">Nostalgia</span>
      </Typography>
      <Typography variant="h6" sx={{ fontSize: { xs: "18px", sm: "20px" } }}>
        Journey Back in Time, Embrace the Magic of Travel
      </Typography>

      {post && <DisplayPost post={post} />}
    </Box>
  );
};

export default PostDetails;
