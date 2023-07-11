import { IUpdateProfile } from "@/entities";
import useUpdateProfile from "@/hooks/user-profile/useUpdateProfile";
import { storageService } from "@/services/storageService";
import { getTrimImageName, getUserInitials } from "@/utils/helper";
import {
  Avatar,
  Box,
  Button,
  IconButton,
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

interface IProfile {
  id: string;
  name: string;
  userId: string;
  bio: string;
  profilePicture: string | null;
  photoId: string;
}

interface Props {
  profile: IProfile;
}

const EditProfileForm = ({ profile }: Props) => {
  const BIO_MAX_LENGTH = 150;
  const { id, name, bio, profilePicture, photoId } = profile;

  const [profileImage, setProfileImage] = useState(profilePicture);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [isRemoveImage, setIsRemoveImage] = useState(false);

  const updateProfile = useUpdateProfile();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bio: bio,
    },
  });

  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const updatedProfile: IUpdateProfile = {
        id,
        data: {
          bio: data.bio as string,
        },
      };

      if (selectedImage) {
        // upload profile image
        const uploadImageRes = await storageService.uploadImage(selectedImage);
        const uploadedPhotoId = uploadImageRes.$id;

        //get preview image url
        updatedProfile.data.profilePicture =
          storageService.getPreviewImage(uploadedPhotoId).href;
        updatedProfile.data.photoId = uploadedPhotoId;
      } else if (isRemoveImage) {
        // remove profile image to storage bucket
        await storageService.deleteImage(photoId);
        updatedProfile.data.profilePicture = null;
        updatedProfile.data.photoId = "";
      }

      // update profile with bio and profile pic
      updateProfile.mutate(updatedProfile, {
        onSuccess() {
          // TODO: display notification message
          setLoading(false);
        },
        async onError(err) {
          const appWriteError = err as AppwriteException;
          setError(appWriteError.message);

          if (updatedProfile.data.photoId) {
            // delete uploaded image from storage bucket
            await storageService.deleteImage(updatedProfile.data.photoId);
          }
          setLoading(false);
        },
      });
    } catch (err) {
      const appWriteError = err as AppwriteException;
      setError(appWriteError.message);
      setLoading(false);
    }
  });

  const handleOnDrop = (file: File) => {
    setSelectedImage(file);

    // get image for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = (e?.target?.result as string).split(",")[1];
      setImagePreview(`data:image/jpeg;base64,${base64String}`);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setIsRemoveImage(true);
    if (selectedImage) {
      setSelectedImage(null);
      setImagePreview(null);
    } else {
      setProfileImage("");
    }
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
      {error && (
        <Typography variant="subtitle1" color="error" textAlign="center">
          {error}
        </Typography>
      )}
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
          <FlexBetween>
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
              {imagePreview || profileImage ? (
                <Image
                  width={isNonMobileScreen ? 120 : 100}
                  height={isNonMobileScreen ? 120 : 100}
                  src={imagePreview?.toString() ?? profileImage ?? ""}
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
            {(profileImage || selectedImage) && (
              <IconButton
                onClick={handleRemoveImage}
                sx={{ alignSelf: "start" }}
              >
                <AiOutlineCloseSquare size={15} />
              </IconButton>
            )}
          </FlexBetween>
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
                  {selectedImage ? (
                    <FlexBetween gap={1}>
                      <Typography variant="caption">
                        {getTrimImageName(selectedImage, 10)}
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
            disabled={isLoading}
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProfileForm;
