import { Box, IconButton } from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineCloseSquare } from "react-icons/ai";

interface Props {
  onClose: () => void;
  children: ReactNode;
}
const Portal = ({ onClose, children }: Props) => {
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById("portal-container");
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <Box
          position="fixed"
          left={0}
          top={0}
          pt="100px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="100vh"
          overflow="auto"
          zIndex={2}
          bgcolor="rgba(0, 0, 0, 0.763)"
        >
          <Box
            sx={{
              width: { xs: "90%", sm: "30%" },
              height: { xs: "80%", sm: "90%" },
            }}
            bgcolor="#fff"
            padding={1}
            display="flex"
            flexDirection="column"
          >
            <IconButton onClick={onClose} sx={{ alignSelf: "end" }}>
              <AiOutlineCloseSquare />
            </IconButton>
            <Box>{children}</Box>
          </Box>
        </Box>,
        ref.current
      )
    : null;
};

export default Portal;
