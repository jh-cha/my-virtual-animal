'use client';

import { Box, Container, TextField, Typography } from '@mui/material';

export default function Create() {
  return (
    <Container className={style.createContainer}>
      <Container className={style.titleContaicer}>
        <Typography variant="h3" component="h3">
          Create an NFT
        </Typography>
        <Typography>Once your item is minted you will not be able to change any of its information.</Typography>
      </Container>
      <Container className={style.nftContainer}>
        <Container className={style.imageUploadContainer}>
          <Container className={style.imageUploadWrapper}>
            <Typography className={style.imageUploadText}>Drag and drop media</Typography>
            <Typography className={style.imageUploadText}>Browse files</Typography>
            <Typography className={style.imageUploadText}>Max Size: 50MB</Typography>
            <Typography className={style.imageUploadText}>JPG, PNG, GIF, SVG, MP4</Typography>
          </Container>
        </Container>
        <Container className={style.inputFormContainer}>
          <Container>
            <Container className={style.inputNameContainer}>
              <Typography>Name*</Typography>
              <TextField id="outlined-basic" label="name" variant="outlined" />
            </Container>
            <Container className={style.inputSupplyContainer}>
              <Typography>Supply*</Typography>
              <TextField id="outlined-basic" label="Supply" variant="outlined" />
            </Container>
            <Container className={style.inputDescriptionContainer}>
              <Typography>Description</Typography>
              <TextField id="outlined-basic" label="Enter a description" variant="outlined" multiline maxRows={4} />
            </Container>
            <Container className={style.inputNetworkContainer}>
              <Typography>Network</Typography>
              <Typography>배포될 네트워크를 선택해주세요.</Typography>
              <TextField id="outlined-basic" label="Goerli-Ethereum TestNet" variant="outlined" />
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

const style = {
  createContainer: 'flex flex-col p-5 my-0 mx-auto gap-5',

  titleContaicer: 'w-full',

  nftContainer: 'flex flex-row w-full gap-5',

  imageUploadContainer: 'flex justify-items-center items-center w-1/2 border-dashed border-2 rounded-lg border-sky-500',
  imageUploadWrapper: 'py-12',
  imageUploadText: 'text-center',

  inputFormContainer: 'flex p-5 gap-3 w-1/2 border-dashed border-2 rounded-lg border-sky-500',
  inputNameContainer: 'w-full',
  inputSupplyContainer: 'w-full',
  inputDescriptionContainer: 'w-full',
  inputNetworkContainer: 'w-full',
};
