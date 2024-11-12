import React, { useEffect, useState } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import Main from "../Main/Main";
import FooterBar from "../Footer/FooterBar";
import styled from "styled-components";
import IntroModal from "../Modals/IntroModal";
import QrCodeModal from "../Modals/QrCodeModal";

const CollectionGameContainer = (props) => {
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [showQrCodeModal, setShowQrCodeModal] = useState(false);

  const openIntroModal = () => setShowIntroModal(true);
  const closeIntroModal = () => setShowIntroModal(false);

  const openQrCodeModal = () => setShowQrCodeModal(true);
  const closeQrCodeModal = () => setShowQrCodeModal(false);

  useEffect(() => {
    const introLoaded = localStorage.getItem("introLoaded");
    if (!introLoaded) {
      openIntroModal();
      localStorage.setItem("introLoaded", "true");
    }
  }, []);

  return (
    <React.Fragment>
      <Router>
        <AppContainer>
          <CssBaseline />
          <Main />
          <IntroModal show={showIntroModal} onCloseModal={closeIntroModal} />
          <QrCodeModal show={showQrCodeModal} onCloseModal={closeQrCodeModal} />
        </AppContainer>
        <FooterBar
          onOpenIntroModal={openIntroModal}
          onOpenQrCodeModal={openQrCodeModal}
        />
      </Router>
    </React.Fragment>
  );
};

export default CollectionGameContainer;

const AppContainer = styled.div``;
