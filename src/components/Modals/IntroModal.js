import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import Spacing from "../Spacing";

const IntroModal = ({ show, onCloseModal }) => {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    if (!!onCloseModal) onCloseModal();
  };

  useEffect(() => {
    if (show) openModal();
    else closeModal();

    setStep(1);
  }, [show]);

  const nextStep = () => {
    let newStep = step + 1;
    if (newStep > 3) newStep = 3;
    setStep(newStep);
  };

  const prevStep = () => {
    let newStep = step - 1;
    if (newStep < 1) newStep = 1;
    setStep(newStep);
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      {step <= 1 && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>What you can win!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong>
              {
                "🏆 Take part in our Solar Punk Multiverse game and share the prize pool from Etherspot, Polygon, ParaSwap, LI.FI. & WellDressed Society!"
              }
            </strong>
            <Spacing h={16} />
            <ul>
              <li>66000 PSP</li>
              <li>1000 USDC</li>
              <li>500 MATIC</li>
              <li>
                WDS NFT that unlocks ordering of bespoke IRL clothing item
              </li>
              <li>Etherspot Swag t-shirts</li>
              <li>Solar Punk Tribe member NFTs</li>
            </ul>
            <Spacing h={16} />
            <strong>
              All participants get special POAPs!
              <br />
              👉 Check out the leaderboard at the Etherspot/Pillar stand to see if
              you're a winner!
            </strong>
          </Modal.Body>
        </>
      )}
      {step === 2 && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Scan other peoples QR codes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong>Get started:</strong>
            <ol>
              <li>Scan other QRs to earn Research Points</li>
              <li>Top 30 players will win prizes</li>
            </ol>
            <Spacing h={16} />
            <strong>Rescue the Solar Punk Multiverse!</strong>
          </Modal.Body>
        </>
      )}
      {step >= 3 && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>How to Win?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong>If you are one of the 30 winners:</strong>
            <br />
            <ol>
              <li>Come to our Etherspot/Pillar stand</li>
              <li>Show us your QR code</li>
              <li>Get your prizes!</li>
            </ol>
            <Spacing h={16} />
            <strong>The game will finish on July 8th at 15:00 CET.</strong>
          </Modal.Body>
        </>
      )}

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        {/* {step > 1 && (
          <Button variant="secondary" onClick={prevStep}>
            Back
          </Button>
        )} */}

        <Pagination>
          <Pagination.Prev onClick={prevStep} />
          <Pagination.Item
            key={1}
            active={step === 1}
            onClick={() => setStep(1)}
          >
            {1}
          </Pagination.Item>
          <Pagination.Item
            key={2}
            active={step === 2}
            onClick={() => setStep(2)}
          >
            {2}
          </Pagination.Item>
          <Pagination.Item
            key={3}
            active={step === 3}
            onClick={() => setStep(3)}
          >
            {3}
          </Pagination.Item>
          <Pagination.Next onClick={nextStep} />
        </Pagination>
        {/* {step < 3 && (
          <Button variant="primary" onClick={nextStep}>
            Next
          </Button>
        )} */}
      </Modal.Footer>
    </Modal>
  );
};

export default IntroModal;
