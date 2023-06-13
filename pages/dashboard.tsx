import { Box, Typography } from "@mui/material";

import { PostList, ProtectedRoute } from "@/components";
import { IPost } from "@/entities";
import usePosts from "@/hooks/post/usePosts";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [posts, setPosts] = useState<IPost[] | []>([]);

  const { data, isFetching, error } = usePosts();

  useEffect(() => {
    if (data) {
      setPosts([...data]);
    }
  }, [data]);

  return (
    <ProtectedRoute>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        sx={{ mt: { xs: "30px", sm: "40px" }, mb: { xs: "20px", sm: "40px" } }}
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
        <PostList posts={posts} />
      </Box>
    </ProtectedRoute>
  );
};

export default Dashboard;
