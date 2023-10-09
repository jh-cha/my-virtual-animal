import React from 'react';
import LoginMethodModal from '../UI/LoginMethodModal';
import { ethers } from 'ethers';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { logout, setBalance, changeValue } from '@/store/auth/authSlice';
import { Avatar, Chip } from '@mui/material';

const NavBar = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [loginModalOpen, setLoginModalOpen] = React.useState(false);

  const isAuthenticated = useAppSelector((state) => state.authReducer.isAuthenticated);
  const address = useAppSelector((state) => state.authReducer.account.address);
  const balance = useAppSelector((state) => state.authReducer.account.balance);

  const setProvider = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    dispatch(changeValue({ prop: 'provider', value: provider }));
    const signer = provider.getSigner();
    dispatch(changeValue({ prop: 'signer', value: signer }));

    // signer.getAddress().then((address) => {
    //   setSignerAddress(address);
    // });
  };

  const getBalance = async () => {
    if (typeof window.ethereum === 'undefined') {
      console.log('window.ethereum is undefined');
    } else if (address) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        const balance = await provider.getBalance(address);
        let ethBalance = ethers.utils.formatEther(balance);
        dispatch(setBalance(parseFloat(ethBalance).toFixed(3)));
      } catch (error) {
        console.log(error);
      }
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

  React.useEffect(() => {
    if (isAuthenticated) {
      getBalance();
      setProvider();
    }
  }, [isAuthenticated]);

  return (
    <>
      {loginModalOpen && <LoginMethodModal loginModalOpen={loginModalOpen} setLoginModalOpen={setLoginModalOpen} />}

      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Button href="/" sx={{ flexGrow: 1, justifyContent: 'flex-start' }}>
            <Typography variant="h6" color="inherit" noWrap>
              My Virtual Animal
            </Typography>
          </Button>
          <nav>
            <Link variant="button" color="text.primary" href="/redux" sx={{ my: 1, mx: 1.5 }}>
              redux test
            </Link>
          </nav>

          <nav>
            <Link variant="button" color="text.primary" href="/mint" sx={{ my: 1, mx: 1.5 }}>
              CREATE
            </Link>
          </nav>

          {/* myPage */}
          {isAuthenticated && (
            <Link variant="button" color="text.primary" href="/mypage" sx={{ my: 1, mx: 1.5 }}>
              MYPAGE
            </Link>
          )}

          {/* login */}
          {!isAuthenticated && (
            <Button onClick={() => setLoginModalOpen(true)} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          )}

          {/* Balance */}
          {isAuthenticated && (
            <Chip avatar={<Avatar alt="eth" src="/images/eth.png" />} label={balance} variant="outlined" />
          )}

          {/* Trigger logout */}
          {isAuthenticated && (
            <Button onClick={() => logoutMetamask()} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
