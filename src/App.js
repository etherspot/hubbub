import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyle from "./styles/global";
import { useEffect } from "react";
// import Web3 from 'web3';
import styled from "styled-components";
import qs from "qs";
import { ReactComponent as AAHubSvg } from "./assets/icons/AA-community-hub-logo.svg";
import Spacing from "./components/Spacing";
import { LinearProgress, Typography } from "@mui/material";
import SignIn from './components/SignIn';
import { useFirebase } from "./hooks/firebase";
import { useSdk } from "./hooks/etherspotSdk";

function App() {
  // const { ready, authenticated, user, login, logout } = usePrivy();
  const { initialiseFirebase } = useFirebase();
  const { score, isInitialised } = useSdk();

  const query = qs.parse(window.location.search.substring(1));

  useEffect(() => {
    const bootstrapApp = async () => {
      await initialiseFirebase();
    };

    bootstrapApp();
  }, [initialiseFirebase]);

  return (
    <div className="App">
      <GlobalStyle />
        <LoadingContainer>
          <StyledAAHubSvg /> <br />
          <p>The only multi-chain SDK you need</p>
          <Spacing h={32} />
          {query.redirectFrom ?
            <>
              <LinearProgress />
              <ScanCompleteText>
                Thanks for scanning - sending you back...
              </ScanCompleteText>
            </>
          :
          <SignIn />
          }
          { isInitialised ? <Typography variant='h6'>
            Score: {isInitialised ? score : 0}
          </Typography> : <></> }
          
        </LoadingContainer>
    </div>
  );
}

const LoadingContainer = styled.div`
  text-align: center;
  padding-top: 50px;
`;

const StyledAAHubSvg = styled(AAHubSvg)`
  width: 25rem;
  height: 25rem;
  margin-bottom: 15px;
`;

const ScanCompleteText = styled.p`
  margin-top: 30px;
`;


export default App;
