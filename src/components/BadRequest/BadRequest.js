import styled from "styled-components";

export default function BadRequestScreen() {
  return(
    <UnauthorisedContainer>
      ❌
      <UnauthorisedContainerText>
        Sorry, your request was rejected. Here's what might have happened:
        <ul style={{marginTop: 20}}>
          <li><b>Do not scan other lanyards with your camera!</b> Only scan through the website camera.</li>
          <li>Use the circular QR code button within the app to scan other lanyards.</li>
        </ul>
      </UnauthorisedContainerText>
    </UnauthorisedContainer>);
}

const UnauthorisedContainer = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 72px;
`;

const UnauthorisedContainerText = styled.p`
  font-size: 24px;
`;
