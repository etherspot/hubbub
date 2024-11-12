import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

import { ReactComponent as PolygonSvg } from "../../assets/icons/polygon.svg";
import { ReactComponent as LifiSvg } from "../../assets/icons/lifi.svg";
import { ReactComponent as ParaswapSvg } from "../../assets/icons/paraswap.svg";
import { ReactComponent as WdsSvg } from "../../assets/icons/wds.svg";

import { baseColors, sponsorColors } from "../../styles/colors";

const SponsorFooter = () => {
  return <SponsorContainer>
    <Row>
      <Col>
        <Title>Our Partners</Title>
      </Col>
    </Row>
    <Row>
      <SponsorColumn onClick={() => window.open('https://polygon.technology', '_blank')}>
        <SvgIcon color={sponsorColors.polygon}>
          <PolygonSvg />
        </SvgIcon>
        Polygon
      </SponsorColumn>
      <SponsorColumn onClick={() => window.open('https://www.paraswap.io/', '_blank')}>
        <SvgIcon color={sponsorColors.paraswap}>
          <ParaswapSvg />
        </SvgIcon>
        Paraswap
      </SponsorColumn>
    </Row>
    <Row>
      <SponsorColumn onClick={() => window.open('https://www.li.fi/', '_blank')}>
        <SvgIcon color={sponsorColors.lifi}>
          <LifiSvg />
        </SvgIcon>
        Li.Fi
      </SponsorColumn>
      <SponsorColumn onClick={() => window.open('https://twitter.com/WDSNFT', '_blank')}>
        <SvgIcon color={sponsorColors.wds}>
          <WdsSvg />
        </SvgIcon>
        <WellDressedSocietyText>WELLDRESSED<br />SOCIETY</WellDressedSocietyText>
      </SponsorColumn>
    </Row>
  </SponsorContainer>;
}

const SponsorContainer = styled(Container)`
  text-align: center;
  margin: 40px 0px 0px 0;
`;

const SvgIcon = styled.div`
  margin: 10px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: ${({ color }) => (color ? color : baseColors.purple_light)};
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 600;
  margin: 1rem;
  text-align: center;
`;

const SponsorColumn = styled(Col)`
  display: flex;
  align-items: center;
  text-align: left;
`;

const WellDressedSocietyText = styled.p`
  font-size: 13px;
`;

export default SponsorFooter;
