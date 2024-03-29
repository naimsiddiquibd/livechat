import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react'
import styled from 'styled-components';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from 'email-validator';
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from './Chat';

function Sidebar() {
  const  [user] = useAuthState(auth);
  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt("Please enter an Email Address for the user you want to chat with");
    if (!input) return null;
    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
      // we need to add the chat into the DB 'chat' collection
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  }

  const chatAlreadyExists = (recipientEmail) => 
    !!chatsSnapshot?.docs.find(
      (chat) =>
      chat.data().users.find((user) => user === recipientEmail)?.length > 0
      );

      //MUI Default DROPDOWN CODE
      const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //End MUI default DROPDOWN CODE

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} />
        <IconContainer>
            <IconButton>
                <ChatIcon />
            </IconButton>
            <IconButton>
                <MoreVertIcon onClick={handleClick} />
            </IconButton>
           
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => auth.signOut()} >Logout</MenuItem>
      </Menu>
        </IconContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/* List of Chats */}
      {chatsSnapshot?.docs.map((chat) =>(
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  )
}

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-height: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const IconContainer = styled.div``