import { Avatar } from '@mui/material';
import { useAuthState } from "react-firebase-hooks/auth";
import styled from 'styled-components';
import { auth, db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

function Chat({ id, users }) {
  // console.log("ID:",id, "Users:",users);
  const router = useRouter();
  const [user] = useAuthState(auth);

  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", '==', getRecipientEmail(users, user))
    );

  const enterChat = () => {
    router.push(`/chat/${id}`);
  }

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  // console.log("recipientSnapshot paise naki:",recipientSnapshot.docs);
  // console.log("picture paise naki:",recipient.photoURL);

  const recipientEmail = getRecipientEmail(users, user)
  // console.log("Check recipient Email:",recipientEmail);

  return (
  <Container onClick={enterChat}>
    {recipient ? (
      <AvatarPic src={recipient?.photoURL} />
    ) : (
      <AvatarPic>{recipientEmail[0]}</AvatarPic>
    )}
    <p>{recipientEmail}</p>
  </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;

const AvatarPic = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
