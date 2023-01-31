import * as React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper";

import { Stack, IconButton, Box } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

export interface ISliderImageProps {
  images: string[] | undefined;
  onClose: () => void;
}

export default function SliderImage(props: ISliderImageProps) {
  const images = props.images;

  return (
    <Stack spacing={2}>
      <Stack height="100%">
        <Box flex="1">
          <Swiper
            style={{
              //   "--swiper-navigation-color": "#fff",
              //   "--swiper-pagination-color": "#fff",
              marginBottom: "12px",
            }}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {images?.map((item) => (
              <SwiperSlide>
                <Stack
                  height="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img alt="" height="500px" src={item} />
                </Stack>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Stack>
      <span style={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={props.onClose}>
          <CloseIcon sx={{ color: "#fff", fontSize: "36px" }} />
        </IconButton>
      </span>
    </Stack>
  );
}
