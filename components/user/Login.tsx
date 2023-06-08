import { Box, Typography, Button, TextField, Stack } from "@mui/material";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { AppwriteException } from "appwrite";
import { useState } from "react";

import useLogin from "@/hooks/auth/useLogin";
import Loader from "../ui/Loader";
import { authService } from "@/services";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const userLogin = useLogin();
  const [error, setError] = useState<string | null>(null);

  const handleLoginWithEmailAndPass = (email: string, password: string) => {
    userLogin.mutate(
      {
        email,
        password,
      },
      {
        onSuccess() {
          //TODO: navigate user to dashboard
          router.push("/");
        },
        onError(error) {
          const appWriteError = error as AppwriteException;
          setError(appWriteError.message);
        },
      }
    );
  };

  const handleLoginWithGoogle = () => {
    authService.loginWithGoogle();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: { xs: "30px 5px 0 5px", sm: "10px" },
      }}
    >
      <Typography
        variant="h1"
        fontSize={{ xs: "25px", sm: "35px" }}
        fontWeight="bold"
      >
        Log In
      </Typography>

      <form
        className="login-form"
        onSubmit={handleSubmit((data) => {
          handleLoginWithEmailAndPass(data.email, data.password);
        })}
      >
        <Stack
          sx={{
            width: { xs: "250px", sm: "350px" },
            gap: { xs: "10px", sm: "15px" },
            mt: { xs: "30px", sm: "40px" },
          }}
        >
          {error && (
            <Typography variant="subtitle1" color="error" textAlign="center">
              {error}
            </Typography>
          )}
          {userLogin.isLoading && <Loader />}

          <TextField
            {...register("email")}
            name="email"
            label="Email"
            type="email"
            required
          />
          <TextField
            {...register("password")}
            name="password"
            label="Password"
            type="password"
            required
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              width: "100%",
              textTransform: "capitalize",
              fontSize: { xs: "15px", sm: "20px" },
            }}
            type="submit"
          >
            Login
          </Button>
        </Stack>
      </form>
      <Typography variant="subtitle1" sx={{ mt: { xs: "10px", sm: "15px" } }}>
        Do not have an account?{" "}
        <Link href="/register" className="signup-link">
          Sign up
        </Link>{" "}
      </Typography>
      <Typography
        variant="subtitle1"
        className="with-separators"
        sx={{
          fontSize: "15px",
          mt: { xs: "10px", sm: "15px" },
          mb: { xs: "10px", sm: "15px" },
        }}
      >
        or
      </Typography>
      <Button
        variant="outlined"
        color="secondary"
        size="large"
        sx={{ textTransform: "none" }}
        onClick={handleLoginWithGoogle}
      >
        <Stack
          direction="row"
          gap="10px"
          alignItems="center"
          justifyContent="center"
          sx={{ width: { xs: "200px", sm: "310px" } }}
        >
          <FcGoogle size={20} />
          <Typography variant="h6" fontSize={{ xs: "15px", sm: "20px" }}>
            Login with Google
          </Typography>
        </Stack>
      </Button>
    </Box>
  );
};

export default Login;
