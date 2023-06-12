import { Box, Typography } from "@mui/material";

import { Loader, ProtectedRoute } from "@/components";
import usePosts, { IPost } from "@/hooks/post/usePosts";
import Image from "next/image";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [posts, setPosts] = useState<IPost[] | []>([]);

  const { data, isFetching, error } = usePosts();

  useEffect(() => {
    if (data) {
      setPosts([...data]);
    }
  }, [data]);

  console.log("posts  = ", posts);

  return (
    <ProtectedRoute>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
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

        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: "nowrap",
          }}
          mt={2}
        >
          {isFetching && <Loader />}

          {error ? (
            <Typography color="error">Unable to fetch posts</Typography>
          ) : null}

          {posts.map((post) => (
            <Box key={post.id}>
              <Typography>post ID = {post.id}</Typography>
              <Typography>userId = {post.userId}</Typography>
              <Typography>title = {post.title}</Typography>
              <Typography>description = {post.description}</Typography>
              <Typography>date = {post.date}</Typography>
              <Typography>city = {post.city}</Typography>
              <Typography>country = {post.country}</Typography>
              <Image
                src={`${post.photoUrl}`}
                alt={post.title}
                width={200}
                height={200}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </ProtectedRoute>
  );
};

export default Dashboard;
