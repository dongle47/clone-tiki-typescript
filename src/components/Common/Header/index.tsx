import React, { useEffect, useState, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { DebounceInput } from "react-debounce-input";

import { Stack, Button, Typography, Badge, Box, Modal } from "@mui/material";

import "./Header.scss";

// import Login from "../../pages/Home/Login";
// import SignUp from "../../pages/Home/SignUp";
// import Search from "../Search";
// import ForgetPassword from "../../pages/Home/ForgetPassword";

// import { addItem } from "../../slices/searchSlice";
// import { logoutSuccess } from "../../slices/authSlice";

import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import productApi from "../../../api/productApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectCart } from "features/cart/cartSlice";
import Register from "features/auth/pages/Register";
import Login from "features/auth/pages/Login";
import { authActions, selectUser } from "features/auth/authSlice";

const privatePath = ["/customer/", "/admin/", "/payment"];

export interface IAppProps {}

export function Header(props: IAppProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // const searchedItems = useSelector((state: any) => state.search.items);
  const searchedItems = "";

  const [searchText, setSearchText] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleSubmitSearch = () => {
    // dispatch(removeAll());
    let obj = {
      text: searchText,
      slug: searchText.replace(/\s/g, "-"),
    };
    handleSaveSearch(obj);
    navigate(`search/${obj.slug}`);
  };

  useEffect(() => {
    const getSuggestions = async () => {
      let param = {
        // page: 1,
        size: 100,
      };
      // await productApi.getProducts(param).then((res) => {
      //   setSuggestions(res.products);
      // });
    };
    getSuggestions();
  }, []);

  var englishText = /^[A-Za-z0-9]*$/;

  const onChangeSearch = (event: any) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (searchText) {
      const checkIsVNese = () => {
        for (const item of searchText.replace(/\s/g, "")) {
          if (englishText.test(item) === false) {
            return true;
          }
          return false;
        }
      };

      const filter = suggestions.filter((item: any) =>
        item.slug.includes(searchText.replace(/\s/g, "-"))
      );

      const filterVN = suggestions.filter((item: any) =>
        item.name.includes(searchText)
      );

      if (checkIsVNese() === true) {
        setFilteredSuggestions(filterVN);
      } else {
        setFilteredSuggestions(filter);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const [modalLogin, setModalLogin] = useState(false);
  const openModalLogin = () => setModalLogin(true);

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgetPwd, setIsForgetPwd] = useState(false);

  const [focusSearch, setFocusSearch] = useState(false);

  // const cart = useSelector((state: any) => state.cart.items);
  const cart = useAppSelector(selectCart);

  const user = useAppSelector(selectUser);

  const handleSaveSearch = (data: any) => {
    // dispatch(addItem(data));
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    const isPrivate =
      privatePath.findIndex((e) => location.pathname.includes(e)) >= 0
        ? true
        : false;
    if (isPrivate) {
      navigate("/");
    }
  };

  const closeModalLogin = () => {
    setModalLogin(false);
    setIsLoginForm(true);
    setIsRegister(false);
    setIsForgetPwd(false);
  };

  const closeModalForgetPWD = () => {
    setIsForgetPwd(false);
    setModalLogin(false);
    setIsLoginForm(true);
    setIsRegister(false);
  };

  const handleReturnLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsForgetPwd(false);
    setIsRegister(false);
  }, []);

  const handleOpenSignUp = useCallback(() => {
    setIsRegister(true);
    setIsForgetPwd(false);
    setIsLoginForm(false);
  }, []);

  const handleOpenLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsRegister(false);
    setIsForgetPwd(false);
  }, []);

  const handleOpenForgetPwd = useCallback(() => {
    setIsForgetPwd(true);
    setIsRegister(false);
    setIsLoginForm(false);
  }, []);

  // useEffect(() => {
  //   document.addEventListener("click", (event) => {
  //     const searchResultElement = document.getElementById(
  //       "input-search-result"
  //     );
  //     if (searchResultElement) {
  //       const isClickInsideElement = searchResultElement.contains(event.target);
  //       if (!isClickInsideElement && event.target.id !== "input-search") {
  //         setFocusSearch(false);
  //       }
  //     }
  //   });
  //   return () => document.removeEventListener("click", () => {});
  // }, []);

  return (
    <header className="header">
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          height: "100px",
          width: "100%",
          maxWidth: "1240px",
          margin: "0 auto",
        }}
      >
        <Link className="header__logo" to={"/"}>
          <Stack spacing={1.5} pt={2}>
            <img
              alt=""
              style={{ width: "60px", height: "40px" }}
              src="https://salt.tikicdn.com/ts/upload/ae/f5/15/2228f38cf84d1b8451bb49e2c4537081.png"
            />
            <img
              style={{ width: "83px", height: "12px" }}
              alt=""
              src="https://salt.tikicdn.com/ts/upload/e5/1d/22/61ff572362f08ead7f34ce410a4a6f96.png"
            />
          </Stack>
        </Link>

        <Box sx={{ flex: 1 }} className="header__search">
          <Stack
            direction="row"
            alignItems="center"
            sx={{ padding: "0", height: "40px", flex: 1, position: "relative" }}
          >
            <DebounceInput
              style={{ height: "100%", flex: 1 }}
              id="input-search"
              placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."
              onFocus={() => setFocusSearch(true)}
              value={searchText}
              onChange={onChangeSearch}
              debounceTimeout={500}
            />

            {/* {focusSearch && (
              <Search
                handleSaveSearch={handleSaveSearch}
                setSearchText={setSearchText}
                suggestions={filteredSuggestions}
                searchedItems={searchedItems}
                searchText={searchText}
              />
            )} */}

            <Button
              sx={{
                height: "100%",
                width: "8rem",
                backgroundColor: "#0D5CB6",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
              }}
              variant="contained"
              startIcon={<SearchIcon />}
              // onClick={() => handleSubmitSearch(searchText)}
            >
              Tìm kiếm
            </Button>
          </Stack>
        </Box>

        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={3}
          py={2}
          className="header__account"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing="10px"
            sx={{ color: "white", width: "160px", maxWidth: "160px" }}
          >
            {user ? (
              <>
                <img alt="" src={user.avatar} />

                <Stack>
                  <Typography sx={{ fontSize: "11px" }}>Tài khoản</Typography>

                  <Button
                    sx={{ color: "white", padding: "6px 0" }}
                    endIcon={<ArrowDropDownOutlinedIcon />}
                  >
                    <Typography
                      className="text-overflow-1-lines"
                      sx={{ fontSize: "13px", textAlign: "start" }}
                    >
                      {user.fullName === ""
                        ? "Cập nhật thông tin"
                        : user.fullName}
                    </Typography>
                  </Button>
                </Stack>

                <Box className="header__dropdown">
                  <Link to={"/customer/order/history"}>Đơn hàng của tôi</Link>

                  <Link to={"/customer/wishlist"}>Sản phẩm yêu thích</Link>

                  <Link to={"/customer/notification"}>Thông báo của tôi</Link>

                  <Link to={"/customer/account/edit"}>Tài khoản của tôi</Link>

                  <Link to="/customer/coupons">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <img
                        className="header__dropdown-img"
                        alt=""
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/mycoupon/coupon_code.svg"
                      />
                      <Stack>
                        <Box>Mã giảm giá </Box>
                        <Box>
                          Bạn đang có <b>2</b> mã giảm giá
                        </Box>
                      </Stack>
                    </Stack>
                  </Link>

                  <Link to="/">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <img
                        className="header__dropdown-img"
                        alt=""
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/TopUpXu/xu-icon.svg"
                      />
                      <Stack>
                        <Box>Thông tin Tiki xu</Box>
                        <Box>
                          Bạn đang có <b>0</b> Tiki xu
                        </Box>
                      </Stack>
                    </Stack>
                  </Link>

                  <Box onClick={handleLogout}>Thoát tài khoản</Box>
                </Box>
              </>
            ) : (
              <>
                <PersonOutlineOutlinedIcon fontSize="large" />

                <Stack>
                  <Typography sx={{ fontSize: "11px" }}>
                    Đăng nhập / Đăng ký
                  </Typography>

                  <Button
                    onClick={openModalLogin}
                    sx={{ color: "white" }}
                    endIcon={<ArrowDropDownOutlinedIcon />}
                  >
                    <Typography sx={{ fontSize: "13px" }}>Tài khoản</Typography>
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Stack>

        <Stack spacing={1} className="header__cart">
          <Link to="/cart">
            <Stack
              justifyContent="flex-start"
              alignItems="flex-end"
              direction="row"
              spacing={1}
              sx={{ color: "white", width: "110px", maxWidth: "110px" }}
            >
              <Badge color="warning" badgeContent={cart.length} showZero>
                <ShoppingCartOutlinedIcon sx={{ fontSize: "32px" }} />
              </Badge>
              <Typography fontSize="12px">Giỏ hàng</Typography>
            </Stack>
          </Link>
        </Stack>
      </Stack>

      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalLogin}
        onClose={closeModalLogin}
      >
        <Box className="modal-login" sx={{ width: "800px" }}>
          {isLoginForm && (
            <Login
              handleOpenSignUp={handleOpenSignUp}
              closeModalLogin={closeModalLogin}
              // handleOpenForgetPwd={handleOpenForgetPwd}
            />
          )}

          {isRegister && (
            <Register
              handleOpenLogin={handleOpenLogin}
              closeModalLogin={closeModalLogin}
            />
          )}

          {isForgetPwd && (
            // <ForgetPassword
            //   closeModalForgetPWD={closeModalForgetPWD}
            //   handleReturnLogin={handleReturnLogin}
            // />
            <></>
          )}
        </Box>
      </Modal>
    </header>
  );
}
