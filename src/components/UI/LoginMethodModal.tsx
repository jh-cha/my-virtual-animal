import React from 'react';
import wc from '../../assets/images/wc.svg';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loginSuccess } from '@/store/auth/authSlice';
import { Avatar, Chip, Container } from '@mui/material';

declare global {
  interface Window {
    ethereum: any;
  }
}

type LoginMethodModalProps = {
  loginModalOpen: boolean;
  setLoginModalOpen(val: boolean): void;
};

const LoginMethodModal = ({ loginModalOpen, setLoginModalOpen }: LoginMethodModalProps): JSX.Element => {
  // const chainCtx = React.useContext(ChainContext);
  const [isCopying, setisCopying] = React.useState(false);
  const [shortAddress, setShortAddress] = useState('');
  const infuraGoerliNetwork = process.env.REACT_APP_INFURA_URL!;
  const dispatch = useAppDispatch();

  const account = useAppSelector((state) => state.authReducer.account);
  const isAuthenticated = useAppSelector((state) => state.authReducer.isAuthenticated);
  const prevIsAuthenticatedRef = React.useRef(isAuthenticated);

  const loginMetamask = async () => {
    console.log('loginMetamask');

    try {
      const accounts = await window.ethereum.request({
        // MetaMask에서 지원하는 account 연결 메소드
        method: 'eth_requestAccounts',
      });
      dispatch(loginSuccess(accounts[0]));
    } catch (error) {
      console.error('loginMetamask Error', error);
    }
  };

  const handleCopy = () => {
    setisCopying(true);
    navigator.clipboard.writeText(account);
    setTimeout(() => {
      setisCopying(false);
    }, 1000);
  };

  const handleClose = () => setLoginModalOpen(false);

  React.useEffect(() => {
    if (!prevIsAuthenticatedRef.current && isAuthenticated) {
      handleClose();
      prevIsAuthenticatedRef.current = isAuthenticated;
    }
  }, [isAuthenticated]);

  const chipList = (obj: provider) => {
    return (
      <>
        <Chip avatar={<Avatar alt={obj.alt} src={obj.src} />} label={obj.label} variant="outlined" />
      </>
    );
  };

  type provider = {
    alt: string;
    src: string;
    label: string;
  };

  const providerList: provider[] = [
    {
      alt: '1',
      src: '/images/metamask.png',
      label: 'metamask',
    },
    {
      alt: '2',
      src: '/images/eth.png',
      label: 'eth',
    },
  ];

  return (
    <>
      <Modal open={loginModalOpen} onClose={handleClose} aria-labelledby="login-modal">
        <Box sx={style}>
          <Container onClick={loginMetamask}>
            {providerList.map((provider) => {
              return chipList(provider);
            })}
          </Container>
        </Box>
      </Modal>
    </>
  );
};

const styles = {
  lightContainer: `absolute w-[350px] h-[260px] bottom-0 left-0 top-0 right-0 m-auto bg-white rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[220px] md:pb-2 rounded-xl md:py-2 md:pb-0`,
  darkContainer:
    'absolute w-[350px] h-[260px] bottom-0 left-0 top-0 right-0 m-auto bg-blue-900 rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[220px] md:pb-2 rounded-xl md:py-2 md:pb-0 text-gray-200',
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default LoginMethodModal;
