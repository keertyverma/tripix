import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { AppwriteException } from "appwrite";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import useLogin from "@/hooks/auth/useLogin";
import useSignup from "@/hooks/auth/useSignup";
import { useAuth } from "@/providers/auth";
import { authService } from "@/services";
import Loader from "../ui/Loader";

const SignupForm = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const signup = useSignup();
  const userLogin = useLogin();
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();

  const handleLoginWithGoogle = async () => {
    await authService.loginWithGoogle();
  };

  const handleLoginWithEmailAndPass = (email: string, password: string) => {
    userLogin.mutate(
      {
        email,
        password,
      },
      {
        onSuccess() {
          authService.getCurrentUser().then((res) => {
            setUser({ id: res.$id, name: res.name, email: res.email });
            router.push("/dashboard");
          });
        },
        onError(error) {
          const appWriteError = error as AppwriteException;
          setError(appWriteError.message);
        },
      }
    );
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
        Create your account
      </Typography>

      <form
        className="signup-form"
        onSubmit={handleSubmit((data) => {
          signup.mutate(
            {
              name: data.name,
              email: data.email,
              password: data.password,
            },
            {
              onSuccess() {
                handleLoginWithEmailAndPass(data.email, data.password);
              },
              onError(error) {
                const appWriteError = error as AppwriteException;
                setError(appWriteError.message);
              },
            }
          );
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
          {signup.isLoading && <Loader />}

          <TextField
            {...register("name")}
            name="name"
            label="Name"
            type="text"
            required
          />
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
            disabled={signup.isLoading}
          >
            Submit
          </Button>
        </Stack>
      </form>
      <Typography variant="subtitle1" sx={{ mt: { xs: "10px", sm: "15px" } }}>
        Already have an account?{" "}
        <Link href="/auth/login" className="login-link">
          Log In
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
            Sign-in with Google
          </Typography>
        </Stack>
      </Button>
    </Box>
  );
};

export default SignupForm;
