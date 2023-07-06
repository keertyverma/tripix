import { useAuth } from "@/providers/auth";
import { authService } from "@/services";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  return (
    <Button
      size="medium"
      color="secondary"
      sx={{
        textTransform: "capitalize",
        padding: "0.3rem",
        minWidth: "0",
      }}
      onClick={() => {
        authService.logout().then((res) => {
          setUser(null);
          router.push("/");
        });
      }}
    >
      <Typography>Logout</Typography>
    </Button>
  );
};

export default Logout;
