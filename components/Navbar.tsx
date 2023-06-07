import {
  Stack,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <nav>
      <Stack
        direction="row"
        px="20px"
        mt="20px"
        sx={{ gap: { sm: "122px", xs: "40px" } }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <Stack
            direction="row"
            gap="5px"
            alignItems="center"
            sx={{ ml: { sm: "10px" } }}
          >
            <Image
              src="/images/logo.png"
              alt="app logo"
              width={35}
              height={35}
            />
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#3F7A9C"
              sx={{ fontSize: { xs: "30px", sm: "35px" } }}
            >
              tripix
            </Typography>
          </Stack>
        </Link>
        {isMobile ? (
          <div>mobile</div>
        ) : (
          <Stack
            direction="row"
            fontSize="24px"
            alignItems="flex-end"
            sx={{ gap: { lg: "20px", xs: "15px" } }}
          >
            <Button
              href="/register"
              variant="contained"
              size="medium"
              color="primary"
              sx={{
                borderRadius: "10px",
                textTransform: "capitalize",
              }}
            >
              Sign Up
            </Button>

            <Button
              href="/login"
              variant="contained"
              size="medium"
              color="secondary"
              sx={{
                borderRadius: "10px",
                textTransform: "capitalize",
              }}
            >
              Login
            </Button>
          </Stack>
        )}
      </Stack>
    </nav>
  );
};

export default Navbar;
