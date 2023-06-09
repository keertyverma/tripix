import { Box, Grid, Hidden } from "@mui/material";
import Image from "next/image";
import { Login } from "@/components";
import Head from "next/head";

const login = () => {
  return (
    <>
      <Head>
        <title>Tripix - Login</title>
        <meta name="description" content="Login user to Tripix"></meta>
      </Head>
      <Grid
        container
        spacing={2}
        sx={{
          mt: { xs: "10px", sm: "20px" },
          px: { xs: "10px", sm: "20px" },
        }}
      >
        <Hidden smDown>
          <Grid item md={6}>
            <Image
              src="/images/nature.webp"
              alt="user login"
              className="side-image"
              width={600}
              height={400}
            />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Login />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default login;
