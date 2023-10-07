import React from 'react';
import wc from '../../assets/images/wc.svg';
import metamask from '@/asset/images/metamask.png';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loginSuccess, logout } from '@/store/auth/authSlice';
import { Container } from '@mui/material';

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

  const loginMetamask = async () => {
    console.log('loginMetamask');

    try {
      const accounts = await window.ethereum.request({
        // MetaMask에서 지원하는 account 연결 메소드
        method: 'eth_requestAccounts',
      });
      dispatch(loginSuccess(accounts));
    } catch (error) {
      console.error('loginMetamask Error', error);
    }
  };

  const logoutMetamask = async () => {
    await window.ethereum.request({
      // MetaMask에서 지원하는 연결 해제 메소드
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: {} }],
    });

    dispatch(logout());
  };

  const handleCopy = () => {
    setisCopying(true);
    navigator.clipboard.writeText(account);
    setTimeout(() => {
      setisCopying(false);
    }, 1000);
  };

  const handleClose = () => setLoginModalOpen(false);

  return (
    <>
      <Modal
        open={loginModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container onClick={loginMetamask}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Metamask
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              메타마스크 로그인
            </Typography>
            <Image src={metamask} alt="metamask" className="h-8 w-8" />
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
