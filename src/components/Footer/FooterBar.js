import * as React from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { styled as muistyled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import QrScannerIcon from "@mui/icons-material/QrCodeScanner";
import GameIcon from "@mui/icons-material/VideogameAsset";
import { Logout } from "@mui/icons-material";
import TrophyIcon from "@mui/icons-material/EmojiEvents";


const FooterBar = ({ onOpenIntroModal, onOpenQrCodeModal }) => {
  const navigate = useNavigate();
  const { logout } = useWeb3Auth()
  const location = useLocation();

  const onNavigate = (path) => {
    navigate(path, { replace: true });
  };

  const returnToHome = async () => {
    await logout();
    navigate("/");
  }

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ top: "auto", bottom: 0, justifyContent: "center" }}
    >
      <Toolbar>
      <IconButton color="inherit" onClick={() => onNavigate("/prizes")}>
          <TrophyIcon />
        </IconButton>
        <Link to={"/scan"}>
          <StyledFab color="secondary">
            <QrScannerIcon />
          </StyledFab>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        {location?.pathname === "/" ? (
          <>
            <IconButton
              color="inherit"
              onClick={returnToHome}
            >
              <Logout />
            </IconButton>
          </>
        ) : (
          <IconButton
            color="inherit"
            onClick={() =>
              onNavigate(
                `/?world=${localStorage.getItem(
                  "world"
                )}&playerId=${localStorage.getItem("playerId")}`
              )
            }
          >
            <GameIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default FooterBar;

const StyledFab = muistyled(Fab)({
  position: "fixed",
  zIndex: 100,
  bottom: 30,
  left: 0,
  right: 0,
  margin: "0 auto",
});
