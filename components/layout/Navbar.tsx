import { useAuth } from "@/providers/auth";
import {
  Box,
  Button,
  Hidden,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { FcMenu } from "react-icons/fc";
import UserMenu from "../ui/UserMenu";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useAuth();

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box boxShadow="0px 6px 4px rgba(0, 0, 0, 0.1)">
      <nav>
        <Stack
          direction="row"
          px="10px"
          mt="10px"
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

          {/* Desktop Navigation */}
          <Hidden smDown>
            {user ? (
              <Stack
                direction="row"
                fontSize="24px"
                alignItems="flex-end"
                justifyContent="space-between"
                sx={{ gap: { lg: "120px", md: "100px", sm: "50px" } }}
              >
                <Box
                  sx={{
                    alignSelf: "center",
                    justifySelf: "center",
                  }}
                >
                  <Link href="/post/create">
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      sx={{
                        borderRadius: "9999px",
                        textTransform: "capitalize",
                        fontSize: "18px",
                      }}
                    >
                      Create
                    </Button>
                  </Link>
                </Box>

                <UserMenu />
              </Stack>
            ) : (
              <Stack
                direction="row"
                fontSize="24px"
                alignItems="flex-end"
                sx={{ gap: { lg: "20px", xs: "15px" } }}
              >
                <Link href="/auth/login">
                  <Button
                    variant="outlined"
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
                <Link href="/auth/register">
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
              </Stack>
            )}
          </Hidden>

          {/* Mobile Navigation */}
          <Hidden smUp>
            {user ? (
              <UserMenu />
            ) : (
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
                    <Link href="/auth/login" className="menu-link">
                      Login
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    style={{ borderTop: "1px solid #ccc" }}
                  >
                    <Link href="/auth/register" className="menu-link">
                      Sign Up
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Hidden>
        </Stack>
      </nav>
    </Box>
  );
};

export default Navbar;
