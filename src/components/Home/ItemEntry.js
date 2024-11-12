import styled from "styled-components";
import Card from "react-bootstrap/Card";
import { themeColors } from "../../styles/colors";

const ItemEntry = ({ item }) => {
  if (!item?.id) return null;
  return (
    <ItemCard>
      <ItemBody>
        <ItemTitle>{item.address} {item.score}</ItemTitle>
      </ItemBody>
    </ItemCard>
  );
};

export default ItemEntry;

const ItemCard = styled(Card)`
  position: relative;
  background: #fff;
  border: 1px ${themeColors.border_light} solid;
  border-radius: 8px;
  margin-bottom: 1rem;
  width: 47%;
`;

const ItemTitle = styled(Card.Title)`
  text-align: center;
`;

const ItemBody = styled(Card.Body)``;

