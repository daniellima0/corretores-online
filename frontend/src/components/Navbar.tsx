import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import logo from "../assets/logo-black.svg";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "./Loading";

function NavBar() {
  const [userType, setUserType] = React.useState("user");
  const [userId, setUserId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/auth/check", {
          method: "GET",
          credentials: "include",
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch research data");
        }
        const json = await response.json();
        setUserId(json.user_id);
        setUserType(json.auth_status);
        console.log(json.auth_status);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pages = [];

  if (userType == "realtor") {
    pages.push(
      { nickname: "Mapa", route: "home-page" },
      { nickname: "Configurações", route: "settings" },
      { nickname: "Meu Perfil", route: `profile/${userId}` }
    );
  } else if (userType == "user") {
    pages.push(
      { nickname: "Mapa", route: "home-page" },
      { nickname: "Configurações", route: "settings" }
    );
  }

  const settings = ["Sair"];

  const LogoStyled = styled("img")(() => ({
    height: "45px",
  }));

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    fetch("http://localhost:8080/auth/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch research data");
        }
      })
      .then(() => {
        navigator("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "white", boxShadow: "0 1px 10px 0px rgba(0, 0, 0, 0.2)" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoStyled
            src={logo}
            alt="Logo"
            style={{ height: "45px" }}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "black", size: "large" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.route} onClick={handleCloseNavMenu}>
                  <Typography color="black" textAlign="center">
                    <Link
                      to={`/${page.route}/`}
                      style={{ textDecoration: "inherit", color: "inherit" }}
                    >
                      {page.nickname}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LogoStyled
            src={logo}
            alt="Logo"
            style={{ height: "45px" }}
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-around",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.route}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                <Link
                  to={`/${page.route}`}
                  style={{ textDecoration: "inherit", color: "inherit" }}
                >
                  {page.nickname}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Opções">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={"a"} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleLogout}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
