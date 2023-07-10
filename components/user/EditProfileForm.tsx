import { getTrimImageName, getUserInitials } from "@/utils/helper";
import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AppwriteException } from "appwrite";
import Image from "next/image";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import FlexBetween from "../ui/FlexBetween";

interface Props {
  userId: string;
  name: string;
  bio: string;
  profilePic: string;
}

const EditProfileForm = ({ userId, name, bio, profilePic }: Props) => {
  const BIO_MAX_LENGTH = 150;
  const [picture, setPicture] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bio: bio,
      profilePic: profilePic,
    },
  });

  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = handleSubmit((data) => {
    console.log("form data = ", data);

    try {
      setIsLoading(true);
      let profilePicture = "";
      if (picture) {
        // upload photo
        //get preview image url
        // set img url
      }

      // update profile with bio and profile pic
    } catch (err) {
      const appWriteError = err as AppwriteException;
      setError(appWriteError.message);
    } finally {
      setIsLoading(false);
    }
  });

  const handleOnDrop = (file: File) => {
    setPicture(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = (e?.target?.result as string).split(",")[1];
      setImagePreview(`data:image/jpeg;base64,${base64String}`);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
    >
      <Typography
        variant="h6"
        color="primary"
        fontWeight="bold"
        textAlign="center"
        marginBottom={1}
      >
        Edit Profile
      </Typography>
      <form
        onSubmit={handleFormSubmit}
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "10px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          mb={2}
        >
          <Stack direction="row">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.1)",
                padding: "0.2rem",
                borderRadius: "50%",
                mb: "0.1rem",
              }}
            >
              {imagePreview ? (
                <Image
                  width={isNonMobileScreen ? 120 : 100}
                  height={isNonMobileScreen ? 120 : 100}
                  src={imagePreview.toString()}
                  alt="profile picture"
                  className="image-fit rounded-img"
                />
              ) : (
                <Avatar
                  sx={{
                    width: { xs: 100, sm: 120 },
                    height: { xs: 100, sm: 120 },
                    bgcolor: "#57CC99",
                  }}
                >
                  <Typography variant="h4"> {getUserInitials(name)}</Typography>
                </Avatar>
              )}
            </Box>
            {picture && (
              <AiOutlineCloseSquare
                onClick={() => {
                  setImagePreview(null);
                  setPicture(null);
                }}
              />
            )}
          </Stack>
          <Box
            border="1px solid gray"
            borderRadius="5px"
            p="0.2rem"
            width="10rem"
          >
            <Dropzone
              multiple={false}
              onDrop={(acceptedFiles) => handleOnDrop(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  border={`1px dashed ${theme.palette.secondary.main}`}
                  p="0.5rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {picture ? (
                    <FlexBetween gap={1}>
                      <Typography variant="caption">
                        {getTrimImageName(picture, 10)}
                      </Typography>
                      <MdOutlineModeEditOutline />
                    </FlexBetween>
                  ) : (
                    <Typography variant="subtitle2">
                      Upload Profile Image
                    </Typography>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>
        </Stack>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          About Me
        </Typography>
        <TextField
          {...register("bio", { maxLength: BIO_MAX_LENGTH })}
          name="bio"
          label="Bio"
          fullWidth
          multiline
          required
          minRows={2}
          maxRows={5}
        />
        {errors.bio && errors.bio.type === "maxLength" && (
          <Typography color="error" variant="subtitle2">
            Bio cannot exceed {BIO_MAX_LENGTH} characters.
          </Typography>
        )}

        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="medium"
            sx={{
              textTransform: "capitalize",
              mt: 2,
            }}
            type="submit"
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProfileForm;
