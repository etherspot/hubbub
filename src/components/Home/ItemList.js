import { useEffect, useState } from "react";
import styled from "styled-components";
import ItemEntry from "./ItemEntry";

const ItemList = ({ points, collectedItems }) => {
  const [items, setItems] = useState({});

  useEffect(() => {
    // let grouped = demoCollectedItems;
    console.log(collectedItems);
    setItems(collectedItems);
  }, [collectedItems, points]);

  // if (collectedItems?.length === 0) return null;

  return (
    <ItemContainer>
      {items &&
        Object.keys(items).map((key, i) => (
          <ItemEntry key={i} item={items[key]} />
        ))}

      {!Object.keys(items).length &&
        <EmptyContainer>
          <EmptyContainerText>
            Nothing here yet... <br /> <br />
          </EmptyContainerText>
        </EmptyContainer>
      }
    </ItemContainer>
  );
};

export default ItemList;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px;
`;

const EmptyContainer = styled.div`
  width: 100%;
`;

const EmptyContainerText = styled.p`
  padding: 1rem;
  display: block;
  width: 100%;
  text-align: center;
  justify-content: center;
  border: 4px dashed silver;
  border-radius: 30px
`;
