import React from 'react';
import ethLogo from '../../assets/images/eth.png';
import LoginMethodModal from '../UI/LoginMethodModal';
import { ethers } from 'ethers';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/store';

const NavBar = (): JSX.Element => {
  const [address, setAddress] = React.useState('');
  const [balance, setBalance] = React.useState<string | null>('');
  const [chooseNetwork, setChooseNetwork] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);

  const [loginModalOpen, setLoginModalOpen] = React.useState(false);

  const isAuthenticated = useAppSelector((state: RootState) => state.authReducer.isAuthenticated);

  const getAccount = async () => {
    if (typeof window.ethereum === 'undefined') {
      console.log('window.ethereum is undefined');
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setAddress('');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getBalance = async () => {
    if (typeof window.ethereum === 'undefined') {
      console.log('window.ethereum is undefined');
    } else if (address) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        const balance = await provider.getBalance(address);
        let ethBalance = ethers.utils.formatEther(balance);
        setBalance(parseFloat(ethBalance).toFixed(3));
      } catch (error) {
        console.log(error);
      }
    }
  };

  React.useEffect(() => {
    console.log('!!', isAuthenticated);
    if (isAuthenticated) {
      getAccount();
      getBalance();
    }
  }, [isAuthenticated]);
  console.log(isAuthenticated);

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
            <Link variant="button" color="text.primary" href="/create" sx={{ my: 1, mx: 1.5 }}>
              CREATE
            </Link>
          </nav>

          {/* login */}
          {!isAuthenticated && (
            <Button onClick={() => setLoginModalOpen(true)} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          )}

          {/* Trigger logout */}
          {isAuthenticated && (
            <Button onClick={() => setLoginModalOpen(true)} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
