import { Button } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react'
import styled from 'styled-components';
import { auth, provider } from '../firebase';

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert)
  }
  return (
    <Container>
        <Head>
            <title>Login</title>
        </Head>
            <LoginContainer>
              <Logo src=" /logo.png" />
              <Button onClick={signIn} variant="contained">Sign in with Google</Button>
              <p><span className='text-base-200'>Design, Develop & Programmed by</span> <Link href="https://www.naimsiddiqui.me/"><BlueText>Naim Siddiqui</BlueText></Link></p>
              
            </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #07CFF0;
`;

const LoginContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0.7);
`;

const Logo = styled.img`
  height: 300px;
  width: 300px;
  margin-bottom: 50px;
`;

const BlueText = styled.span`
  color: #1976D2;
  cursor: pointer;
`;