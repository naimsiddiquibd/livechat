import { Avatar } from '@mui/material';
import { useAuthState } from "react-firebase-hooks/auth";
import styled from 'styled-components';
import { auth, db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';
import { useCollection } from 'react-firebase-hooks/firestore';

function Chat({ id, users }) {
  console.log("ID:",id, "Users:",users);
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", '==', getRecipientEmail(users, user))
    );

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  console.log("recipient:",recipient);
  const recipientEmail = getRecipientEmail(users, user)
  // console.log("Check recipient Email:",recipientEmail);

  return (
  <Container>
    {recipient ? (
      <UserAvatar src={recipient?.photoURL} />
    ) : (
      <UserAvatar>{recipientEmail[0]}</UserAvatar>
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

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;