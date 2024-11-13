import styled from "styled-components";
import QRCode from "react-qr-code";
import { useSdk } from "../../hooks/etherspotSdk";
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import { useEffect, useState } from "react";
import Spacer from "../Spacing";
import { Spinner } from "react-bootstrap";
import { getFirestore, query, collection, where, getDocs, updateDoc, doc } from "firebase/firestore";

const HomeScreen = (props) => {
  const { address, isInitialised, getScore, score } = useSdk();
  const [count, setCount] = useState(0);
  const db = getFirestore()

  useEffect(() => {
    if (isInitialised) {
    const init = async () => {
      const returnObj = await getScore(address);
      setCount(returnObj.toString());
      console.log('return Obj: ', returnObj.toString())
      const email = localStorage.getItem('email')
      if (email) {
        const q = query(collection(db, "handshake"), where("email", "==", email))
        const records = await getDocs(q);
        let data = records.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        console.log('record: ', data);
        const colRef = new doc(db, "handshake", data[0].id);
        await updateDoc(colRef, {
          ...data[0],
          score: Number(returnObj.toString()),
        })
      }
    };
    init()
    }
  }, []);

  useEffect(()=>{
    setCount(score);
  }, [score])

  return (
    <GameContainer>
      { address ? (
        <>
        <QRCode
        value={address}
      />
      <h2 style={{padding: '15px'}}>Score : { count ?? 0} <ReplayCircleFilledIcon onClick={() => getScore(address)}/></h2></>
      ) : (
        <ProcessingContainer>
      <p>Creating wallet QR Code</p>
      <Spacer h={20} />
      <Spinner animation="grow" />
    </ProcessingContainer> 
      )}
    </GameContainer>
  );
};

export default HomeScreen;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10;
`;

const ProcessingContainer = styled.div`
  text-align: center;
  padding-top: 40px
`;
