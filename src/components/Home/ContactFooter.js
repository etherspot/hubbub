import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { FaTelegram } from "react-icons/fa";

import { baseColors } from "../../styles/colors";

const ContactFooter = () => {
  return <ContactContainer>
    <Row>
      <Col>
        <Title>Get in touch with Etherspot</Title>
      </Col>
    </Row>
    <Row>
      <Col onClick={() => window.open('https://t.me/etherspot', '_blank')}>
        <TgIconContainer>
          <FaTelegram />
        </TgIconContainer>
        Join the team on Telegram!
      </Col>
    </Row>
  </ContactContainer>;
}

const ContactContainer = styled(Container)`
  text-align: center;
  margin: 50px 0px 10px 0;
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
`;

const TgIconContainer = styled.div`
  font-size: 50px;
  margin-bottom: 10px;
`;

export default ContactFooter;
