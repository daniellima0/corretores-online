import { styled } from "@mui/material/styles";
import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";

const CodeInput = styled("input")({
  width: "30%",
  height: "100px",
  fontSize: "30px",
  textAlign: "center",
  border: "2px solid #B3B3B3",
  borderRadius: "10px",
  "&:focus": {
    outline: "none !important",
    border: "2px solid #FF5E00",
    transition: "0.3s",
  },

  "@media (max-width: 400px)": {
    height: "70px",
  },
});

const CodeInputBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "70%",
  flexDirection: "row",
  gap: "10px",
  height: "100px",

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

type CodeInputContainerProps = {
  onComplete: (finalString: string) => void;
  numDigits: number;
};

const CodeInputContainer = ({
  onComplete,
  numDigits,
}: CodeInputContainerProps) => {
  const [inputs, setInputs] = useState(Array(numDigits).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Atualiza a string final sempre que os inputs mudarem
  useEffect(() => {
    const finalString = inputs.join("");
    if (finalString.length === numDigits) {
      onComplete(finalString);
    }
  }, [inputs, onComplete]);

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);

    if (event.target.value && index < numDigits - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !inputs[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <CodeInputBox>
      {inputs.map((value, index) => (
        <CodeInput
          key={index}
          value={value}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          maxLength={1}
          autoFocus={index === 0}
          ref={(el) => (inputRefs.current[index] = el!)}
        />
      ))}
    </CodeInputBox>
  );
};

export default CodeInputContainer;
