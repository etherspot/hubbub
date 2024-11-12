import styled from "styled-components";
import QRCode from "react-qr-code";
import { useSdk } from "../../hooks/etherspotSdk";

const HomeScreen = (props) => {
  const { address } = useSdk();

  return (
    <GameContainer>
      <QRCode
        value={address}
      />
    </GameContainer>
  );
};

export default HomeScreen;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0;
`;
