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
        m: { sm: "1.2rem 0 0 1.2rem", xs: "0.5rem 0 0 0.5rem" },
      }}
      position="relative"
      p="1.5rem"
    >
      <Box>
        <Typography
          variant="h1"
          fontWeight="600"
          sx={{
            fontSize: { xs: "3rem", sm: "4rem" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <p>Share</p>
          <p className="gradient">Connect</p>
          <p>Explore</p>
        </Typography>
        <Box sx={{ mt: { xs: "1rem", sm: "1.5rem" } }}>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
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
                m: { xs: "0.6rem 0 1.25rem 0", md: "1.25rem 0" },
                fontSize: "1rem",
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
