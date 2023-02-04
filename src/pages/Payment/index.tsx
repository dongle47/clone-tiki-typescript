import { useCallback, useEffect, useState } from "react";

import { numWithCommas, orderTabs } from "../../utils";

import "./Payment.scss";
import {
  Grid,
  Typography,
  Box,
  Button,
  Stack,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAccessToken, selectUser } from "features/auth/authSlice";
import { selectCart } from "features/cart/cartSlice";
import addressApi from "api/addressApi";
import { selectAddressList } from "features/address/addressSlice";
import { Loading } from "components/Common";
import ChooseAddress from "components/Common/ChooseAddress";
import orderApi from "api/orderApi";

export interface IPaymentProps {}

export default function Payment(props: IPaymentProps) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const accessToken = useAppSelector(selectAccessToken);

  const CartItems = useAppSelector(selectCart);

  const addressShip = useAppSelector(selectAddressList)[0];

  const [totalPrice, setTotalPrice] = useState(0);

  const [openAddress, setOpenAddress] = useState(false);

  const [ship, setShip] = useState("shipping1");

  const [payment, setPayment] = useState("1");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const feeShip = ship === "shipping1" ? 40000 : 20000;

  useEffect(() => {
    const calcPrice = () => {
      const total = CartItems.reduce(
        (t, num) => (num.choose ? t + num.price * num.quantity : t),
        0
      );
      setTotalPrice(Math.round(total));
    };
    calcPrice();
  }, [CartItems]);

  useEffect(() => {
    const getAddresses = () => {
      if (user) {
        addressApi.getAddressByUser(accessToken, user.id).catch(() => {
          navigate("/customer/address/create");
          toast.warning("Vui lòng thêm địa chỉ mới");
        });
      }
    };
    getAddresses(); // eslint-disable-next-line react-hooks/exhaustive-deps

    const calcPrice = () => {
      if (CartItems.filter((item) => item.choose).length === 0) {
        toast.warning("Vui lòng chọn ít nhất một món hàng");
        navigate("/cart");
        return;
      }
    };
    calcPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadTitle = () => {
      document.title = "Đơn hàng của tôi | Tiki.vn";
    };
    loadTitle();
  }, []);

  const handleChangeTypeShip = (event: any) => {
    setShip(event.target.value);
  };

  const handleChangeTypePayment = (event: any) => {
    setPayment(event.target.value);
  };

  const handleOpenAddress = useCallback(() => setOpenAddress(true), []);
  const handleCloseAddress = useCallback(() => setOpenAddress(false), []);

  const finalPrice = () => {
    return totalPrice + feeShip > 0 ? Math.round(totalPrice + feeShip) : 0;
  };

  const handleSubmitOrderFake = () => {
    if (loading) {
      toast.info(
        "Thanh toán đang được thực hiện. Vui lòng không thao tác quá nhanh"
      );
      return;
    }

    if (!addressShip) {
      toast.warning("Vui lòng chọn địa chỉ giao hàng");
      return;
    }

    const payload = {
      userId: user?.id,
      address: addressShip,
      shipping: shippingMethods.find((item) => item.id === ship),
      payment: paymentMethods.find((item) => item.id === payment),
      totalPrice,
      products: CartItems.filter((item) => item.choose).map((item) => {
        return { ...item, discount: 0 };
      }),
      createdAt: dayjs(new Date()).format("DD-MM-YYYY HH:mm:ss"),
    };

    setLoading(true);

    orderApi
      .postOrder(accessToken, payload)
      .then((res) => {
        toast.success("Đặt hàng thành công!");

        // dispatch(deleteItemsPayment());
        navigate("/customer/order/history");
        return;
      })
      .catch((error) => {
        toast.error("Đặt hàng không thành công. Vui lòng thử lại");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Box className="container">
        <Grid container spacing={2} mt="24px">
          <Grid item lg={8} md={12} sm={12} xs={12}>
            <Box bgcolor="#fff" p={2}>
              <Box mb={2}>
                <Typography
                  className="payment__title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Danh sách sản phẩm
                </Typography>
                <Stack className="payment__listItem">
                  {CartItems.filter((item) => item.choose).map((item) => (
                    <Stack
                      key={item.id}
                      direction="row"
                      className="orderDetail__item"
                      p={1}
                    >
                      <Box mr={1.875}>
                        <img
                          height="60px"
                          width="60px"
                          src={item.image}
                          alt=""
                        />
                      </Box>
                      <Stack spacing={1.5} width="100%">
                        <Link to={"/"}>
                          <Typography sx={{ fontSize: "14px" }}>
                            {item.name}
                          </Typography>
                        </Link>
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                        >
                          <Typography fontSize="14px" color="#888">
                            SL:{item.quantity}
                          </Typography>
                          <Typography fontSize="14px" color="#888">
                            {numWithCommas(item.quantity * item.price || 0)} ₫
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Box>
              <Box mb={2}>
                <Typography
                  className="payment__title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Chọn hình thức giao hàng
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={ship}
                  onChange={handleChangeTypeShip}
                >
                  {shippingMethods.map((item) => (
                    <Stack key={item.id} direction="row" height="48px">
                      <Radio
                        name="shipping"
                        value={item.id}
                        id={item.id}
                        sx={{ padding: 0, marginRight: "8px" }}
                      />
                      <Typography
                        sx={{ margin: "auto 0" }}
                        component="label"
                        htmlFor={item.id}
                      >
                        {item.display}
                      </Typography>
                    </Stack>
                  ))}
                </RadioGroup>
              </Box>
              <Box>
                <Typography
                  className="payment__title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Chọn hình thức thanh toán
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={payment}
                  onChange={handleChangeTypePayment}
                >
                  {paymentMethods.map((item) => (
                    <Stack
                      key={item.id}
                      direction="row"
                      alignItems="center"
                      sx={{ height: "64px" }}
                    >
                      <Radio
                        name="payment"
                        id={String(item.id)}
                        value={item.value}
                        sx={{ padding: 0, marginRight: "8px" }}
                      />
                      <img
                        alt=""
                        width="32px"
                        height="32px"
                        style={{ marginRight: "12px" }}
                        src={item.image}
                      ></img>
                      <label htmlFor={item.id}>
                        <Typography sx={{ margin: "auto 0" }}>
                          {item.display}
                        </Typography>
                      </label>
                    </Stack>
                  ))}
                </RadioGroup>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Box className="cart__address">
              <Stack direction="row" mb={1.5} justifyContent="space-between">
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
              </Stack>
              {addressShip && (
                <>
                  <Typography mb={0.25} fontWeight={500}>
                    {addressShip.fullName}&nbsp;&nbsp;&nbsp;{addressShip.phone}
                  </Typography>
                  <Typography color="#888">{`${addressShip.detail}, ${addressShip.ward.name}, ${addressShip.district.name}, ${addressShip.province.name}`}</Typography>
                </>
              )}
            </Box>

            <Box>
              <Box className="cart-summary">
                <Stack direction="row" justifyContent="space-between">
                  <Typography style={{ fontWeight: 500, color: "#333" }}>
                    Đơn hàng
                  </Typography>
                </Stack>

                <Box py={1}>
                  <Box className="cart-summary__price">
                    <span>Tạm tính</span>
                    <span>{numWithCommas(totalPrice)} ₫</span>
                  </Box>
                  <Box className="cart-summary__price">
                    <span>Phí vận chuyển</span>
                    <span>{numWithCommas(feeShip)} ₫</span>
                  </Box>

                  <Box className="cart-summary__divider"></Box>
                  <Box className="cart-summary__price">
                    <span>Tổng tiền</span>
                    <Box className="cart-summary__valueprice">
                      <span>{numWithCommas(finalPrice())} ₫</span>
                      <span>(Đã bao gồm VAT nếu có)</span>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Button
                variant="contained"
                onClick={handleSubmitOrderFake}
                sx={{
                  width: "100%",
                  height: "42px",
                  backgroundColor: "#ff424e",
                  "&:hover": { opacity: 0.8, backgroundColor: "#ff424e" },
                }}
              >
                {loading && <Loading />} Mua hàng
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <ChooseAddress
        handleOpen={handleOpenAddress}
        handleClose={handleCloseAddress}
        open={openAddress}
      />
    </>
  );
}

const shippingMethods = [
  {
    id: "shipping1",
    display: "Giao hàng nhanh",
    fee: 40000,
  },
  {
    id: "shipping2",
    display: "Giao hàng tiêu chuẩn",
    fee: 20000,
  },
];

const paymentMethods = [
  {
    id: "1",
    display: "Thanh toán tiền mặt khi nhận hàng",
    value: "1",
    image:
      "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg",
  },
  {
    id: "2",
    display: "Thanh toán bằng Momo",
    value: "3",
    image:
      "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-momo.svg",
  },
  {
    id: "3",
    display: "Thanh toán bằng ZaloPay",
    value: "4",
    image:
      "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-zalo-pay.svg",
  },
  {
    id: "4",
    display: "Thanh toán bằng VNPay",
    value: "5",
    image:
      "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-vnpay.png",
  },
];
