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

import "./Cart.scss";
import { cartActions, selectCart } from "./cartSlice";
import { useNavigate } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { numWithCommas } from "../../utils";

import CardItem from "./CardItem";

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
    dispatch(cartActions.deleteAll({}));
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

  return (
    <>
      <Box className="container">
        <Grid container spacing={2} style={{ marginTop: "24px" }}>
          <Grid item lg={9} md={12} sm={12} xs={12}>
            <Box>
              <Typography
                className="cart__title"
                gutterBottom
                variant="h5"
                component="div"
              >
                GIỎ HÀNG
              </Typography>

              <Box className="cart__heading cart">
                <Stack direction="row">
                  <Checkbox
                    checked={checkAll}
                    onChange={handleChooseAll}
                    className="cart__checkbox"
                  />
                  {`Tất cả (${CartItems.length} sản phẩm)`}
                </Stack>
                <Stack>Đơn giá</Stack>
                <Stack>Số lượng</Stack>
                <Stack>Thành tiền</Stack>
                <Stack>
                  <span onClick={openDialogDeleteAll}>
                    <DeleteOutlinedIcon />
                  </span>
                </Stack>
              </Box>
              <Stack className="cart__list">
                {CartItems.map((item) => (
                  <CardItem key={item.id} data={item} />
                ))}
              </Stack>
            </Box>
          </Grid>

          <Grid item lg={3} md={12} sm={12} xs={12}>
            <Box className="cart__address">
              {/* <Stack direction="row" mb={1.5} justifyContent="space-between">
                <Typography
                  style={{ fontSize: "16px", fontWeight: 500, color: "#888" }}
                >
                  Giao tới
                </Typography>
                <Typography
                  onClick={handleOpenAddress}
                  color="#1890ff"
                  sx={{ cursor: "pointer" }}
                >
                  Thay đổi
                </Typography>
              </Stack> */}

              {/* {user ? (
                addressShip && (
                  <>
                    <Typography mb={0.25} fontWeight={500}>
                      {addressShip.fullName}&nbsp;&nbsp;&nbsp;
                      {addressShip.phone}
                    </Typography>
                    <Typography color="#888">{`${addressShip.detail}, ${addressShip.ward.name}, ${addressShip.district.name}, ${addressShip.province.name}`}</Typography>
                  </>
                )
              ) : (
                <Typography mb={0.25} fontWeight={500}>
                  Vui lòng đăng nhập để chọn địa chỉ
                </Typography>
              )} */}
            </Box>

            <Box>
              <Grid className="cart-summary" container>
                <Grid item xs={6}>
                  <Item>Tổng tiền</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{numWithCommas(totalPrice)} ₫</Item>
                </Grid>
              </Grid>

              <Button
                variant="contained"
                // onClick={handleBuy}
                sx={{
                  width: "100%",
                  height: "42px",
                  backgroundColor: "#ff424e",
                  "&:hover": { opacity: 0.8, backgroundColor: "#ff424e" },
                }}
              >
                Mua hàng ({CartItems.filter((item) => item.choose).length})
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* {user && (
        <ChooseAddress
          handleOpen={handleOpenAddress}
          handleClose={handleCloseAddress}
          open={openAddress}
        />
      )} */}

      {dialogDelete && (
        <Dialog onClose={closeDialogDeleteAll} open={dialogDelete}>
          <Box className="dialog-removecart">
            <Box className="dialog-removecart__title">
              <h4>Xoá sản phẩm</h4>
            </Box>
            <Box className="dialog-removecart__content">
              Bạn có muốn xóa tất cả sản phẩm trong giỏ hàng
            </Box>
            <Box sx={{ padding: "0px" }} className="dialog-removecart__choose">
              <Button
                sx={{ height: "36px" }}
                variant="outlined"
                onClick={handleDeleteAll}
              >
                Xác nhận
              </Button>
              <Button
                variant="contained"
                onClick={closeDialogDeleteAll}
                sx={{ width: "57px", height: "36px" }}
              >
                Huỷ
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
    </>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
