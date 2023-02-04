import React, { useEffect, useState } from "react";
import "./DetailOrder.scss";
import { Box, Stack, Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { numWithCommas } from "../../../../utils";
import orderApi from "api/orderApi";
import { useAppSelector } from "app/hooks";
import { selectAccessToken, selectUser } from "features/auth/authSlice";

export interface IDetailOrderProps {}

export default function DetailOrder(props: IDetailOrderProps) {
  const id = useParams().id;

  const user = useAppSelector(selectUser);

  const accessToken = useAppSelector(selectAccessToken);

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const getData = () => {
      if (user) {
        orderApi
          .getOrders(accessToken, user.id)
          .then((res) => {
            setOrder(res.find((item: any) => item._id === id));
          })
          .catch((error) => {
            setOrder(null);
            toast.warning("Không tìm thấy đơn hàng");
          });
      }
    };
    getData();
  }, [id]);

  return (
    <>
      <Box>
        <Typography mt={2.5} fontSize="19px" fontWeight={300}>
          Chi tiết đơn hàng #{order?._id}
        </Typography>
        <Typography fontSize="13px" textAlign="end">
          Ngày đặt hàng: {order?.createdAt}
        </Typography>
        <Stack
          direction="row"
          mt={1.25}
          mb={2.5}
          className="detailOrder"
          justifyContent="space-between"
        >
          <Box className="detailOrder__boxInfo">
            <Typography>ĐỊA CHỈ NHẬN HÀNG</Typography>
            <Box p={1.25} className="detailOrder__content">
              <Typography style={{ color: "#000", fontWeight: 500 }}>
                {order?.address?.fullName}
              </Typography>
              <Typography>
                Địa chỉ:{" "}
                {order?.address
                  ? `${order?.address?.detail}, ${order?.address?.ward?.name},
                              ${order?.address?.district?.name},
                              ${order?.address?.province?.name}`
                  : "Trống"}
              </Typography>
              <Typography>Điện thoại: {order?.address?.phone}</Typography>
            </Box>
          </Box>

          <Box className="detailOrder__boxInfo">
            <Typography>HÌNH THỨC GIAO HÀNG</Typography>
            <Box p={1.25} className="detailOrder__content">
              <Typography>
                <img
                  width="56px"
                  height="16px"
                  src="https://salt.tikicdn.com/ts/upload/2a/47/46/0e038f5927f3af308b4500e5b243bcf6.png"
                  alt=""
                />
                {order?.shipping?.display}
              </Typography>
              <Typography>Phí vận chuyển: {order?.shipping.fee}đ</Typography>
            </Box>
          </Box>
          <Box className="detailOrder__boxInfo">
            <Typography>HÌNH THỨC THANH TOÁN</Typography>

            <Box p={1.25} className="detailOrder__content">
              <Typography style={{ color: "#fda223" }}>
                {order?.payment?.display}
              </Typography>
            </Box>
          </Box>
        </Stack>

        <Stack className="detailOrder-Table">
          <Stack direction="row" className="detailOrder-Table__heading">
            <Box>Sản phẩm</Box>
            <Box>Giá</Box>
            <Box>Số lượng</Box>
            <Box>Giảm giá</Box>
            <Box>Tạm tính</Box>
          </Stack>
          {order?.products?.map((item: any) => (
            <Stack
              key={item}
              direction="row"
              className="detailOrder-Table__row"
            >
              <Stack direction="row" className="orderDetail__item">
                <Box mr={1.875}>
                  <img height="60px" width="60px" src={item.image} alt="" />
                </Box>

                <Stack spacing={1.5}>
                  <Link to={item.slug ? `/product/${item.slug}` : ""}>
                    <Typography fontSize="14px">{item.name}</Typography>
                  </Link>
                </Stack>
              </Stack>

              <Box>{numWithCommas(item.price || 0)}₫</Box>
              <Box>{numWithCommas(item.quantity || 0)}</Box>
              <Box>{numWithCommas(item.discount || 0)} ₫</Box>
              <Box>
                {numWithCommas(item.price * item.quantity - item.discount || 0)}{" "}
                ₫
              </Box>
            </Stack>
          ))}
        </Stack>
        {order && (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-end"
            mt={3.5}
          >
            <Stack py={0.625} direction="row">
              <Typography className="detailOrder__summary-label">
                Tạm tính
              </Typography>
              <Typography className="detailOrder__summary-value">
                {numWithCommas(order?.totalPrice || 0)} ₫
              </Typography>
            </Stack>
            <Stack py={0.625} direction="row">
              <Typography className="detailOrder__summary-label">
                Giảm giá
              </Typography>
              <Typography className="detailOrder__summary-value">
                {numWithCommas(order?.discount || 0)} ₫
              </Typography>
            </Stack>
            <Stack py={0.625} direction="row">
              <Typography className="detailOrder__summary-label">
                Phí vận chuyển
              </Typography>
              <Typography className="detailOrder__summary-value">
                {numWithCommas(order?.shipping.fee || 0)} ₫
              </Typography>
            </Stack>
            <Stack py={0.625} direction="row">
              <Typography className="detailOrder__summary-label">
                Tổng cộng
              </Typography>
              <Typography className="detailOrder__summary-value detailOrder__summary-value--final">
                {numWithCommas(
                  Number(order.totalPrice) + Number(order.shipping.fee) || 0
                )}{" "}
                ₫
              </Typography>
            </Stack>
          </Stack>
        )}
      </Box>
    </>
  );
}
