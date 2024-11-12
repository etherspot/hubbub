import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Spacer from "../Spacing";
import Spinner from "react-bootstrap/Spinner";

import { useSdk } from "../../hooks/etherspotSdk";
import { Interface } from 'ethers';
import { collection, doc, getDocs, getFirestore, updateDoc, where } from "firebase/firestore";


export default function ScanScreen(props) {
  const { address, sdk, getScore } = useSdk();
  const db = getFirestore();
  let isProcessing = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const [processingScan, setProcessingScan] = useState(false);

  useEffect(() => {
    console.log('useEffect fired,,,');
    const qrScanner = new QrScanner(
      document.getElementById("c"),
      async (result) => {
        if (result.data) {
          if (isProcessing.current) {
            /**
             * Stops any possible duplicate scan registration
             */
            console.log('Already processing!');
            return;
          };
          isProcessing.current = true;
          qrScanner.stop();
          console.log(result.data);
          setProcessingScan(true);
          try {
            const handshakeAbi = ['function handshake(address other)'];
            const hc = new Interface(handshakeAbi)
            await sdk.addUserOpsToBatch({to: '0x000EC40DE1451c144CaDa5e6588788295161b002', data: hc.encodeFunctionData('handshake', [result.data])});
            const estimate = await sdk.estimate({paymasterDetails: { url: `https://arka.etherspot.io?apiKey=${process.env.REACT_APP_ARKA_KEY}&chainId=80002`, context: { mode: 'sponsor' } }})
            console.log('estimate: ', estimate);
            console.log('submit: ', await sdk.send(estimate));
            const returnObj = await getScore(address);
            console.log('result: ', returnObj)
            
            const docRef = await getDocs(collection(db, "handshake"), where('etherspotAddress', '==', address))
            let data = docRef.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            console.log('data: : ', data)
            const colRef = new doc(db, "handshake", data[0].id);
            await updateDoc(colRef, {
              ...data[0],
              addresses: data[0].addresses.push(result.data),
              verified: false,
            })
            // const q = query(collection(db, "handshake"), orderBy("count", "desc"));
            // const data1 = await getDocs(q);
            // let sortedOne = data1.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            // console.log('sortedOne: ', sortedOne)
            navigate("/");
            setProcessingScan(false);
          } catch (err) {
            console.log(err);
            alert("Already handshaked/Please try again");
            navigate("/")
            setProcessingScan(false);
            qrScanner.stop();
          }
        }
      },
      {
        returnDetailedScanResult: true
      }
    );

    if (location?.pathname === "/scan") qrScanner.start();
    else qrScanner.stop();
    // need to call stop at some point
  }, [navigate, location?.pathname, sdk, address, getScore, db]);

  return <>{
    processingScan ?
    <ProcessingContainer>
      <p>Sending scan data...</p>
      <Spacer h={20} />
      <Spinner animation="grow" />
    </ProcessingContainer>
    :
    <video style={{height: '100%'}} id="c"></video>
  }</>;
}

const ProcessingContainer = styled.div`
  text-align: center;
  padding-top: 40px
`;
