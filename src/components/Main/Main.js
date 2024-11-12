import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { themeColors } from "../../styles/colors";

import HomeScreen from "../Home/Home";
import ScanScreen from "../Scan/Scan";

import UnauthorisedScreen from "../Unauthorised/Unauthorised";
import BadRequestScreen from "../BadRequest/BadRequest";
import PrizeScreen from "../InfoScreens/PrizeScreen";

const Main = (props) => {
  return (
    <AppContainer fluid="lg">
      <Routes>
        <Route path="/" element={<HomeScreen address={props.address}/>} />
        <Route path="/scan" element={<ScanScreen sdk={props.sdk}/>} />
        <Route path="/unauthorised" element={<UnauthorisedScreen />} />
        <Route path="/badrequest" element={<BadRequestScreen />} />
        <Route path="/prizes" element={<PrizeScreen />} />
      </Routes>
    </AppContainer>
  );
};

export default Main;

const AppContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 800px;
  height: 100vh;
  margin: 0 auto;
  padding: 0 !important;
  background-color: ${themeColors.background};
`;
