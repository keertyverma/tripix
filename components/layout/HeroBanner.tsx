import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

const HeroBanner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        ml: { sm: "30px", xs: "5px" },
        mt: { sm: "30px", xs: "5px" },
      }}
      position="relative"
      p="10px"
    >
      <Box sx={{ p: { xs: "10px", sm: "24px" } }}>
        <Typography
          variant="h1"
          fontWeight="600"
          sx={{
            fontSize: { xs: "50px", sm: "70px" },
          }}
        >
          <p>Share</p>
          <p className="gradient">Connect</p>
          <p>Explore</p>
        </Typography>

        <Box sx={{ mt: { xs: "10px", sm: "20px" } }}>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "20px", sm: "25px" },
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
              xs: "10px",
              md: "20px",
            },
            mb: {
              xs: "20px",
            },
            fontSize: {
              xs: "15px",
              sm: "18px",
            },
            textTransform: "capitalize",
          }}
        >
          Get Started
        </Button>
      </Box>
      {/* hide banner image on mobile */}
      <Box
        width="100%"
        sx={{
          maxWidth: { xs: "100%", sm: "65%" },
          ml: { sm: "9rem" },
        }}
      >
        <Image
          src="/images/banner.jpg"
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
