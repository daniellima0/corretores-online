import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const Container = styled(Button, {
  // This shouldForwardProp is needed to prevent emotion from passing the buttonColor and invertColor props to the DOM element as attributes
  shouldForwardProp: (prop) => prop !== "buttonColor" && prop !== "invertColor",
})<{
  buttonColor: string;
  invertColor: boolean;
  width: string;
}>(
  {
    alignSelf: "center",
    borderRadius: "20px",
  },
  (props) => ({
    width: props.width,
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
  width?: string;
}

const RoundedButton: React.FC<RoundedButtonProps> = (props) => {
  return (
    <Container
      buttonColor={props.buttonColor || "#FF5E00"}
      invertColor={props.invertColor || false}
      width={props.width || "fit-content"}
      onClick={props.onClick}
      variant="contained"
    >
      {props.children}
    </Container>
  );
};

export default RoundedButton;
