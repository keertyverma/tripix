import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          mt: { xs: "5px", sm: "30px" },
        }}
      >
        <Stack
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
          justifyContent="space-between"
          alignItems="center"
          px="40px"
        >
          <Typography
            variant="subtitle1"
            sx={{ fontSize: { xs: "10px", sm: "15px" } }}
          >
            Made by{" "}
            <a
              href="https://www.linkedin.com/in/keertyverma/"
              className="footer-link"
            >
              Keerty
            </a>{" "}
          </Typography>
          <Stack
            direction="row"
            gap="5px"
            alignItems="center"
            sx={{ display: { xs: "none", sm: "flex" }, ml: { sm: "10px" } }}
          >
            <Image
              src="/images/logo.png"
              alt="app logo"
              width={25}
              height={25}
            />{" "}
            <Typography
              variant="h6"
              fontWeight="bold"
              color="#3F7A9C"
              sx={{ fontSize: { xs: "30px", sm: "25px" } }}
            >
              tripix
            </Typography>
          </Stack>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: { xs: "10px", sm: "15px" } }}
          >
            <span className="copyright">&copy; Copyright 2023</span>
          </Typography>
        </Stack>
      </Box>
    </footer>
  );
};

export default Footer;
