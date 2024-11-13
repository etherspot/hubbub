/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Spacer from "../Spacing";
import Spinner from "react-bootstrap/Spinner";

import { useSdk } from "../../hooks/etherspotSdk";
import { sleep } from "@etherspot/prime-sdk/dist/sdk/common";
import { Interface } from 'ethers';
import { collection, doc, getDocs, getFirestore, updateDoc, where, query } from "firebase/firestore";


export default function ScanScreen(props) {
  const { address, sdk, getScore, checkWhitelist } = useSdk();
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
            await checkWhitelist();
            await sleep(2);
            console.log(address);
            const q = query(collection(db, "handshake"), where('etherspotAddress', '==', address));
            const docRef = await getDocs(q)
            let data = docRef.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            console.log('data: : ', data)
            if (data[0].addresses.includes(result.data)) {
              alert('The handshake has already been made before');
              setProcessingScan(false);
              navigate('/');
              return;
            }
            const handshakeAbi = ['function handshake(address other)', 'function register()'];
            const hc = new Interface(handshakeAbi);
            await sdk.addUserOpsToBatch({to: '0xbF3bB56D80bAA76d67d1FbDeA92377db5B586CF1', data: hc.encodeFunctionData('handshake', [])})
            await sdk.addUserOpsToBatch({to: '0xbF3bB56D80bAA76d67d1FbDeA92377db5B586CF1', data: hc.encodeFunctionData('handshake', [result.data])});
            const estimate = await sdk.estimate({paymasterDetails: { url: `https://arka.etherspot.io?apiKey=${process.env.REACT_APP_ARKA_KEY}&chainId=42161`, context: { mode: 'sponsor' } }})
            console.log('estimate: ', estimate);
            const submit = await sdk.send(estimate)
            console.log('submit: ', submit);
            console.log('Waiting for transaction...');
            let userOpsReceipt = null;
            const timeout = Date.now() + 120000; // 2 minute timeout
            while((userOpsReceipt == null) && (Date.now() < timeout)) {
              await sleep(2);
              userOpsReceipt = await sdk.getUserOpReceipt(submit);
            }
            console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
            
            const returnObj = await getScore(address);
            console.log('result: ', returnObj.toString())
            const colRef = new doc(db, "handshake", data[0].id);
            await updateDoc(colRef, {
              ...data[0],
              score: Number(returnObj.toString()),
              addresses: data[0].addresses.push(result.data),
            })
            navigate("/");
            setProcessingScan(false);
          } catch (err) {
            console.log(err);
            alert("Please try again");
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
