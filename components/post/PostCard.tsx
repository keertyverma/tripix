import { IPost } from "@/entities";
import { getLocation, getLongDate, getUserInitials } from "@/utils/helper";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  Stack,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Image from "next/image";
import { MdLocationOn, MdOutlineDateRange } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/auth";
import { useState } from "react";

interface Props {
  post: IPost;
  handleDelete?: (postId: string) => void;
  handleEdit?: (postId: string) => void;
}

const PostCard = ({ post, handleDelete, handleEdit }: Props) => {
  const pathName = usePathname();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleConfirmation = (confirmed: boolean) => {
    setOpen(false);
    if (confirmed && handleDelete) {
      console.log("deleting post");
      handleDelete(post.id);
    }
  };

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
        {user?.id === post.userId && pathName === "/profile" && (
          <Stack direction="row" gap={2} mt={2} justifyContent="flex-start">
            <Button
              variant="outlined"
              size="small"
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
              color="primary"
              onClick={() => handleEdit?.(post.id)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleDeleteClick}
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
              color="error"
            >
              Delete
            </Button>
            <Dialog
              open={open}
              onClose={() => handleConfirmation(false)}
              aria-labelledby="delete-dialog-title"
              aria-describedby="delete-dialog-description"
            >
              <DialogTitle id="delete-dialog-title">
                Confirm Deletion
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="delete-dialog-description">
                  Are you sure you want to delete this post?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => handleConfirmation(false)}
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  No
                </Button>
                <Button
                  onClick={() => handleConfirmation(true)}
                  sx={{
                    textTransform: "capitalize",
                  }}
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
