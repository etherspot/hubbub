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
import { addDoc, collection, getDocs, getFirestore, where, query } from "firebase/firestore";

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
    logout
  } = useWeb3Auth();

  const {
    initialiseSdk, getAddress, getScore
  } = useSdk();

  const db = getFirestore();
  // const collectionRef = collection(db, 'handshake')
  const [loggedIn, setLoggedIn] = useState(false);
  const [proofVerified, setProofVerified] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const element = document.getElementById("connector");

        if (!isConnected && !localStorage.getItem('email')) {
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
              setProofVerified(true);
            } else {
              setProofVerified(false)
              alert('Proof is not verified');
              logout();
              return;
            }
            const email = proof.revealedClaims.pods.ticket?.entries?.attendeeEmail?.value;
            localStorage.setItem('email', email);
            // const records = await getDocs(collection(db, "handshake"), where('email', '==', email))
            // let data = records.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            // console.log('data: : ', data)
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (isConnected && web3Auth) {
      const init = async () => {
        const mappedProvider = new Web3WalletProvider(web3Auth.provider);
        await mappedProvider.refresh();
        await initialiseSdk(mappedProvider);
        let records;
        const email = localStorage.getItem('email');
        const q = query(collection(db, "handshake"), where('email', '==', email))
        records = await getDocs(q)
        let data = records.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        console.log('data: : ', data)
        const address = await getAddress();
        if (!data.length) {
          const score = await getScore(address);
          await addDoc(collection(db, "handshake"), {
            verify: true,
            addresses: [],
            score: score,
            email: email,
            etherspotAddress: address
          });
        } else {
          if (data[0].etherspotAddress !== address) {
            alert('You have logged into another provider. Please use the same login provider you signed with with')
            logout();
            return;
          }
          setProofVerified(true);
        }
      }
      init();
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [isConnected, web3Auth])

  const unloggedInView = (
    <div className="login-container">
      <button onClick={connectWallet} className="card">
        Login
      </button> : <Spinner />
    </div>
  );

  return (
    <>
      <div className="container">
        <div className="grid">{loggedIn ? <CollectionGameContainer /> : unloggedInView}</div>
      </div>
      <div id="connector"></div>
    </>
  );
}

export default SignIn;
