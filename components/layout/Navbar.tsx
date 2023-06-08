import {
  Stack,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FcMenu } from "react-icons/fc";
import { useState, MouseEvent } from "react";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <FcMenu style={{ fontSize: "25px" }} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link href="/register" className="menu-link">
                  Sign Up
                </Link>
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                style={{ borderTop: "1px solid #ccc" }}
              >
                <Link href="/login" className="menu-link">
                  Login
                </Link>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Stack
            direction="row"
            fontSize="24px"
            alignItems="flex-end"
            sx={{ gap: { lg: "20px", xs: "15px" } }}
          >
            <Link href="/register">
              <Button
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
            </Link>
            <Link href="/login">
              <Button
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
            </Link>
          </Stack>
        )}
      </Stack>
    </nav>
  );
};

export default Navbar;
