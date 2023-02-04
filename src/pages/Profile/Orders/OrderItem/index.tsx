import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import "./OrderItem.scss";

import { numWithCommas } from "../../../../utils";

import { Link } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
export interface IOrderItemProps {
  order: any;
}

export default function OrderItem(props: IOrderItemProps) {
  const { order } = props;

  return (
    <Box className="orderItem">
      <Stack direction="row" className="orderItem__heading">
        <LocalShippingIcon color="disabled" />

        <Typography component="span" variant="h3" fontWeight={500} color="#888">
          Đã giao
        </Typography>
      </Stack>
      {order?.products.map((item: any) => (
        <Stack
          key={item.id}
          className="orderItem__product"
          direction="row"
          justifyContent="space-between"
        >
          <Stack
            className="orderItem__img"
            direction="row"
            justifyContent="space-between"
          >
            <img alt="" src={item.image} />
            <span className="orderItem__quantity">x{item.quantity}</span>
          </Stack>
          <Stack flex={1} mx="12px">
            <Link to={item.slug ? `/product/${item.slug}` : ""}>
              <Typography className="text-overflow-2-lines" fontSize="13px">
                {item.name}
              </Typography>
            </Link>
          </Stack>
          <Stack>
            <Typography className="orderItem__price">
              {numWithCommas(item.price * item.quantity)} ₫
            </Typography>
          </Stack>
        </Stack>
      ))}
      <Box>
        <Box className="orderItem__total">
          <Typography
            component="span"
            fontSize="17px"
            fontWeight="400"
            color="#888"
          >
            Tổng tiền
          </Typography>
          <Typography
            component="span"
            fontSize="17px"
            fontWeight="500"
            color="#333"
          >
            {numWithCommas(order.totalPrice)} ₫
          </Typography>
        </Box>
        <Box className="orderItem__groupbtn">
          <Link to={`/profile/order/detail/${order._id}`}>
            <Button variant="outlined">Xem chi tiết</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
