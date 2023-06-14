import { IPost } from "@/entities";
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

import { getLocation, getLongDate, getUserInitials } from "@/utils/helper";
import { MdLocationOn, MdOutlineDateRange } from "react-icons/md";

interface Props {
  post: IPost;
}

const DisplayPost = ({ post }: Props) => {
  return (
    <Grid
      container
      sx={{ display: "flex", marginTop: { xs: "10px", sm: "40px" } }}
    >
      <Grid item xs={12} sm={4}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ marginBottom: { xs: "10px", sm: "20px" } }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding={1}
            border="1px solid rgba(31, 110, 140, 0.2)"
            boxShadow="0px 6px 4px rgba(0, 0, 0, 0.1)"
          >
            <Image
              src={post.photoUrl}
              alt="Preview"
              width={400}
              height={400}
              className="image-fit"
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Box
          sx={{
            margin: { xs: "20px 30px 10px 20px", sm: "0 40px 20px 0" },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              gap={2}
              justifyContent="center"
              alignItems="center"
            >
              {" "}
              <Avatar sx={{ width: 50, height: 50, bgcolor: "#5fc2c4" }}>
                <Typography fontWeight="bold" fontSize="15px">
                  {getUserInitials(post.username)}
                </Typography>
              </Avatar>
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: "20px", sm: "25px" } }}
              >
                {post.username}
              </Typography>
            </Stack>
            <Stack direction="column">
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "15px", sm: "20px" } }}
              >
                <MdOutlineDateRange color="gray" size={20} />{" "}
                {getLongDate(post.date)}
              </Typography>
              {(post.city || post.country) && (
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "15px", sm: "20px" } }}
                >
                  <MdLocationOn color="#811a18" size={20} />{" "}
                  {getLocation(post.city, post.country)}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            margin: { xs: "0 30px 10px 25px", sm: "0 40px 20px 0" },
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ fontSize: { xs: "25px", sm: "30px" } }}
          >
            {post.title}
          </Typography>
          <Typography
            variant="body1"
            fontSize={{ xs: "15px", sm: "20px" }}
            marginTop={2}
          >
            {post.description}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DisplayPost;
