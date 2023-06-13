import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useForm } from "react-hook-form";
import useAddPost from "@/hooks/post/useAddPost";
import { useAuth } from "@/providers/auth";
import { localeService } from "@/services";
import { storageService } from "@/services/storageService";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AppwriteException } from "appwrite";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loader from "../ui/Loader";
import lodash from "lodash";
import { Country } from "@/entities";
import dayjs, { Dayjs } from "dayjs";

const CreatePostForm = () => {
  const { register, handleSubmit } = useForm();
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const { user } = useAuth();

  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [countries, setContries] = useState<Country[]>([]);

  const router = useRouter();
  const addPost = useAddPost();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localeService.getCountries().then((res) => {
      setContries(res.countries);
    });
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = (e?.target?.result as string).split(",")[1];

        setImagePreview(`data:image/jpeg;base64,${base64String}`);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFormSubmit = handleSubmit(async (data) => {
    // get form data
    const postData = {
      userId: user?.id as string,
      username: user?.name as string,
      title: data.title,
      description: data.description,
      date: date?.toISOString() as string,
      city: lodash.capitalize(data?.city),
      country: data?.country,
      photoUrl: data["photo-url"][0].name,
    };

    try {
      // upload photo
      setIsLoading(true);
      const uploadImgRes = await storageService.uploadImage(
        data["photo-url"][0]
      );
      const photoId = uploadImgRes.$id;

      // get preview image url
      postData.photoUrl = storageService.getPreviewImage(photoId).href;

      // create new post
      addPost.mutate(postData, {
        onSuccess() {
          router.push("/dashboard");
        },
        async onError(error) {
          const appWriteError = error as AppwriteException;
          setError(appWriteError.message);

          // delete uploaded image
          await storageService.deleteImage(photoId);
        },
      });
    } catch (err) {
      const appWriteError = err as AppwriteException;
      setError(appWriteError.message);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack
        sx={{
          width: { xs: "350px", sm: "500px" },
          gap: { xs: "10px", sm: "10px" },
          mt: { xs: "15px", sm: "20px" },
        }}
      >
        {error && (
          <Typography variant="subtitle1" color="error" textAlign="center">
            {error}
          </Typography>
        )}
        {imagePreview && (
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
                src={imagePreview.toString()}
                alt="Preview"
                width={350}
                height={350}
                className="image-fit"
              />
            </Box>
          </Box>
        )}
        <InputLabel htmlFor="photo-url">
          <Typography>Add Photo</Typography>
        </InputLabel>
        <TextField
          {...register("photo-url")}
          name="photo-url"
          id="photo-url"
          type="file"
          variant="standard"
          inputProps={{ accept: "image/*" }}
          onChange={handleFileUpload}
          required
        />

        <TextField
          {...register("title")}
          name="title"
          label="Title"
          type="text"
          required
          sx={{ padding: "0" }}
        />
        <TextField
          {...register("description")}
          name="description"
          label="Description"
          multiline
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>
        <Stack
          direction="row"
          gap={{ xs: "20px", sm: "40px" }}
          justifyContent="space-between"
        >
          <TextField
            {...register("city")}
            name="city"
            label="City"
            type="text"
          />
          <FormControl fullWidth>
            <InputLabel id="select-country-label">Country</InputLabel>
            <Select
              {...register("country")}
              name="country"
              labelId="select-country-label"
              label="Country"
              defaultValue=""
            >
              <MenuItem value="">Select Country</MenuItem>
              {countries?.map((country) => (
                <MenuItem key={country.code} value={`${country.name}`}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack
          direction="row"
          sx={{
            gap: { xs: "10px", sm: "15px" },
          }}
          justifyContent="center"
          alignItems="center"
          mt={1}
          mb={3}
        >
          {isLoading && <Loader />}
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              textTransform: "capitalize",
              fontSize: { xs: "15px", sm: "20px" },
            }}
            type="submit"
            disabled={isLoading}
          >
            Add
          </Button>
          <Link href="/dashboard">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{
                textTransform: "capitalize",
                fontSize: { xs: "15px", sm: "20px" },
              }}
            >
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </form>
  );
};

export default CreatePostForm;
