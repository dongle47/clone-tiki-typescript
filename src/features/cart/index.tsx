import { useAppDispatch, useAppSelector } from "app/hooks";
import { useCallback, useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import {
  Grid,
  Typography,
  Checkbox,
  Button,
  Stack,
  Box,
  Dialog,
  Paper,
} from "@mui/material";

import "./cart.scss";
import { cartActions, selectCart } from "./cartSlice";
import { useNavigate } from "react-router-dom";

export interface ICartProps {}

export default function Cart(props: ICartProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const CartItems = useAppSelector(selectCart);

  // const user = useSelector((state) => state.auth.user);

  const [openAddress, setOpenAddress] = useState(false);

  const [dialogDelete, setDialogDelete] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  const [checkAll, setCheckAll] = useState(false);

  // const addressShip = useSelector((state) => state.payment.address);

  useEffect(() => {
    const calcPrice = () => {
      const total = CartItems.reduce(
        (t, num) => (num.choose ? t + num.price * num.quantity : t),
        0
      );
      setTotalPrice(total);
    };
    const checkChooseAll = () => {
      if (CartItems.every((item) => item.choose)) setCheckAll(true);
      else setCheckAll(false);
    };
    calcPrice();
    checkChooseAll();
  }, [CartItems]);

  // useEffect(() => {
  //   const loadTitle = () => {
  //     document.title = "Giỏ hàng | Tiki.vn";
  //   };
  //   loadTitle();
  // }, []);

  const handleChooseAll = () => {
    if (checkAll) {
      setCheckAll(false);
      dispatch(cartActions.unChooseAll({}));
    } else {
      setCheckAll(true);
      dispatch(cartActions.chooseAll({}));
    }
  };

  const handleDeleteAll = () => {
    dispatch(cartActions.deleteAll);
    closeDialogDeleteAll();
  };

  const openDialogDeleteAll = () => {
    setDialogDelete(true);
  };

  const closeDialogDeleteAll = () => {
    setDialogDelete(false);
  };

  // const handleOpenAddress = useCallback(() => {
  //   if (user) {
  //     setOpenAddress(true);
  //   } else {
  //     toast.warning("Vui lòng đăng nhập để chọn địa chỉ");
  //   }
  // }, [user]);

  // const handleCloseAddress = useCallback(() => setOpenAddress(false), []);

  // const handleBuy = () => {
  //   if (CartItems.filter((item) => item.choose).length === 0) {
  //     toast.warning("Vui lòng chọn ít nhất một món hàng");
  //   } else {
  //     navigate("/payment");
  //   }
  // };

  return <div>Cart</div>;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
