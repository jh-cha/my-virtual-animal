'use client';

import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  MenuItem,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { changeValue, uploadFile } from '@/store/mint/mintSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import axios from 'axios';
import FormData from 'form-data';
import { useState } from 'react';
import MintMethodModal from '@/components/UI/MintMethodModal';

const network = [
  {
    value: 'goerli',
    label: 'Goerli (Testnet)',
  },
];

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Mint() {
  const [mintModalOpen, setMintModalOpen] = useState(false);
  const [selectImage, setSelectImage] = useState<any>();
  const dispatch = useAppDispatch();
  const mint = useAppSelector((state) => state.mintReducer.mint);
  const file = useAppSelector((state) => state.mintReducer.file);

  const uploadImage = (image: any) => {
    dispatch(uploadFile(image));

    if (image) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (loadEvent && loadEvent.target) setSelectImage(loadEvent.target.result);
      };
      reader.readAsDataURL(image);
    }
  };

  const handelCreateButton = (): boolean => {
    const { name, supply, network } = mint;
    if (file && name && supply && network) return false;
    return true;
  };

  return (
    <>
      {mintModalOpen && <MintMethodModal mintModalOpen={mintModalOpen} setMintModalOpen={setMintModalOpen} />}

      <Container className={style.createContainer}>
        <Container className={style.titleContaicer}>
          <Typography variant="h3" component="h3">
            Create an NFT
          </Typography>
          <Typography>Once your item is minted you will not be able to change any of its information.</Typography>
        </Container>

        <Container className={style.nftContainer}>
          {file.name ? (
            <Container className={style.cardContainer}>
              <Card>
                <Container className={style.ChangeImageButton}>
                  <CardActionArea>
                    <CardMedia component="img" image={selectImage} alt={file.name} />
                  </CardActionArea>
                </Container>
                <Container className={style.ChangeImageButton}>
                  <Container className={style.imageUploadButton}>
                    <Button component="label" variant="outlined">
                      Change file
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => {
                          if (event.target && event.target.files && event.target.files[0])
                            uploadImage(event.target.files[0]);
                        }}
                      />
                    </Button>
                  </Container>
                </Container>
              </Card>
            </Container>
          ) : (
            <Container className={style.imageUploadContainer}>
              <Container className={style.imageUploadWrapper}>
                <Typography className={style.imageUploadText}>Upload media</Typography>
                <Container className={style.imageUploadButton}>
                  <Button component="label" variant="outlined">
                    Upload file
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => {
                        if (event.target && event.target.files && event.target.files[0])
                          uploadImage(event.target.files[0]);
                      }}
                    />
                  </Button>
                </Container>
                <Typography className={style.imageUploadText}>Max Size: 50MB</Typography>
                <Typography className={style.imageUploadText}>JPG, PNG, GIF, SVG, MP4</Typography>
              </Container>
            </Container>
          )}

          <Container className={style.inputFormContainer}>
            <Container>
              <Container className={style.inputNameContainer}>
                <Typography>Name*</Typography>
                <TextField
                  id="outlined-basic"
                  className={style.inputName}
                  placeholder="Name your NFT"
                  variant="outlined"
                  onChange={(event) => {
                    dispatch(changeValue({ prop: 'name', value: event.target.value }));
                  }}
                />
              </Container>

              <Container className={style.inputSupplyContainer}>
                <Typography>Supply*</Typography>
                <TextField
                  id="outlined-basic"
                  className={style.inputSupply}
                  variant="outlined"
                  value={mint.supply}
                  onChange={(event) => {
                    dispatch(changeValue({ prop: 'supply', value: Number(event.target.value) }));
                  }}
                />
              </Container>

              <Container className={style.inputDescriptionContainer}>
                <Typography>Description</Typography>
                <TextField
                  id="outlined-multiline-static"
                  className={style.inputDescription}
                  placeholder="Enter a description"
                  variant="outlined"
                  multiline
                  rows={4}
                  onChange={(event) => {
                    dispatch(changeValue({ prop: 'description', value: event.target.value }));
                  }}
                />
              </Container>

              <Container className={style.selectNetworkContainer}>
                <Typography>Network*</Typography>
                <Typography>Please select a network to deploy.</Typography>
                <TextField
                  id="outlined-basic"
                  select
                  className={style.selectNetwork}
                  value={mint.network}
                  onChange={(event) => {
                    dispatch(changeValue({ prop: 'network', value: event.target.value }));
                  }}
                >
                  {network.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Container>

              <Container className={style.bottomContainer}>
                <Typography variant="overline" className={style.textInfo}>
                  * 항목은 필수입니다.
                </Typography>
                <Button
                  className={style.buttonCreate}
                  variant="outlined"
                  onClick={() => setMintModalOpen(true)}
                  disabled={handelCreateButton()}
                >
                  CREATE
                </Button>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
}

const style = {
  createContainer: 'flex h-full flex-col my-0 mx-auto gap-5',

  titleContaicer: 'w-full',

  nftContainer: 'flex flex-row p-0 w-full h-full gap-5',

  cardContainer: 'max-w-xl p-2',
  cardActionAreaContainer: 'mt-2',
  ChangeImageButton: 'my-2 ',

  imageUploadContainer:
    'flex justify-items-center items-center gap-10 w-1/2 border-dashed border-2 rounded-lg border-sky-500',
  imageUploadWrapper: 'py-12',
  imageUploadText: 'text-center',
  imageUploadButton: 'flex justify-center items-center mx-auto',

  inputFormContainer: 'flex flex-col py-5 gap-5 w-1/2 border-dashed border-2 rounded-lg',
  inputNameContainer: 'p-0 w-full gap-5',
  inputName: 'p-0 my-3 w-full',
  inputSupplyContainer: 'p-0 w-full gap-5',
  inputSupply: 'p-0 my-3 w-full',
  inputDescriptionContainer: 'p-0 w-full gap-5',
  inputDescription: 'p-0 my-3 w-full',
  selectNetworkContainer: 'p-0 w-full gap-5',
  selectNetwork: 'p-0 my-3 w-full',

  bottomContainer: 'p-0 w-full gap-5 mt-5 justify-content-end',
  buttonCreate: `w-full`,
  textInfo: `flex w-full justify-end`,
};
