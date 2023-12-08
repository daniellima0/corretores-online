import logo from "../../../assets/logo-white.svg";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";

const pages = ["Entrar", "Cadastrar"];

function NavLogin() {
  const LogoStyled = styled("img")(() => ({
    height: "45px",
  }));

  const ButtonContained = styled(Button)(() => ({
    padding: "3px",
    borderRadius: "8px",
    width: "120px",
    backgroundColor: "#ffffff",
    textTransform: "none",
    color: "#FF5E00",
    fontSize: "17px",
    fontWeight: 800,
    marginRight: "10px",
    "&: hover": { backgroundColor: "#FF5E00", color: "#ffffff" },
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    padding: "3px",
    borderRadius: "8px",
    width: "120px",
    textTransform: "none",
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: 800,
    border: "none",
    "&: hover": {
      backgroundColor: "rgba(0,0,0,0.18)",
      color: "#ffffff",
      border: "none",
    },
    [theme.breakpoints.down("md")]: {},
  }));

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoStyled
            src={logo}
            alt="Logo"
            style={{ height: "45px" }}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <LogoStyled
            src={logo}
            alt="Logo"
            style={{ height: "45px" }}
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "flex-end",
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "white", size: "large" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page) =>
              page === "Entrar" ? (
                <ButtonContained variant="contained" key={page}>
                  <Link
                    to="/login"
                    style={{ textDecoration: "inherit", color: "inherit" }}
                  >
                    {page}
                  </Link>
                </ButtonContained>
              ) : (
                <ButtonStyled variant="outlined" key={page}>
                  <Link
                    to="/choose-signup"
                    style={{ textDecoration: "inherit", color: "inherit" }}
                  >
                    {page}
                  </Link>
                </ButtonStyled>
              )
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavLogin;
