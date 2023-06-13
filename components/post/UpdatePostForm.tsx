import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { localeService } from "@/services";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import { Country, IPost, IUpdatePost } from "@/entities";
import useUpdatePost from "@/hooks/post/useUpdatePost";
import { AppwriteException } from "appwrite";
import lodash from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "../ui/Loader";

interface Props {
  post: IPost;
}

const UpdatePostForm = ({ post }: Props) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs(post.date));
  const [countries, setContries] = useState<Country[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState(post.description);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: post.title,
      city: post.city,
      country: post.country,
      date: post.date,
    },
  });

  const router = useRouter();
  const updatePost = useUpdatePost();

  useEffect(() => {
    localeService.getCountries().then((res) => {
      setContries(res.countries);
    });
  }, []);

  const handleTextareChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handleFormSubmit = handleSubmit(async (data) => {
    // get form data
    const upldatedPost: IUpdatePost = {
      id: post.id,
      data: {
        title: data.title,
        description: description,
        date: date?.toISOString() as string,
        city: lodash.capitalize(data?.city),
        country: data?.country,
      },
    };

    // update post
    updatePost.mutate(upldatedPost, {
      onSuccess() {
        router.push("/profile");
      },
      onError(err) {
        console.log(err);
        const appWriteError = err as AppwriteException;
        setError(appWriteError.message);
      },
    });
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
              width={350}
              height={350}
              className="image-fit"
            />
          </Box>
        </Box>
        <TextField
          {...register("title")}
          name="title"
          label="Title"
          type="text"
          required
          sx={{ padding: "0" }}
        />
        <TextField
          // {...register("description")}
          name="description"
          label="Description"
          value={description}
          onChange={handleTextareChange}
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
              defaultValue={(post?.country as string) || ""}
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
        <Divider />
        <Stack
          direction="row"
          sx={{
            gap: { xs: "20px", sm: "40px" },
          }}
          justifyContent="center"
          alignItems="center"
          mt={1}
          mb={3}
        >
          {updatePost.isLoading && <Loader />}
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              textTransform: "capitalize",
              fontSize: { xs: "15px", sm: "20px" },
            }}
            type="submit"
            disabled={updatePost.isLoading}
          >
            Update
          </Button>
          <Link href="/profile">
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

export default UpdatePostForm;
