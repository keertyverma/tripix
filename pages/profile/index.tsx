import {
  LoadingPostSkeleton,
  PostList,
  SearchInput,
  ShowSearchedPost,
  UserInfo,
} from "@/components";
import { IPost } from "@/entities";
import useDeletePost from "@/hooks/post/useDeletePost";
import usePosts from "@/hooks/post/usePosts";
import { useAuth } from "@/providers/auth";
import { Box, Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [userPosts, setUserPosts] = useState<IPost[] | []>([]);
  const [searchedPosts, setSearchedPosts] = useState<IPost[] | []>([]);
  const [searchText, setSearchText] = useState<string>("");

  const { user } = useAuth();
  const { data, isFetching, isLoading } = usePosts();
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
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        p="1.5rem 2rem"
        position="relative"
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Relive Your{" "}
          <span className="gradient">Unforgettable Travel Memories</span>
        </Typography>
        {user && (
          <>
            <UserInfo
              userId={user.id}
              email={user.email}
              numberOfPosts={userPosts?.length}
            />
            <Divider />
          </>
        )}
        <SearchInput onSearch={handleSearch} onReset={handleReset} />
        {isFetching || isLoading ? (
          <LoadingPostSkeleton />
        ) : (
          <>
            {userPosts.length === 0 && (
              <Box
                mt="30vh"
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <Typography variant="h6">
                  No memories created. Go ahead and start creating! 😎
                </Typography>
                <Box
                  sx={{
                    alignSelf: "center",
                    justifySelf: "center",
                  }}
                >
                  <Link href="/post/create">
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      sx={{
                        borderRadius: "10px",
                        textTransform: "capitalize",
                        fontSize: "1rem",
                      }}
                    >
                      Create
                    </Button>
                  </Link>
                </Box>
              </Box>
            )}
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;
