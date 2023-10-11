import { styled } from "@mui/material/styles";
import logo from "../assets/logo-white.png";

const Container = styled("footer")`
    margin-top: 80px;
    height: 250px;
    background-color: ${({ theme }) => theme.customPallete.grey};
    padding: 0 40px;
    display: flex;
`;

const Logo = styled("img")`
    align-self: center;
    width: 130px;
    margin-top: 20px;
`;

const Footer = () => {
    return (
        <Container>
            <Logo src={logo} alt="Logo" />
        </Container>
    );
};

export default Footer;
