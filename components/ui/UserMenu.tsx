import { Box, Button, Hidden, Menu, MenuItem, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import Logout from "../auth/Logout";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.1)",
            padding: "5px",
            borderRadius: "50%",
          }}
        >
          <Image
            src="/images/profile-pic.png"
            alt="profile-pic"
            width={40}
            height={40}
          ></Image>
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
        <MenuItem onClick={handleClose} sx={{ padding: "10px 25px" }}>
          <Link href="/profile" className="menu-link">
            <Typography>My Profile</Typography>
          </Link>
        </MenuItem>
        <Hidden smUp>
          <MenuItem
            onClick={handleClose}
            sx={{ padding: "10px 10px", borderTop: "1px solid #ccc" }}
          >
            <Link href="/post/create" className="menu-link">
              <Typography>Create Memories</Typography>
            </Link>
          </MenuItem>
        </Hidden>
        <MenuItem
          onClick={handleClose}
          sx={{ padding: "10px 25px", borderTop: "1px solid #ccc" }}
        >
          <Logout />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
