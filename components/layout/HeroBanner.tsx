import { useAuth } from "@/providers/auth";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
  const { user, loading } = useAuth();

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
            textAlign: { xs: "center", sm: "left" },
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
              textAlign: { xs: "center", sm: "left" },
              lineHeight: "1.5",
            }}
          >
            <p>Share travel memories</p>
            <p>Spread the joy</p>
          </Typography>
        </Box>

        <Box
          display="flex"
          sx={{
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          <Link href={!loading && user ? "/dashboard" : "/auth/register"}>
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
          </Link>
        </Box>
      </Box>
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
