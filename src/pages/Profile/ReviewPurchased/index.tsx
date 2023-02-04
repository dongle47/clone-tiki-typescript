import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

import {
  Box,
  Stack,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Rating,
  Pagination,
  Grid,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { toast } from "react-toastify";
import "./ReviewPurchased.scss";

export interface IReviewPurchasedProps {}

export default function ReviewPurchased(props: IReviewPurchasedProps) {
  return <div>ReviewPurchased</div>;
}
