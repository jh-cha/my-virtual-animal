import React from 'react';
import wc from '../../assets/images/wc.svg';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loginSuccess, logout } from '@/store/auth/authSlice';
import { Avatar, Chip, Container } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import axios from 'axios';
import FormData from 'form-data';
import { ethers } from 'ethers';
import { abi as MvaV1MarketABI } from '@/abi/MvaV1Market.json';

type MintMethodModalProps = {
  mintModalOpen: boolean;
  setMintModalOpen(val: boolean): void;
};

const MintMethodModal = ({ mintModalOpen, setMintModalOpen }: MintMethodModalProps): JSX.Element => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [stepError, setStepError] = React.useState(false);
  const [fileCID, setFileCID] = React.useState('');

  const JWT = process.env.NEXT_PUBLIC_PINATA_JWT_SECRET_ACCESS_TOKEN_KEY!;
  const contractAddress = process.env.NEXT_PUBLIC_MY_VIRTUAL_ANIMAL_CONTRACT!;

  const dispatch = useAppDispatch();

  const account = useAppSelector((state) => state.authReducer.account);
  const mint = useAppSelector((state) => state.mintReducer.mint);
  const { name, supply, description, network } = mint;
  const file = useAppSelector((state) => state.mintReducer.file);
  const isAuthenticated = useAppSelector((state) => state.authReducer.isAuthenticated);
  const signer = useAppSelector((state) => state.authReducer.signer);

  const handleClose = () => setMintModalOpen(false);
  const handleStepClose = (status: boolean) => {
    if (!status) setStepError(true);
    setTimeout(() => {
      setMintModalOpen(false);
    }, 3000);
  };

  const mintNFT = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, MvaV1MarketABI, signer);
      const res = await contract.createNFT(account.address, fileCID);
      return true;
    } catch (error) {
      return false;
    }
  };

  const pinFileToIPFS = async () => {
    const formData = new FormData();

    formData.append('file', file);

    const pinataMetadata = JSON.stringify({
      name: mint.name,
    });
    formData.append('pinataMetadata', pinataMetadata);

    try {
      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': `multipart/form-data;`,
          Authorization: `Bearer ${JWT}`,
        },
      });
      setFileCID(res.data.IpfsHash);
      return true;
    } catch (error) {
      return false;
    }
  };

  const mintValidation = () => {
    // Goerli 테스트 네트워크만 지원
    const currentChainId = window.ethereum.chainId;
    if (currentChainId !== '0x5') return false;
    if (file && name && supply && network) return true;
    return false;
  };

  const firstStep = async () => {
    const validation = await mintValidation();
    if (validation) {
      // 1.uploading file
      const ipfs_res = await pinFileToIPFS();
      if (!ipfs_res) return handleStepClose(false);
      setActiveStep(1);
    }
  };
  const secondStep = async () => {
    // 2.minting NFT
    const nft_res = await mintNFT();
    if (!nft_res) return handleStepClose(false);
    setActiveStep(2);
  };
  const thirdStep = () => {
    // 3.Complete
    setActiveStep(3);
    handleStepClose(true);
  };

  React.useEffect(() => {
    if (activeStep === 0) {
      firstStep();
    }
  }, [activeStep]);

  React.useEffect(() => {
    if (activeStep === 1) {
      secondStep();
    }
  }, [fileCID]);

  React.useEffect(() => {
    if (activeStep === 2) {
      thirdStep();
    }
  }, [activeStep]);

  const steps = ['Uploading Image to IPFS', 'Minting NFT on Blockchain', 'Complete'];

  return (
    <>
      <Modal open={mintModalOpen} onClose={handleClose} aria-labelledby="create-nft-modal">
        <Box sx={style}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel error={activeStep === index && stepError}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
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

export default MintMethodModal;
