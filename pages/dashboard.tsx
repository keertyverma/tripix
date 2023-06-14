import { LoadingPostSkeleton } from "@/components";
import { Box, Typography } from "@mui/material";

import {
  PostList,
  ProtectedRoute,
  SearchInput,
  ShowSearchedPost,
} from "@/components";
import { IPost } from "@/entities";
import usePosts from "@/hooks/post/usePosts";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [posts, setPosts] = useState<IPost[] | []>([]);
  const [searchedPosts, setSearchedPosts] = useState<IPost[] | []>([]);
  const [searchText, setSearchText] = useState<string>("");

  const { data, isFetching, isLoading } = usePosts();

  useEffect(() => {
    if (data) {
      setPosts([...data]);
    }
  }, [data]);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
    if (searchText) {
      setSearchedPosts(
        posts.filter(
          (post) =>
            post.username.toLowerCase().includes(searchText.toLowerCase()) ||
            post.title.toLowerCase().includes(searchText.toLowerCase()) ||
            post.description.toLowerCase().includes(searchText.toLowerCase()) ||
            post.city.toLowerCase().includes(searchText.toLowerCase()) ||
            post.country.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  };

  const handleReset = () => {
    setSearchText("");
  };

  return (
    <ProtectedRoute>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        sx={{
          mt: { xs: "30px", sm: "40px" },
          mb: { xs: "20px", sm: "40px" },
        }}
      >
        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "25px", sm: "40px" },
          }}
        >
          <span className="gradient">Discover & Share </span> - Travel Memories
        </Typography>
        <SearchInput onSearch={handleSearch} onReset={handleReset} />
        {isFetching || isLoading ? (
          <LoadingPostSkeleton />
        ) : searchText ? (
          <ShowSearchedPost
            searchText={searchText}
            searchedPosts={searchedPosts}
          />
        ) : (
          <PostList posts={posts} />
        )}
      </Box>
    </ProtectedRoute>
  );
};

export default Dashboard;
