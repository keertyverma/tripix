import { PostList } from "@/components";
import { IPost } from "@/entities";
import useDeletePost from "@/hooks/post/useDeletePost";
import usePosts from "@/hooks/post/usePosts";
import { useAuth } from "@/providers/auth";
import { Box, Button, Hidden, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [userPosts, setUserPosts] = useState<IPost[] | []>([]);

  const { user } = useAuth();
  const { data } = usePosts();
  const deletePost = useDeletePost();

  useEffect(() => {
    if (user && data) {
      const userPosts = data.filter((post) => post.userId === user.id);
      setUserPosts([...userPosts]);
    }
  }, [user, data]);

  const handleDelete = (postId: string) => {
    console.log("delete post with id = ", postId);
    deletePost.mutate(postId, {
      onSuccess() {
        setUserPosts(userPosts.filter((post) => post.id !== postId));
      },
      onError(err) {
        console.log("err = ", err);
      },
    });
  };

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
      <Hidden smUp>
        <Box width="100%" display="flex" justifyContent="flex-end">
          <Link href="/dashboard">
            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: "capitalize",
                borderRadius: "15px",
              }}
            >
              Dashboard
            </Button>
          </Link>
        </Box>
      </Hidden>
      <Hidden smDown>
        <Box
          sx={{
            position: { sm: "absolute" },
            top: "0",
            left: "0",
            marginLeft: "40px",
          }}
        >
          <Link href="/dashboard">
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "15px",
              }}
            >
              Back to Dashboard
            </Button>
          </Link>
        </Box>
      </Hidden>

      <Typography
        variant="h3"
        component="h1"
        fontWeight="bold"
        sx={{ fontSize: { xs: "25px", sm: "40px" } }}
        textAlign="center"
      >
        <span className="gradient">User Profile</span>
      </Typography>
      <Typography variant="h6">
        Update, Delete, and Manage with Ease!
      </Typography>

      <PostList posts={userPosts} handleDelete={handleDelete} />
    </Box>
  );
};

export default UserProfile;
