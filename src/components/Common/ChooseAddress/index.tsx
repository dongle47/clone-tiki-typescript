import { useEffect, useState } from "react";
import "./ChooseAddress.scss";
import { Button, Modal, Box, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import addressApi from "api/addressApi";
import { useAppSelector } from "app/hooks";
import { selectAccessToken, selectUser } from "features/auth/authSlice";
import { selectAddressList } from "features/address/addressSlice";

export interface IChooseAddressProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

export default function ChooseAddress(props: IChooseAddressProps) {
  const addresses = useAppSelector(selectAddressList);
  const dispatch = useDispatch();

  const user = useAppSelector(selectUser);

  const accessToken = useAppSelector(selectAccessToken);

  const chooseAddressShip = (address: any) => {
    // props.handleClose();
    // dispatch(setAddress(address));
  };

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box className="choose-address">
        <Stack direction="row" className="choose-coupon__heading">
          <span>Chọn địa chỉ</span>
          <CloseIcon onClick={props.handleClose} height="24px" />
        </Stack>
        <Stack spacing={5}>
          {addresses.map((item) => {
            return (
              <Stack
                direction="row"
                width="100%"
                className="items"
                key={item._id}
              >
                <Stack className="info">
                  <Typography className="name">{item.fullName}</Typography>
                  <Typography className="address">
                    Địa chỉ:{" "}
                    {`${item.detail}, ${item.ward.name}, ${item.district.name}, ${item.province.name}`}
                  </Typography>
                  <Typography className="number">
                    Điện thoại: {item.phone}
                  </Typography>
                </Stack>

                <Stack direction="row" className="action">
                  <Button className="Modify" variant="text">
                    Chỉnh sửa
                  </Button>
                  <Button
                    onClick={() => chooseAddressShip(item)}
                    className="Delete"
                    variant="text"
                  >
                    Chọn
                  </Button>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </Modal>
  );
}
