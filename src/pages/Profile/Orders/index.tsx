import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Tabs, Tab, Typography, Pagination, Stack } from "@mui/material";
import "./Orders.scss";
import SearchIcon from "@mui/icons-material/Search";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CancelIcon from "@mui/icons-material/Cancel";
import orderApi from "api/orderApi";
import { useAppSelector } from "app/hooks";
import { selectAccessToken, selectUser } from "features/auth/authSlice";
import OrderItem from "./OrderItem";

export interface IOrderProps {}

export default function Orders(props: IOrderProps) {
  const [orders, setOrders] = useState([]);
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  // const [totalPage, setTotalPage] = useState(1);
  const user = useAppSelector(selectUser);

  const accessToken = useAppSelector(selectAccessToken);

  const size = 10;

  useEffect(() => {
    const getData = async () => {
      if (user) {
        orderApi
          .getOrders(accessToken, user.id)
          .then((response) => {
            setOrders(response.reverse());
          })
          .catch((error) => console.log(error));
      }
    };
    getData();
  }, [user]);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const handleChangePage = (event: any, newValue: any) => {
    setPage(newValue);
  };

  return (
    <>
      <Typography variant="h6">Đơn hàng của tôi</Typography>
      <Box className="myorder" sx={{ width: "100%" }}>
        <Box className="myorder__tabs">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {orderTabs.map((item: any) => (
              <Tab
                key={item.id}
                label={item.type}
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "400",
                }}
                {...a11yProps(item._id)}
              />
            ))}
          </Tabs>
        </Box>

        <Box className="myorder__search">
          <div className="myorder__search__logo">
            <SearchIcon />
          </div>
          <input
            type="text"
            className="myorder__search__input"
            placeholder="Tìm đơn hàng theo Mã đơn hàng, Đơn hàng, nhà bán"
          />
          <div className="myorder__search__btn">Tìm đơn hàng</div>
        </Box>

        <Box>
          <TabPanel value={value} index={0} dir={theme.direction}>
            {orders.length !== 0 ? (
              orders.map((item: any) => (
                <OrderItem key={item._id} order={item} />
              ))
            ) : (
              <Box className="myorder__none">
                <img
                  height="200px"
                  width="200px"
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
                  alt=""
                />
                <Typography>Chưa có đơn hàng</Typography>
              </Box>
            )}
          </TabPanel>

          {orderTabs.slice(1, orderTabs.length).map((item: any) => {
            const tmp = getOrderByType(orders, item.id);

            if (tmp.length === 0)
              return (
                <TabPanel
                  key={item.id}
                  value={value}
                  index={item.id}
                  dir={theme.direction}
                >
                  <Box className="myorder__none">
                    <img
                      height="200px"
                      width="200px"
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
                      alt=""
                    />
                    <Typography>Chưa có đơn hàng</Typography>
                  </Box>
                </TabPanel>
              );
            else
              return (
                <TabPanel
                  key={item.id}
                  value={value}
                  index={item.id}
                  dir={theme.direction}
                >
                  {tmp.map((item: any) => (
                    <OrderItem key={item.id} order={item} />
                  ))}
                </TabPanel>
              );
          })}

          {/* {totalPage > 1 ? (
        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
          <Pagination
            count={totalPage}
            page={page}
            onChange={handleChangePage}
          />
        </Stack>
      ) : (
        <></>
      )} */}
        </Box>
      </Box>
    </>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const getOrderByType = (orders: any, id: string) => orders;

const orderTabs = [
  {
    id: 0,
    type: "Tất cả",
    icon: "",
  },
  {
    id: 1,
    type: "Chờ thanh toán",
    icon: HourglassBottomIcon,
  },
  {
    id: 2,
    type: "Đang xử lý",
    icon: AutoModeIcon,
  },
  {
    id: 3,
    type: "Đang vận chuyển",
    icon: RocketLaunchIcon,
  },
  {
    id: 4,
    type: "Đã giao",
    icon: LocalShippingIcon,
  },
  {
    id: 5,
    type: "Đã huỷ",
    icon: CancelIcon,
  },
];
