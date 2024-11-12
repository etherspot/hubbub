import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spacing from "../Spacing";

import { ReactComponent as PolygonSvg } from "../../assets/icons/polygon.svg";
import { ReactComponent as LifiSvg } from "../../assets/icons/lifi.svg";
import { ReactComponent as ParaswapSvg } from "../../assets/icons/paraswap.svg";
import { ReactComponent as WdsSvg } from "../../assets/icons/wds.svg";
import { baseColors, sponsorColors } from "../../styles/colors";

const SponsorScreen = () => {
  return (
    <InfoContainer>
      <Title>Partners</Title>
      <StyledCard>
        <Card.Body>
          <CardTitle>
            <SvgIcon color={sponsorColors.polygon}>
              <PolygonSvg />
            </SvgIcon>
            <Spacing w={16} />
            <strong>Polygon</strong>
          </CardTitle>
          <Card.Text>
            Polygon is a decentralised Ethereum scaling platform that enables
            developers to build scalable user-friendly dApps with low
            transaction fees without ever sacrificing on security
            <Spacing h={16} />
            <Button href="https://polygon.technology" target="_blank">
              Visit Polygon
            </Button>
          </Card.Text>
        </Card.Body>
      </StyledCard>

      <Spacing h={16} />

      <StyledCard>
        <Card.Body>
          <CardTitle>
            <SvgIcon color={sponsorColors.paraswap}>
              <ParaswapSvg />
            </SvgIcon>
            <Spacing w={16} />
            <strong>ParaSwap</strong>
          </CardTitle>
          <Card.Text>
            ParaSwap is the leading DeFi aggregator that unites the liquidity of
            decentralized exchanges and lending protocols into one comprehensive
            and secure interface and APIs.
            <Spacing h={16} />
            <Button href="https://www.paraswap.io/" target="_blank">
              Visit ParaSwap
            </Button>
          </Card.Text>
        </Card.Body>
      </StyledCard>

      <Spacing h={16} />

      <StyledCard>
        <Card.Body>
          <CardTitle>
            <SvgIcon color={sponsorColors.lifi}>
              <LifiSvg />
            </SvgIcon>
            <Spacing w={16} />
            <strong>Li.Fi</strong>
          </CardTitle>
          <Card.Text>
            Li.Fi. is an advanced bridge and DEX-aggregation platform for
            cross-chain bridging, swapping and messaging.
            <Spacing h={8} />
            <Button href="https://www.li.fi/" target="_blank">
              Visit Li.Fi
            </Button>
          </Card.Text>
        </Card.Body>
      </StyledCard>

      <Spacing h={16} />

      <StyledCard>
        <Card.Body>
          <CardTitle>
            <SvgIcon color={sponsorColors.wds}>
              <WdsSvg />
            </SvgIcon>
            <Spacing w={16} />

            <strong>WELLDRESSEDSOCIETY</strong>
          </CardTitle>
          <Card.Text>
            High Fidelity Fashion powered by blockchain and NFTs.
            Providing brands and creators Immersive digital &amp; physical professional services.
            <Spacing h={16} />
            <Button href="https://twitter.com/WDSNFT" target="_blank">
              WELLDRESSEDSOCIETY on Twitter
            </Button>
          </Card.Text>
        </Card.Body>
      </StyledCard>

      <Spacing h={128} />
    </InfoContainer>
  );
};

export default SponsorScreen;

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
  p {
    text-align: center;
  }
`;

const CardTitle = styled(Card.Title)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SvgIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: ${({ color }) => (color ? color : baseColors.purple_light)};
`;
