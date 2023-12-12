import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectQuestion({
  placeholder,
  question,
  setQuestion,
  possibleQuestions,
}: {
  placeholder: string;
  question: string;
  setQuestion: any;
  possibleQuestions: any;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedQuestion = event.target.value as string;

    setQuestion(selectedQuestion);
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
          value={question}
          label={placeholder}
          onChange={handleChange}
        >
          {possibleQuestions.map((question: any) => (
            <MenuItem key={question} value={question}>
              {question}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
