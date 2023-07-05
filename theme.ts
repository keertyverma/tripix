import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#22577A",
    },
    secondary: {
      main: "#38A3A5",
      light: "#6EF3D6",
      dark: "#38A3A5",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
  },
});

theme = responsiveFontSizes(theme);
export default theme;
