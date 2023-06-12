import { IPost } from "@/entities";
import { Box, Grid } from "@mui/material";
import PostCard from "./PostCard";

interface Props {
  posts: IPost[];
}

const PostList = ({ posts }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      mt={4}
      px={10}
    >
      <Grid
        container
        spacing={{ xs: 3, sm: 4 }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
        columnSpacing={6}
      >
        {posts.map((post) => (
          <Grid item key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PostList;
