import { useCallback, useEffect, useState } from "react";
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
import { numWithCommas } from "../../constraints/Util";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { orderTabs } from "../../constraints/OrderItem";
import dayjs from "dayjs";

export interface IPaymentProps {}

export default function Payment(props: IPaymentProps) {
  return <div>payment</div>;
}
