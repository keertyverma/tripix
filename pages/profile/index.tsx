import { PostList, SearchInput, ShowSearchedPost } from "@/components";
import { IPost } from "@/entities";
import useDeletePost from "@/hooks/post/useDeletePost";
import usePosts from "@/hooks/post/usePosts";
import { useAuth } from "@/providers/auth";
import { Box, Button, Hidden, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [userPosts, setUserPosts] = useState<IPost[] | []>([]);
  const [searchedPosts, setSearchedPosts] = useState<IPost[] | []>([]);
  const [searchText, setSearchText] = useState<string>("");

  const { user } = useAuth();
  const { data } = usePosts();
  const deletePost = useDeletePost();
  const router = useRouter();

  useEffect(() => {
    if (user && data) {
      const userPosts = data.filter((post) => post.userId === user.id);
      setUserPosts([...userPosts]);
    }
  }, [user, data]);

  const handleDelete = (postId: string) => {
    deletePost.mutate(postId, {
      onSuccess() {
        setUserPosts(userPosts.filter((post) => post.id !== postId));
        if (searchedPosts) {
          // also remove post from searched filter result
          setSearchedPosts(searchedPosts.filter((post) => post.id !== postId));
        }
      },
      onError(err) {
        console.log("err = ", err);
      },
    });
  };

  const handleEdit = (postId: string) => {
    router.push(`/post/update?id=${postId}`);
  };

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
    if (searchText) {
      setSearchedPosts(
        userPosts.filter(
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
        Relive Your{" "}
        <span className="gradient">Unforgettable Travel Memories</span>
      </Typography>
      <SearchInput onSearch={handleSearch} onReset={handleReset} />
      {searchText ? (
        <ShowSearchedPost
          searchText={searchText}
          searchedPosts={searchedPosts}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ) : (
        <PostList
          posts={userPosts}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </Box>
  );
};

export default UserProfile;
