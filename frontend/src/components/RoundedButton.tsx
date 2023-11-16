import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const Container = styled(Button, {
  // This shouldForwardProp is needed to prevent emotion from passing the buttonColor and invertColor props to the DOM element as attributes
  shouldForwardProp: (prop) => prop !== "buttonColor" && prop !== "invertColor",
})<{
  buttonColor: string;
  invertColor: boolean;
}>(
  {
    width: "fit-content",
    alignSelf: "center",
    borderRadius: "20px",
  },
  (props) => ({
    backgroundColor: props.invertColor ? "white" : props.buttonColor,
    border: `1px solid ${props.buttonColor}`,
    color: props.invertColor ? props.buttonColor : "white",
    ":hover": {
      backgroundColor: props.invertColor ? "white" : props.buttonColor,
      border: `1px solid ${props.buttonColor}`,
      color: props.invertColor ? props.buttonColor : "white",
    },
  })
);

interface RoundedButtonProps {
  onClick?: () => void;
  children?: string;
  buttonColor?: string;
  invertColor?: boolean;
}

const RoundedButton: React.FC<RoundedButtonProps> = (props) => {
  return (
    <Container
      buttonColor={props.buttonColor || "#000"}
      invertColor={props.invertColor || false}
      onClick={props.onClick}
      variant="contained"
    >
      {props.children}
    </Container>
  );
};

export default RoundedButton;
