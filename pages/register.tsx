import { Box } from "@mui/material";
import Image from "next/image";

import { Signup } from "@/components";

const register = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        ml: { sm: "30px", xs: "5px" },
        mt: { sm: "30px", xs: "5px" },
      }}
      position="relative"
      p="10px"
    >
      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        <Image
          src="/images/nature.webp"
          alt="user register"
          // className="hero-banner-image"
          width={800}
          height={600}
        />
      </Box>
      <Signup />
    </Box>
  );
};

export default register;
