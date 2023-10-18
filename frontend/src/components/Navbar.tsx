import { styled } from "@mui/material/styles";
import logo from "../assets/logo-black.svg";
import profilePicture from "../assets/profile-picture.jpeg";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import ProfilePictureWithButton from "./ProfilePictureWithButton";

const Container = styled("div")`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 0 40px;
    height: 90px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const Logo = styled("img")`
    width: 130px;
`;

const Nav = styled("nav")`
    display: flex;
    justify-content: space-between;
    max-width: 500px;

    @media (max-width: 768px) {
        visibility: hidden;
        flex-direction: column;
        grid-column: 1 / 2;
        grid-row: 2 / 2;
    }
`;

const NavItem = styled("li")`
    list-style: none;

    a {
        text-decoration: none;
        color: ${({ theme }) => theme.palette.text.primary};
        cursor: pointer;
    }
`;

const ProfileContainer = styled("div")`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-self: end;

    @media (max-width: 768px) {
        grid-column: 2 / 3;
    }
`;

const Span = styled("span")`
    font-family: ${({ theme }) => theme.customTypography.bold};
`;

const Navbar: React.FC = () => {
    const name = "Marcel"; //TODO: get name dinamycally via api

    return (
        <Container>
            <Logo src={logo} />
            <Nav>
                <NavItem>
                    <Link to="">Início</Link>
                </NavItem>
                <NavItem>
                    <Link to="">Item 2</Link>
                </NavItem>
                <NavItem>
                    <Link to="">Item 3</Link>
                </NavItem>
                <NavItem>
                    <Link to="">Item 4</Link>
                </NavItem>
            </Nav>
            <ProfileContainer>
                <Typography variant="body1">
                    Olá, <Span>{name}!</Span>
                </Typography>
                <ProfilePictureWithButton src={profilePicture} width="50px" />
            </ProfileContainer>
        </Container>
    );
};

export default Navbar;
