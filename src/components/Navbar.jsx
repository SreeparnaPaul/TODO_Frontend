import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import UserApi from "../network/UserApi";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const token = JSON.parse(localStorage.getItem("token"));
  const username = JSON.parse(localStorage.getItem("userName"));
  const navigate = useNavigate();
  const { logoutUser, logoutUserFromAllDevice } = UserApi();

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#ffffff", color: "black" }}
    >
      <Container maxWidth="l">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {" "}
            TODO-APP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
            ></Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
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
          >
            TODO-APP
          </Typography>
          <Button
            style={{ color: "black" }}
            onClick={(e) => {
              e.preventDefault();
              logoutUserFromAllDevice();
            }}
          >
            <b>Log Out From All Device</b>
          </Button>
          <Button
            style={{ color: "black" }}
            onClick={(e) => {
              e.preventDefault();
              logoutUser();
            }}
          >
            <b>Log Out</b>
          </Button>
          {!token ? (
            <Button
              style={{ color: "black" }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <b>Sign In</b>
            </Button>
          ) : (
            <Button style={{ color: "black" }}>
              <b>{username}</b>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
