import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectUf({
  placeholder,
  uf,
  setUf,
  possibleUfs,
}: {
  placeholder: string;
  uf: string;
  setUf: any;
  possibleUfs: any;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedUf = event.target.value as string;
    setUf(selectedUf);
  };

  return (
    <Box
      sx={{
        minWidth: 120,
        width: "100%",
        paddingTop: "20px",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
        <Select
          sx={{ borderRadius: "15px" }}
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={uf}
          label={placeholder}
          onChange={handleChange}
        >
          {possibleUfs.map((uf: any) => (
            <MenuItem key={uf.uf} value={uf.uf}>
              {uf.uf}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
