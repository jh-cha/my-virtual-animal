'use client';

import { Box, Container, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loginSuccess, logout } from '@/store/auth/authSlice';
import axios from 'axios';
import FormData from 'form-data';
import { ethers } from 'ethers';
import { abi as MvaV1MarketABI } from '@/abi/MvaV1Market.json';
import React, { useEffect } from 'react';

export default function Mypage() {
  const [tokenIdList, setTokenIdList] = React.useState([]);
  const [tokenUriList, setTokenUriList] = React.useState([]);

  const contractAddress = process.env.NEXT_PUBLIC_MY_VIRTUAL_ANIMAL_CONTRACT!;

  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.authReducer.isAuthenticated);
  const account = useAppSelector((state) => state.authReducer.account);
  const signer = useAppSelector((state) => state.authReducer.signer);
  console.log(tokenUriList);

  const getTokenIdList = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, MvaV1MarketABI, signer);
      const res = await contract.getTokensOfOwner(account.address);
      if (res.length > 0) {
        const tokenList = res.map((item: { _hex: any }) => {
          return item._hex;
        });
        const numericArray = tokenList.map((str: any) => parseInt(str, 16));
        setTokenIdList(numericArray);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const getTokenURI = async () => {
    try {
      const uriList: any = [];
      const contract = new ethers.Contract(contractAddress, MvaV1MarketABI, signer);
      tokenIdList.map(async (item: any) => {
        const res = await contract.tokenURI(item);
        uriList.push(res);
      });
      setTokenUriList(uriList);
      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) getTokenIdList();
  }, [isAuthenticated]);

  React.useEffect(() => {
    if (isAuthenticated) getTokenURI();
  }, [tokenIdList]);

  return (
    <Container className={style.MypageContainer}>
      <Container className={style.userInfoContainer}>
        <Box
          sx={{
            width: 1000,
            height: 200,
            backgroundColor: 'primary.dark',
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        />
      </Container>
      <Container>
        <Box marginTop={4}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={40}
            slidesPerView={4}
            navigation
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 11</SwiperSlide>
            <SwiperSlide>
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src={'https://sapphire-top-canidae-293.mypinata.cloud/ipfs/' + tokenUriList[tokenUriList.length - 2]}
                alt="Next.js Logo"
                width={180}
                height={37}
                priority
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src={'https://sapphire-top-canidae-293.mypinata.cloud/ipfs/' + tokenUriList[tokenUriList.length - 1]}
                alt="Next.js Logo"
                width={180}
                height={37}
                priority
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="https://sapphire-top-canidae-293.mypinata.cloud/ipfs/QmfSB2z22PMyuQrDFfbXghtyoqvUWSWZjBRHgyYeYmmic2"
                alt="Next.js Logo"
                width={180}
                height={37}
                priority
              />
            </SwiperSlide>
          </Swiper>
        </Box>
      </Container>
    </Container>
  );
}

const style = {
  MypageContainer: 'w-full gap-5',
  userInfoContainer: 'w-full',
  userInfoBox: 'w-full',
};
