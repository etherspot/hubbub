import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import QRCode from "react-qr-code";

const QrCodeModal = ({ show, onCloseModal }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    if (!!onCloseModal) onCloseModal();
  };

  useEffect(() => {
    if (show) openModal();
    else closeModal();
  }, [show]);

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Your QR Code</Modal.Title>
      </Modal.Header>
      <ModalBody>
        <div style={{ background: "white", padding: "16px" }}>
          <QRCode
            value={`https://collection-game-228c1.web.app/?world=${localStorage.getItem(
              "world"
            )}&playerId=${localStorage.getItem("playerId")}`}
          />
        </div>
      </ModalBody>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QrCodeModal;

const ModalBody = styled(Modal.Body)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
