import React from "react";

import { Routes, Route, Link, useLocation } from "react-router-dom";

import "./Profile.scss";

import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarHalfIcon from "@mui/icons-material/StarHalf";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Breadcrumbs,
} from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// import Info from "./Info/index";
// import Password from "./Info/Password";
// import Orders from "./Orders/index";
// import Addresses from "./Addresses/index";
// import CreateAddress from "./Addresses/CreateAddress";
// import ReviewPurchased from "./ReviewPurchased/index";
// import WishList from "./WishList";
// import MyReview from "./MyReview/index";
// import DetailOrder from "./Orders/DetailOrder";

export interface IProfileProps {}

export default function Profile(props: IProfileProps) {
  const location = useLocation();
  const tabId = sidebarTab.find((item) =>
    location.pathname.includes(item.link)
  );

  const [selectedTabId, setSelectedTabId] = React.useState(tabId?.id || 0);

  const breadcrumbs = [
    <Link
      //   underline="hover"
      key="1"
      color="inherit"
      to="/"
      style={{ fontSize: "14px" }}
    >
      Trang chủ
    </Link>,
    <Typography key="2" color="text.primary" fontSize="14px">
      {sidebarTab.find((item) => item.id === selectedTabId)?.text || ""}
    </Typography>,
  ];

  React.useEffect(() => {
    const handleChangePath = () => {
      const tabId = sidebarTab.find((item) =>
        location.pathname.includes(item.link)
      );
      if (tabId) setSelectedTabId(tabId?.id || 0);
    };
    handleChangePath();
  }, [location.pathname]);

  React.useEffect(() => {
    document.title =
      sidebarTab.find((item) => item.id === selectedTabId)?.text ||
      "Tiki - Mua hàng online, giá tốt, hàng chuẩn, ship nhanh";
  }, [selectedTabId]);

  return <div>Profile</div>;
}

const sidebarTab = [
  {
    id: 1,
    icon: PersonIcon,
    text: "Thông tin tài khoản",
    link: "/profile/account/edit",
  },
  // {
  //   id: 2,
  //   icon: NotificationsIcon,
  //   text: "Thông báo của tôi",
  //   link: "/profile/notification",
  // },
  {
    id: 3,
    icon: ListAltIcon,
    text: "Quản lý đơn hàng",
    link: "/profile/order/history",
  },
  {
    id: 4,
    icon: LocationOnIcon,
    text: "Sổ địa chỉ",
    link: "/profile/address",
  },
  // {
  //     id: 5,
  //     icon: CreditCardIcon,
  //     text: 'Thông tin thanh toán',
  //     link: '/profile/paymentcard'
  // },
  {
    id: 6,
    icon: RateReviewIcon,
    text: "Nhận xét sản phẩm đã mua",
    link: "/profile/nhan-xet-san-pham-ban-da-mua",
  },
  {
    id: 7,
    icon: FavoriteIcon,
    text: "Sản phẩm yêu thích",
    link: "/profile/wishlist",
  },
  {
    id: 8,
    icon: StarHalfIcon,
    text: "Nhận xét của tôi",
    link: "/profile/review",
  },
  // {
  //   id: 9,
  //   icon: DiscountIcon,
  //   text: "Mã giảm giá",
  //   link: "/profile/coupons",
  // },
];
