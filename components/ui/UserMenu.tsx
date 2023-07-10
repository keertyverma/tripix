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
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import { MdLogout, MdOutlineCreate } from "react-icons/md";
import { RiMoonLine } from "react-icons/ri";
import FlexBetween from "../../components/ui/FlexBetween";
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
  const router = useRouter();

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
            minWidth: { xs: "95%", sm: "10rem" },
          },
          "& .MuiMenuItem-root": {
            display: "flex",
            gap: "0.4rem",
            justifyContent: "stretch",
            ml: "0.5rem",
          },
          "& .MuiMenuItem-root:first-of-type": {
            justifyContent: "center",
          },
        }}
        elevation={2}
      >
        <MenuItem onClick={handleClose}>
          <Box>
            <FlexBetween gap={1} mb={1}>
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
                <Avatar sx={{ width: 45, height: 45, bgcolor: "#57CC99" }}>
                  <Typography> {getUserInitials(user?.name)}</Typography>
                </Avatar>
              </Box>
              <Box>
                <Typography variant="subtitle1" color="primary">
                  {user?.name}
                </Typography>
                <Typography variant="subtitle2" color="#9DB2BF">
                  {user?.email}
                </Typography>
              </Box>
            </FlexBetween>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{
                textTransform: "capitalize",
                borderRadius: "20px",
                p: "0.1rem",
              }}
              onClick={() => router.push("/profile")}
            >
              View Profile
            </Button>
          </Box>
        </MenuItem>
        <Divider />
        <Hidden smUp>
          <MenuItem onClick={handleClose}>
            <MdOutlineCreate color={theme.palette.secondary.main} />
            <Link href="/post/create" className="menu-link">
              <Typography>Create</Typography>
            </Link>
          </MenuItem>
          <Divider />
        </Hidden>
        <MenuItem>
          <FlexBetween gap={1.4}>
            <RiMoonLine color={theme.palette.secondary.main} />
            <FlexBetween gap={1}>
              <Typography color="secondary">Dark Mode</Typography>
              <Switch size="small" color="secondary" />
            </FlexBetween>
          </FlexBetween>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <MdLogout color={theme.palette.secondary.main} />
          <Logout />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
