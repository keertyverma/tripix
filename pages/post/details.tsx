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
      p="2rem"
      gap={1}
      position="relative"
    >
      <Typography variant="h4" fontWeight="bold" textAlign="center">
        Relish the <span className="gradient">Nostalgia</span>
      </Typography>

      {post && <DisplayPost post={post} />}
    </Box>
  );
};

export default PostDetails;
