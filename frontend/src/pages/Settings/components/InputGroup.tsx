import { styled } from "@mui/material/styles/";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled("label")``;

const InputWrapper = styled("div")`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Icon = styled("img")`
  width: 30px;
`;

const Input = styled("input")<{
  isTextField?: string;
}>`
  height: ${(props) => (props.isTextField === "true" ? "140px" : "40px")};
  padding-top: ${(props) => (props.isTextField === "true" ? "15px" : "0px")};
  padding-left: 15px;
  border-radius: 5px;
  border: 1px solid #000;
  font-size: 1rem;
  width: 100%;
`;

interface InputGroupProps {
  label?: string;
  name?: string;
  type?: string;
  defaultValue?: string;
  icon?: string;
  isTextField?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = (props) => {
  return (
    <Container>
      <Label htmlFor={props.name}>{props.label}</Label>
      <InputWrapper>
        {props.icon && <Icon src={props.icon} />}
        <Input
          type={props.type}
          id={props.name}
          defaultValue={props.defaultValue}
          as={props.isTextField ? "textarea" : "input"}
          isTextField={props.isTextField ? "true" : "false"}
        />
      </InputWrapper>
    </Container>
  );
};

export default InputGroup;
