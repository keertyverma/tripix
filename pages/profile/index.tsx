import { useAuth } from "@/providers/auth";
import { Box, Typography, Container, Stack } from "@mui/material";
import { IPost } from "@/entities";
import { useState, useEffect } from "react";
import usePosts from "@/hooks/post/usePosts";
import { PostList } from "@/components";

const UserProfile = () => {
  const { user } = useAuth();
  const { data, isFetching, error } = usePosts();
  const [userPosts, setUserPosts] = useState<IPost[] | []>([]);

  useEffect(() => {
    if (user && data) {
      const userPosts = data.filter((post) => post.userId === user.id);
      setUserPosts([...userPosts]);
    }
  }, [user, data]);

  const handleDelete = (postId: string) => {
    console.log("delete post with id = ", postId);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      sx={{ mt: { xs: "30px", sm: "40px" } }}
      gap={1}
    >
      <Typography
        variant="h3"
        component="h1"
        fontWeight="bold"
        sx={{ fontSize: { xs: "25px", sm: "40px" } }}
        textAlign="center"
      >
        <span className="gradient">User Profile</span>
      </Typography>
      <Typography variant="h5">
        Welcome to your personalized profile page
      </Typography>
      {user && (
        <Stack
          justifyContent="flex-start"
          sx={{ mt: { xs: "10px", sm: "20px" } }}
        >
          <Typography variant="h6">Name : {user?.name}</Typography>
          <Typography variant="h6">Email : {user?.email}</Typography>
        </Stack>
      )}
      <PostList posts={userPosts} handleDelete={handleDelete} />
    </Box>
  );
};

export default UserProfile;
