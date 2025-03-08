import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import getAvatar from "./getAvatar";
import { AuthContext } from "../../contexts/AuthContext";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onSignOut = () => {
    handleCloseUserMenu();
    signOut();
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      padding={"24px 40px 0 48px"}
      marginBottom={"17px"}
      alignItems={"center"}
    >
      <Typography
        fontWeight={600}
        color={"rgba(0, 91, 214, 1)"}
        fontSize={"20px"}
      >
        Roadlog
      </Typography>
      <Button
        onClick={handleOpenUserMenu}
        sx={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
          color: "rgba(51, 51, 51, 1)",
        }}
      >
        <Typography>{user?.email}</Typography>
        {user && (
          <Avatar
            src={getAvatar(user)}
            sx={{ width: "24px", height: "24px" }}
          />
        )}
      </Button>
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
        <MenuItem onClick={onSignOut}>Log Out</MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/");
          }}
        >
          My projects
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Header;
