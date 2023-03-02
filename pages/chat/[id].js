import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

const Chat = ({chat, messages}) => {
    const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar></Sidebar>
      <ChatContainer>
        <ChatScreen></ChatScreen>
      </ChatContainer>
    </Container>
  );
};

export default Chat;

export async function getServerSideProps(contex) {
  const ref = db.collection("chats").doc(contex.query.id);

  // prep the message on the server side
  const messageRes = await ref
    .collection("message")
    .orderBy("timestamp", "asc")
    .get();

  const message = messageRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  // pre the chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  console.log("Eita dekh: ",chat, message);

  return {
    props: {
        message: JSON.stringify(message),
        chat:   chat
    }
  }

}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
