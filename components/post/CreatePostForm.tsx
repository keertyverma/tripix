import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "@/providers/auth";
import { localeService } from "@/services";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const CreatePostForm = () => {
  const { register, handleSubmit } = useForm();
  const [date, setDate] = useState<string | null>(null);
  const { user } = useAuth();

  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [countries, setContries] = useState(null);

  useEffect(() => {
    localeService.getCountries().then((res) => {
      console.log("res = ", res);
      setContries(res.countries);
    });
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e?.target?.result?.split(",")[1];

        setImagePreview(`data:image/jpeg;base64,${base64String}`);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const postData = {
          userId: user?.id,
          title: data.title,
          description: data?.description,
          date: date,
          city: data?.city,
          country: data?.country,
          photoUrl: data["photo-url"][0],
        };

        console.log("form data = ", data);
        console.log("postData = ", postData);
        // store data
        // navigate to dashboard
      })}
    >
      <Stack
        sx={{
          width: { xs: "300px", sm: "500px" },
          gap: { xs: "10px", sm: "10px" },
          mt: { xs: "15px", sm: "20px" },
        }}
      >
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
            onChange={(newValue) => {
              setDate(newValue?.toISOString());
            }}
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

              <MenuItem value="nz">New Zealand</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <InputLabel htmlFor="photo-url">Add Photo</InputLabel>
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
        {imagePreview && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              padding={1}
              boxShadow="0px 6px 4px rgba(0, 0, 0, 0.1)"
            >
              <Image
                src={imagePreview.toString()}
                alt="Preview"
                width={200}
                height={200}
              />
            </Box>
          </Box>
        )}
        <Stack
          direction="row"
          sx={{
            gap: { xs: "10px", sm: "15px" },
          }}
          justifyContent="center"
          alignItems="center"
          mt={1}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              textTransform: "capitalize",
              fontSize: { xs: "15px", sm: "20px" },
            }}
            type="submit"
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
