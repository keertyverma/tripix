import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import Logout from "../auth/Logout";
import { useAuth } from "@/providers/auth";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user } = useAuth();

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.1)",
            padding: "5px",
            borderRadius: "50%",
            mb: "3px",
          }}
        >
          <Avatar sx={{ width: 40, height: 40, bgcolor: "#57CC99" }}>
            {" "}
            {user?.name
              .split(" ")
              .map((d) => d[0])
              .join("")
              .toUpperCase()}
          </Avatar>
        </Box>
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
        <MenuItem
          onClick={handleClose}
          sx={{ padding: { xs: "0 10px", sm: "0 30px" } }}
        >
          <Link href="/profile" className="menu-link">
            <Typography>My Profile</Typography>
          </Link>
        </MenuItem>
        <Divider />
        <Hidden smUp>
          <MenuItem onClick={handleClose} sx={{ padding: { xs: "0 10px" } }}>
            <Link href="/post/create" className="menu-link">
              <Typography>Create</Typography>
            </Link>
          </MenuItem>
          <Divider />
        </Hidden>
        <MenuItem
          onClick={handleClose}
          sx={{ padding: { xs: "0 10px", sm: "0 30px" } }}
        >
          <Logout />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
