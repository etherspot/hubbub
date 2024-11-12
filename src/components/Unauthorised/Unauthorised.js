import { getAuth } from "firebase/auth";
import styled from "styled-components";
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UnauthorisedScreen() {
  const navigate = useNavigate();
  const [couldNotFix, setCouldNotFix] = useState(false);

  useEffect(() => {
    const attemptRepair = async () => {
      console.log('Attempting repair...');

      const authenticated = getAuth();
      const idToken = await authenticated.currentUser.getIdToken();
  
      console.log('Fetched ID token:', idToken);

      const sessionResponse = await axios.get(`https://us-central1-collection-game-228c1.cloudfunctions.net/s?world=${localStorage.getItem("world")}&playerId=${localStorage.getItem("playerId")}`, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        },
      })
      .catch((e) => {
        console.error('An error occured whilst trying to fix the session:', e);
        return e;
      });

      if (sessionResponse instanceof Error) {
        alert('Sorry, we could not fix this session. Please come to the Etherspot stand and we will try and help further.');
        setCouldNotFix(true);
      } else {
        navigate(`/?world=${localStorage.getItem(
          "world"
        )}&playerId=${localStorage.getItem("playerId")}`);
      }
    }

    setTimeout(() => attemptRepair(), 3000);
  }, [navigate]);

  return(
    <UnauthorisedContainer>
      ❌
      <UnauthorisedContainerText>
        Sorry, your request was blocked because a security check failed.
        {/* <ul style={{marginTop: 20}}>
          <li>You're using Brave or WeChat browser</li>
          <li>You're security settings might be too high</li>
          <li>You're using a VPN</li>
        </ul> */}
        <RepairContainer>
          {couldNotFix ?
          'Sorry, we could not fix your game. Please come to the Etherspot stand and we will try and help further.'
          :
          <b>We're trying to repair your game...</b>
          }
        </RepairContainer>
        {couldNotFix ?
        null
        :
        <LinearProgress />
        }
      </UnauthorisedContainerText>
    </UnauthorisedContainer>);
}

const UnauthorisedContainer = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 72px;
`;

const RepairContainer = styled.div`
  margin: 30px 0;
`;

const UnauthorisedContainerText = styled.p`
  font-size: 24px;
`;
