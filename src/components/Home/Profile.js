import { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Spacing from "../Spacing";

const Profile = ({ points, ownedItems }) => {
  return (
    <ProfileContainer>
      <InfoContainer>
        <OwnedImage src={ownedItems?.[0]?.image || ""} />
        <InfoText>{ownedItems[0]?.name || "Fetching latest data..."}</InfoText>
      </InfoContainer>
      <Spacing w={16} />
      {ownedItems.length > 0 && (
        <InfoContainer>
          <Spacing h={16} />
          <InfoText>Research points</InfoText>
          <PointsText>{points}</PointsText>
        </InfoContainer>
      )}
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

const InfoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
`;

const OwnedImage = styled.img`
  width: 150px;
`;

const InfoText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  padding-top: 0.5rem;
`;

const PointsText = styled(InfoText)`
  font-size: 3rem;
`;
