import * as React from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import Spacing from "../Spacing";
import { limit, query, collection, orderBy, getDocs, getFirestore } from "firebase/firestore";
import ItemList from "../Home/ItemList";
import { useSdk } from "../../hooks/etherspotSdk";

const PrizesScreen = () => {

  const [players, setPlayers] = React.useState([])
  const db = getFirestore();
  const { score } = useSdk();

  React.useEffect(() => {
    const init = async () => {
      const q = query(collection(db, "handshake"), orderBy("count", "desc"), limit(200));
      const data1 = await getDocs(q);
      let records = data1.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setPlayers(records);
      console.log('sortedOne: ', players)
    }
    init();
  })

  return (
    <InfoContainer>
      <Title>Leaderboard</Title>
      <StyledCard>
        <Card.Body>
          <Card.Title>
            <strong>🥇 Top 200 players will get:</strong>
          </Card.Title>
          <Card.Text>
            <ul>
              <li>AAHub Swags</li>
            </ul>
            <ul>
              <ItemList collectedItems={players} points={score} ></ItemList>
            </ul>
          </Card.Text>
        </Card.Body>
      </StyledCard>



      <Spacing h={16} />
    </InfoContainer>
  );
};

export default PrizesScreen;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 1rem;
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 600;
  margin: 1rem;
  text-align: center;
`;

const StyledCard = styled(Card)`
  // p {
  //   text-align: center;
  // }
`;
