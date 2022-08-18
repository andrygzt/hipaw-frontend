import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Button,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserAuth } from "../context/AuthContext";
import { User as UserIcon } from "../icons/user";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  const { user, logOut, human } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
            // provide function to delete users
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="User">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4}
color="primary"
variant="dot">
                <UserIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          {user ? (
            <>
              <Typography color="textSecondary"
display="inline"
sx={{ px: 2 }}>
                {user?.displayName}
              </Typography>
              <Button color="primary"
variant="contained"
onClick={handleSignOut}>
                LogOut
              </Button>
            </>
          ) : null}
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
