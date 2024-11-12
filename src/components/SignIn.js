/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-self-compare */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-undef */
import './SignIn.css';
import { useEffect, useState } from "react";
import { Web3WalletProvider } from '@etherspot/prime-sdk';
import CollectionGameContainer from "./Container/Container";
import { connect } from "@parcnet-js/app-connector";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { useSdk } from '../hooks/etherspotSdk';
import { ticketProofRequest } from "@parcnet-js/ticket-spec";
import { Spinner } from 'react-bootstrap';
import { addDoc, collection, getDocs, getFirestore, where } from "firebase/firestore";

const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"type":"error","name":"EnforcedPause"},{"inputs":[],"type":"error","name":"ExpectedPause"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"type":"error","name":"OwnableInvalidOwner"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"type":"error","name":"OwnableUnauthorizedAccount"},{"inputs":[{"internalType":"address","name":"previousOwner","type":"address","indexed":true},{"internalType":"address","name":"newOwner","type":"address","indexed":true}],"type":"event","name":"OwnershipTransferred","anonymous":false},{"inputs":[{"internalType":"address","name":"account","type":"address","indexed":false}],"type":"event","name":"Paused","anonymous":false},{"inputs":[{"internalType":"address","name":"account","type":"address","indexed":false}],"type":"event","name":"Unpaused","anonymous":false},{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"stateMutability":"nonpayable","type":"function","name":"addAdmin"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","name":"admins","outputs":[{"internalType":"address","name":"","type":"address"}]},{"inputs":[{"internalType":"address","name":"other","type":"address"}],"stateMutability":"nonpayable","type":"function","name":"claim","outputs":[{"internalType":"bool","name":"","type":"bool"}]},{"inputs":[],"stateMutability":"view","type":"function","name":"getThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}]},{"inputs":[{"internalType":"address","name":"other","type":"address"}],"stateMutability":"nonpayable","type":"function","name":"handshake"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","name":"handshakes","outputs":[{"internalType":"address","name":"","type":"address"}]},{"inputs":[],"stateMutability":"view","type":"function","name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}]},{"inputs":[],"stateMutability":"view","type":"function","name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}]},{"inputs":[],"stateMutability":"nonpayable","type":"function","name":"renounceOwnership"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","name":"scores","outputs":[{"internalType":"uint256","name":"","type":"uint256"}]},{"inputs":[{"internalType":"uint256","name":"newThreshold","type":"uint256"}],"stateMutability":"nonpayable","type":"function","name":"setThreshold"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"stateMutability":"nonpayable","type":"function","name":"transferOwnership"}];

const myApp = {
  name: "Devcon Ticket Authentication",
  permissions: {
    REQUEST_PROOF: { collections: ["Tickets"] },
  },
};

function SignIn() {
  const {
    web3Auth,
    isConnected,
    connect: connectWallet,
  } = useWeb3Auth();

  const {
    initialiseSdk, address
  } = useSdk();

  const db = getFirestore();
  // const collectionRef = collection(db, 'handshake')
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [proofVerified, setProofVerified] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const element = document.getElementById("connector");

        const z = await connect(
          myApp,
          element,
          "https://zupass.org"
        );

        console.log('initialised z', z);

        const DevconTicketProofRequest = ticketProofRequest({
          classificationTuples: [
            {
              signerPublicKey: "YwahfUdUYehkGMaWh0+q3F8itx2h8mybjPmt8CmTJSs",
              eventId: "5074edf5-f079-4099-b036-22223c0c6995",
            },
          ],
          fieldsToReveal: {
            attendeeEmail: true,
            attendeeName: true,
          },
        });

        if (!proofVerified) {
          const proof = await z?.gpc.prove({ request: DevconTicketProofRequest.schema, collectionIds: ["Tickets"] });

          console.log('proof: ', proof)

          if (proof.success === true) {
            setEmail(proof.revealedClaims.pods.ticket?.entries?.attendeeEmail?.value)

            setProofVerified(true);
          } else {
            setProofVerified(false)
          }
        const email = proof.revealedClaims.pods.ticket?.entries?.attendeeEmail?.value;
        const records = await getDocs(collection(db, "handshake"), where('email', '==', email))
        let data = records.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        console.log('data: : ', data)
        if (!data) {
          await addDoc(collection(db, "handshake", email), {
            verify: proofVerified,
            addresses: [],
            score: 0,
            email: email,
            etherspotAddress: address
          });
        }
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, [web3Auth, isConnected]);

  useEffect(() => {
    if (isConnected && web3Auth) {
      const init = async () => {
        const mappedProvider = new Web3WalletProvider(web3Auth.provider);
        await mappedProvider.refresh();
        initialiseSdk(mappedProvider);
        setLoggedIn(true);
        const records = await getDocs(collection(db, "handshake"), where('email', '==', email))
        let data = records.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        console.log('data: : ', data)
        if (!data) {
          await addDoc(collection(db, "handshake", email), {
            verify: proofVerified,
            addresses: [],
            score: 0,
            email: email,
            etherspotAddress: address
          });
        }
        // const doc = db.collection('handshake').doc();
        // console.log('get: ', await doc.get({
        //   email: 'vignesh@pillarproject.io'
        // }))
        // const q = query((collection(db, "handshake"), where("email", email)));

        // const records = await getDocs(q)
        // console.log('records: ', records)
        // const records1 = await getDocs(query((collection(db, "handshake"), where('address', address))))
        // console.log('records1: ', records1);
        // const docRef = await addDoc(collection(db, "handshake"), {
        //   verify: proofVerified,
        //   email: email,
        //   etherspotAddress: address
        // });
      }
      init();
    } else {
      setLoggedIn(false);
    }
  }, [isConnected, web3Auth])

  const unloggedInView = (
    <div className="login-container">
      <button onClick={connectWallet} className="card">
        Login
      </button>
    </div>
  );

  return (
    <>
      {proofVerified ? (
        <div className="container">
          <div className="grid">{loggedIn ? <CollectionGameContainer /> : unloggedInView}</div>
        </div>) :
        <Spinner />
      }
      <div id="connector"></div>
    </>
  );
}

export default SignIn;
