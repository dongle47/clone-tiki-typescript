import React, { useEffect, useState } from "react";
import "./CartItem.scss";
import {
  Checkbox,
  Typography,
  Dialog,
  Button,
  Box,
  Stack,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { numWithCommas } from "../../../utils";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../cartSlice";

export interface ICardItemProps {
  data: any;
}

export default function CardItem(props: ICardItemProps) {
  const [data, setData] = useState(props.data);
  const [quantity, setQuantity] = useState(props.data.quantity);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickRemove = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveItem = () => {
    dispatch(cartActions.removeItem(data));
    setOpen(false);
  };

  useEffect(() => {
    setData(props.data);
    setQuantity(props.data.quantity);
  }, [props.data]);
  const updateQuantity = (otp: any) => {
    if (otp === "-") {
      if (data.quantity <= 1) {
        handleClickRemove();
      } else {
        dispatch(
          cartActions.updateItem({
            ...data,
            quantity: data.quantity - 1,
          })
        );
      }
    } else if (otp === "+") {
      dispatch(
        cartActions.updateItem({
          ...data,
          quantity: data.quantity + 1,
        })
      );
    }
  };
  const onChangeQuantity = (e: any) => {
    setQuantity(e.target.value);
    if (e.target.value === "") {
      return;
    }

    if (Number.isInteger(Number(e.target.value))) {
      let num = Number(e.target.value);
      if (num <= 0) {
        handleClickRemove();
      } else {
        dispatch(
          cartActions.updateItem({
            ...data,
            quantity: num,
          })
        );
      }
    }
  };

  const handleChangeChoose = () => {
    dispatch(
      cartActions.updateItem({
        ...data,
        choose: !data.choose,
      })
    );
  };

  return (
    <>
      <Box className="cart-item cart">
        <Stack
          direction="row"
          alignItems="center"
          className="cart-item__cell cart-item__description"
        >
          <Checkbox
            checked={data?.choose}
            onChange={handleChangeChoose}
            className="cart__checkbox"
          />
          <img src={data?.image} alt="" />
          <Stack className="cart-item__content">
            <Link to={data?.slug ? `/product/${data.slug}` : ""}>
              <Typography
                fontSize="13px"
                className="text-overflow-2-lines"
                variant="h5"
              >
                {data?.name}
              </Typography>
            </Link>
          </Stack>
        </Stack>
        <Box className="cart-item__cell cart-item__price">
          {numWithCommas(data?.price || 0)} ???
        </Box>
        <Box className="cart-item__cell">
          <Box className="cart-item__quantity">
            <button
              onClick={() => {
                updateQuantity("-");
              }}
            >
              -
            </button>
            <input onChange={onChangeQuantity} type="text" value={quantity} />
            <button
              onClick={() => {
                updateQuantity("+");
              }}
            >
              +
            </button>
          </Box>
        </Box>
        <Box className="cart-item__cell cart-item__total">
          {numWithCommas(data?.price * data?.quantity)} ???
        </Box>
        <Box className="cart-item__cell">
          <span style={{ cursor: "pointer" }} onClick={handleClickRemove}>
            <DeleteOutlinedIcon />
          </span>
        </Box>
      </Box>

      <Dialog onClose={handleClose} open={open}>
        <Box className="dialog-removecart">
          <Box className="dialog-removecart__title">
            <h4>Xo?? s???n ph???m</h4>
          </Box>
          <Box className="dialog-removecart__content">
            B???n c?? mu???n x??a s???n ph???m ??ang ch???n?
          </Box>
          <Box className="dialog-removecart__choose">
            <Button
              variant="outlined"
              onClick={handleRemoveItem}
              sx={{ width: "94px", height: "36px" }}
            >
              X??c nh???n
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ width: "57px", height: "36px" }}
            >
              Hu???
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
