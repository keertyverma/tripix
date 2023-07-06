import { useAuth } from "@/providers/auth";
import { getUserInitials } from "@/utils/helper";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { MdCreate, MdLogout } from "react-icons/md";
import { RiAccountPinBoxLine } from "react-icons/ri";
import Logout from "../auth/Logout";

const UserMenu = () => {
  const theme = useTheme();
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
            padding: "0.2rem",
            borderRadius: "50%",
            mb: "0.1rem",
          }}
        >
          <Avatar sx={{ width: 35, height: 35, bgcolor: "#57CC99" }}>
            <Typography> {getUserInitials(user?.name)}</Typography>
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
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 1,
            marginTop: 1,
            minWidth: { xs: "80%", sm: "10rem" },
          },
          "& .MuiMenuItem-root": {
            display: "flex",
            gap: "0.4rem",
            justifyContent: "center",
          },
        }}
        elevation={2}
      >
        <MenuItem onClick={handleClose}>
          <RiAccountPinBoxLine color={theme.palette.secondary.main} />
          <Link href="/profile" className="menu-link">
            <Typography>Profile</Typography>
          </Link>
        </MenuItem>
        <Divider />
        <Hidden smUp>
          <MenuItem onClick={handleClose}>
            <MdCreate color={theme.palette.secondary.main} />
            <Link href="/post/create" className="menu-link">
              <Typography>Create</Typography>
            </Link>
          </MenuItem>
          <Divider />
        </Hidden>
        <MenuItem onClick={handleClose}>
          <MdLogout color={theme.palette.secondary.main} />
          <Logout />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
