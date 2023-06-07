import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

const HeroBanner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        ml: { sm: "30px", xs: "20px" },
        mt: { sm: "30px", xs: "20px" },
      }}
      position="relative"
      p="10px"
    >
      <Box sx={{ p: { xs: "10px", sm: "24px" } }}>
        <Typography
          variant="h1"
          fontWeight="600"
          sx={{
            fontSize: { xs: "60px", sm: "96px" },
          }}
        >
          <p>Share</p>
          <p className="gradient">Connect</p>
          <p>Explore</p>
        </Typography>

        <Box sx={{ mt: { xs: "15px", sm: "30px" } }}>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "20px", sm: "34px" },
              lineHeight: "1.5",
            }}
          >
            <p>Share travel memories</p>
            <p>Spread the joy</p>
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            mt: {
              xs: "20px",
              md: "20px",
            },
          }}
        >
          Get Started
        </Button>
      </Box>
      {/* hide banner image on mobile */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          maxWidth: "100%",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "flex-end",
          p: 3,
        }}
      >
        <Image
          src="/images/banner.webp"
          alt="hero banner"
          className="hero-banner-image"
          width={800}
          height={600}
        />
      </Box>
    </Box>
  );
};

export default HeroBanner;
