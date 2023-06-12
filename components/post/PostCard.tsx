import { IPost } from "@/entities";
import { useAuth } from "@/providers/auth";
import { getLongDate, getUserInitials, getLocation } from "@/utils/helper";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { MdLocationOn, MdOutlineDateRange } from "react-icons/md";

interface Props {
  post: IPost;
}

const PostCard = ({ post }: Props) => {
  const { user } = useAuth();

  return (
    <Card
      sx={{
        border: "1px solid rgba(31, 110, 140, 0.2)",
        boxShadow: "-10px 15px 8px rgba(31, 110, 140, 0.2)",
        // boxShadow: "-10px 10px 10px 1px rgba(31, 110, 140, 0.2)",
        // boxShadow: "-14px 6px 13px -5px rgba(173,173,173,1)",
      }}
    >
      <Box
        padding={1.5}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={post.photoUrl} alt={post.title} width={300} height={300} />
      </Box>
      <CardContent
        sx={{
          p: "0 12px",
        }}
      >
        <Typography variant="subtitle1" fontWeight="700">
          {post.title}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          paddingBottom={0}
        >
          <Avatar sx={{ width: 30, height: 30, bgcolor: "#5fc2c4" }}>
            <Typography fontSize="15px">
              {getUserInitials(post.username)}
            </Typography>
          </Avatar>
          <Stack direction="column">
            <Typography variant="subtitle2">
              <MdOutlineDateRange color="gray" size={15} />{" "}
              {getLongDate(post.date)}
            </Typography>
            {(post.city || post.country) && (
              <Typography variant="subtitle2">
                <MdLocationOn color="#811a18" size={15} />{" "}
                {getLocation(post.city, post.country)}
              </Typography>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PostCard;
