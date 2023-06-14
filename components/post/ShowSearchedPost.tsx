import { IPost } from "@/entities";
import { Typography } from "@mui/material";
import PostList from "./PostList";

interface Props {
  searchText: string;
  searchedPosts: IPost[] | [];
  handleDelete?: (postId: string) => void;
  handleEdit?: (postId: string) => void;
}

const ShowSearchedPost = ({
  searchText,
  searchedPosts,
  handleDelete,
  handleEdit,
}: Props) => {
  return (
    <>
      {searchedPosts.length === 0 ? (
        <Typography
          variant="h6"
          color="gray"
          sx={{
            fontSize: { xs: "18px", sm: "20px" },
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
          <PostList
            posts={searchedPosts}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </>
      )}
    </>
  );
};

export default ShowSearchedPost;
