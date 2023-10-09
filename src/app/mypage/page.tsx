'use client';

import { Box, Container, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function Mypage() {
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
            // install Swiper modules
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
            <SwiperSlide>Slide 22</SwiperSlide>
            <SwiperSlide>Slide 33</SwiperSlide>
            <SwiperSlide>Slide 44</SwiperSlide>
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
