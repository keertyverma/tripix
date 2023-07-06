import { Stack, IconButton, InputAdornment, TextField } from "@mui/material";
import { useRef } from "react";
import { BsSearch, BsXCircle } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
  onReset: () => void;
}
const SearchInput = ({ onSearch, onReset }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    if (searchRef.current) {
      searchRef.current.value = "";
    }
    onReset();
  };

  return (
    <form
      className="search-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(searchRef.current?.value || "");
      }}
    >
      <TextField
        inputRef={searchRef}
        variant="outlined"
        color="secondary"
        placeholder="Search memories..."
        sx={{
          width: { xs: "100%", sm: "50%" },
          marginTop: { xs: "10px", sm: "20px" },
          "& .MuiInputBase-root": {
            borderRadius: "20px",
          },
          "& .MuiInputBase-input": {
            padding: "12px 14px",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Stack direction="row" gap={2}>
                <IconButton edge="end" aria-label="search" type="submit">
                  <BsSearch color="#38a3a5" />
                </IconButton>
                <IconButton edge="end" aria-label="reset" onClick={handleClear}>
                  <BsXCircle />
                </IconButton>
              </Stack>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchInput;
