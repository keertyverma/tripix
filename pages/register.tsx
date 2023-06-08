import { Box, Grid, Hidden } from "@mui/material";
import Image from "next/image";

import { Signup } from "@/components";
import Head from "next/head";

const register = () => {
  return (
    <>
      <Head>
        <title>Tripix - Register</title>
        <meta
          name="description"
          content="Register user to tripix by creating account"
        ></meta>
      </Head>
      <Grid
        container
        spacing={2}
        sx={{
          mt: { xs: "10px", sm: "20px" },
          px: { xs: "10px", sm: "20px" },
        }}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Signup />
          </Box>
        </Grid>
        <Hidden smDown>
          <Grid item md={6}>
            <Image
              src="/images/nature.webp"
              alt="user register"
              className="side-image"
              width={600}
              height={400}
            />
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};

export default register;
