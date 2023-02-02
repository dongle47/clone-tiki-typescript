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
import CreateAddress from "./Addresses/CreateAddress";
import Address from "./Addresses";

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

  return (
    <Box className="container">
      {/* <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        p="16px 16px 8px"
        fontSize="14px"
      >
        {breadcrumbs}
      </Breadcrumbs> */}

      <Box className="customer-account">
        <Box width="16rem">
          <List sx={{ maxWidth: "300px" }}>
            {sidebarTab.map((item, index) => {
              return (
                <Link key={item.id} to={item.link}>
                  <ListItem
                    disablePadding
                    onClick={() => setSelectedTabId(item.id)}
                    selected={selectedTabId === item.id}
                  >
                    <ListItemButton>
                      <ListItemIcon>{<item.icon />}</ListItemIcon>

                      <ListItemText
                        primary={item.text}
                        sx={{ "&>span": { fontSize: "13px" } }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Box>
        <Box flex={1} mt="16px">
          {/* <Outlet /> */}
          <Routes>
            <Route
              path="account/edit/*"
              element={
                <Routes>
                  {/* <Route index element={<Info />} />
                  <Route path="pass" element={<Password />} /> */}
                </Routes>
              }
            />

            <Route
              path="order/*"
              element={
                <Routes>
                  {/* <Route path="history" element={<Orders />} />
                  <Route path="detail/:id" element={<DetailOrder />} /> */}
                </Routes>
              }
            />

            <Route
              path="address/*"
              element={
                <Routes>
                  <Route index element={<Address />} />

                  <Route
                    path="create"
                    element={<CreateAddress edit={false} />}
                  />

                  <Route
                    path="edit/:addressId"
                    element={<CreateAddress edit={true} />}
                  ></Route>
                </Routes>
              }
            />

            {/* <Route
              path="/nhan-xet-san-pham-ban-da-mua"
              element={<ReviewPurchased />}
            />

            <Route path="/wishlist" element={<WishList />} />

            <Route path="/review" element={<MyReview />} /> */}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
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
