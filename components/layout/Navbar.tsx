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
    <Box boxShadow="0px 2px 20px rgba(0, 0, 0, 0.1)" p="0.5rem 2rem">
      <nav>
        <Stack
          direction="row"
          sx={{ gap: { sm: "7.6rem", xs: "2.5rem" } }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            href={user ? "/dashboard" : "/"}
            style={{ textDecoration: "none" }}
          >
            <Stack
              direction="row"
              gap="0.3rem"
              alignItems="center"
              sx={{ ml: { sm: "1rem" } }}
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
                sx={{ fontSize: { xs: "1.9rem", sm: "2.2rem" } }}
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
                alignItems="flex-end"
                justifyContent="space-between"
                sx={{ gap: { sm: "3rem" } }}
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
                      size="small"
                      color="primary"
                      sx={{
                        borderRadius: "10px",
                        textTransform: "capitalize",
                        fontSize: "1.1rem",
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
                fontSize="1.5rem"
                alignItems="flex-end"
                justifyContent="center"
                gap={1}
              >
                <Link href="/auth/login">
                  <Button
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
                  <FcMenu style={{ fontSize: "1.5rem" }} />
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
