import useProfile from "@/hooks/user-profile/useProfile";
import { getUserInitials } from "@/utils/helper";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Portal from "../ui/Portal";
import EditProfileForm from "./EditProfileForm";

interface Props {
  userId: string;
  email: string;
  numberOfPosts: number;
}

const UserInfo = ({ userId, email, numberOfPosts }: Props) => {
  const [isEditProfile, setIsEditProfile] = useState(false);

  const { data: profile, isLoading } = useProfile(userId);

  if (isLoading || !profile) return null;

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
        m="1rem auto"
      >
        <Box
          sx={{
            boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.1)",
            padding: "0.2rem",
            borderRadius: "50%",
            mb: "0.1rem",
          }}
        >
          <Avatar
            sx={{
              width: { xs: 80, sm: 120 },
              height: { xs: 80, sm: 120 },
              bgcolor: "#57CC99",
            }}
          >
            <Typography variant="h4">
              {" "}
              {getUserInitials(profile?.name)}
            </Typography>
          </Avatar>
        </Box>
        <Stack justifyContent="center" textAlign="left">
          <Typography variant="subtitle1">{profile.name}</Typography>
          <Typography variant="subtitle2" color="#727475">
            {email}
          </Typography>
          {numberOfPosts && (
            <Typography variant="subtitle2">
              <span style={{ fontWeight: "700" }}>{numberOfPosts}</span>{" "}
              Memories
            </Typography>
          )}
          <Box mb={1} sx={{ maxWidth: { xs: "15rem", sm: "20rem" } }}>
            <Typography variant="subtitle2">{profile.bio}</Typography>
          </Box>
          <Stack direction="row" gap={1}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ textTransform: "capitalize" }}
              onClick={() => setIsEditProfile(true)}
            >
              Edit Profile
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ textTransform: "capitalize" }}
            >
              Change Password
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {isEditProfile && (
        <Portal onClose={() => setIsEditProfile(false)}>
          <EditProfileForm
            userId={userId}
            name={profile.name}
            bio={profile.bio}
            profilePic={profile.profilePicture}
          />
        </Portal>
      )}
    </>
  );
};

export default UserInfo;
