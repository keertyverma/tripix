import { IPost } from "@/entities";
import { Typography } from "@mui/material";
import PostList from "./PostList";

interface Props {
  searchText: string;
  searchedPosts: IPost[] | [];
}

const ShowSearchedPost = ({ searchText, searchedPosts }: Props) => {
  return (
    <>
      {searchedPosts.length === 0 ? (
        <Typography
          variant="h6"
          color="gray"
          sx={{
            fontSize: { xs: "13px", sm: "20px" },
            mt: "30vh",
          }}
        >
          No posts found for <span className="text-bold">{searchText}</span>
        </Typography>
      ) : (
        <>
          <Typography
            variant="h6"
            color="gray"
            sx={{
              mt: "10px",
              fontSize: { xs: "15px", sm: "20px" },
            }}
          >
            Showing results for <span className="text-bold">{searchText}</span>
          </Typography>
          <PostList posts={searchedPosts} />
        </>
      )}
    </>
  );
};

export default ShowSearchedPost;
