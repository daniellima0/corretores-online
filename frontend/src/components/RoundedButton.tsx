import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const Container = styled(Button)`
    width: fit-content;
    align-self: center;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.customPallete.costumer};
`;

interface RoundedButtonProps {
    onClick?: () => void;
}

const RoundedButton: React.FC<RoundedButtonProps> = (props) => {
    return (
        <Container onClick={props.onClick} variant="contained">
            Quero entrar em contato
        </Container>
    );
};

export default RoundedButton;
