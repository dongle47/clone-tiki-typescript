import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

import { Grid, Stack, Button, Box } from "@mui/material";
// import CardProduct from "../../components/CardProduct";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import apiHome from "../../apis/apiHome";
import productApi from "../../api/productApi";
import { Product, ResponseProduct, WishItem } from "models";
import { CardProduct, Loading } from "../../components/Common";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAccessToken, selectUser } from "features/auth/authSlice";
import { wishListActions } from "features/wishList/wishListSlice";
import userApi from "api/userApi";
import addressApi from "api/addressApi";
import addressReducer, {
  addressListActions,
} from "features/address/addressSlice";
import addressListReducer from "features/address/addressSlice";
import { Address } from "cluster";

// import SliderThuongHieu from "./SliderThuongHieu";
// import SliderKhuyenMai from "./SliderKhuyenMai";
// import Categories from "./Categories";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<Product[]>([]);

  const [quickLink, setQuickLink] = useState([]);

  const [CategorySpecify, setCategorySpecify] = useState([]);

  const [loadingShowMore, setLoadingShowMore] = useState(false);

  const [page, setPage] = useState(1);

  const user = useAppSelector(selectUser);

  const accessToken = useAppSelector(selectAccessToken);

  const size = 18;

  useEffect(() => {
    const getData = async () => {
      setLoadingShowMore(true);
      let param = {
        page: page,
        size: size,
      };

      productApi
        .getPaginate(param)
        .then((res: ResponseProduct) => {
          setProducts((pre) => [...pre, ...res.products]);
        })
        .finally(() => setLoadingShowMore(false));
    };

    getData();
  }, [page]);

  useEffect(() => {
    if (user) {
      userApi.getWishListByUser(user.id).then((res: WishItem[]) => {
        res.forEach((item) => {
          dispatch(wishListActions.addWishList(item));
        });
      });

      addressApi
        .getAddressByUser(accessToken, user.id)
        .then((res: Address[]) => {
          res.forEach((item) => {
            dispatch(addressListActions.addAddressItem(item));
          });
        })
        .catch((err) => console.log("error", err));
    }
  }, []);

  // useEffect(() => {
  //   const getDataQuickLink = async () => {
  //     let param = {};
  //     const response = await apiHome.getQuickLink(param);
  //     if (response) {
  //       setQuickLink(response);
  //     }
  //   };
  //   getDataQuickLink();

  //   const getDataCategorySpecify = async () => {
  //     await apiHome
  //       .getCategorySpecify()
  //       .then((res) => {
  //         setCategorySpecify(res);
  //       })
  //       .catch((err) => console.log(err));
  //   };
  //   getDataCategorySpecify();
  // }, []);

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
      <Box className="category">
        <Box className="container">{/* <Categories /> */}</Box>
      </Box>

      <Stack spacing={2} className="container home">
        <Box id="section1">{/* <SliderKhuyenMai /> */}</Box>

        <Box id="section3">
          <Box width="16.45%">
            <img
              style={{ maxHeight: "160px" }}
              src="https://salt.tikicdn.com/cache/w200/ts/banner/15/54/a3/dc054f7084003d4c9f5e100249fff610.png.webp"
              alt=""
            />
          </Box>
          <Box width="64.52%">
            <img
              src="https://salt.tikicdn.com/cache/w750/ts/banner/20/af/9d/85c2367e8eb8c832e631842e75364fe2.png.webp"
              alt=""
            />
          </Box>
          <Box width="16.45%">
            <img
              style={{ maxHeight: "160px" }}
              src="https://salt.tikicdn.com/cache/w200/ts/banner/da/12/bb/6c23d2e7f4a0242b01c3f9c5619bb140.png.webp"
              alt=""
            />
          </Box>
        </Box>
        <Box id="section4">
          <Box className="quicklink__wrap">
            {/* {quickLink.map((item) => (
              <Link key={item.id} to={item.link}>
                <Box className="quicklink__item">
                  <img
                    style={{ width: "48px" }}
                    src={item.image}
                    alt={item.alt}
                  />
                  <span>{item.alt}</span>
                </Box>
              </Link>
            ))} */}
          </Box>
        </Box>
        <Box id="section5">
          <Box className="banner__wrap1">
            <img
              src="https://salt.tikicdn.com/cache/w280/ts/banner/f9/50/fd/80d44082ed11e523c7a48bc648018d11.png.webp"
              alt=""
            />
            <img
              src="https://salt.tikicdn.com/cache/w280/ts/banner/88/b4/4b/84bd376e4b0c8513036a0d562c7bcfb6.png.webp"
              alt=""
            />
            <img
              src="https://salt.tikicdn.com/cache/w280/ts/banner/8a/be/67/38ec52352aa1550dc8c128dd0969f757.png.webp"
              alt=""
            />
            <img
              src="https://salt.tikicdn.com/cache/w280/ts/banner/ed/0d/3b/7dc88059494e699d3c77248d7d42e5d0.png.webp"
              alt=""
            />
          </Box>
        </Box>

        <Box id="section6">
          <Box className="section__heading" p="16px 0 !important">
            <Box className="section__title">
              <span>
                <img
                  style={{ width: "24px" }}
                  src="https://salt.tikicdn.com/ts/upload/33/0f/67/de89fab36546a63a8f3a8b7d038bff81.png"
                  alt=""
                />
              </span>
              Thương Hiệu Chính Hãng
            </Box>
            <Link className="section__more" to={"/xem-them"}>
              XEM THÊM
            </Link>
          </Box>

          {/* <SliderThuongHieu /> */}
        </Box>

        <Box id="section7">
          <Box className="section__heading" mb={2}>
            <Box className="section__title">Danh Mục Nổi Bật</Box>
          </Box>
          <Box className="specify__wrap">
            {/* {CategorySpecify.map((item) => (
              <Link key={item.id} to={item.link}>
                <Box className="specify__item">
                  <img
                    style={{ width: "60px" }}
                    src={item.image}
                    alt={item.alt}
                  />
                  <span>{item.alt}</span>
                </Box>
              </Link>
            ))} */}
          </Box>
        </Box>

        <Box id="section8">
          <Box className="banner__wrap2">
            <img
              src="https://salt.tikicdn.com/cache/w400/ts/banner/83/25/b8/96442cbb3cccebd796916c8af5377ecd.png.webp"
              alt=""
            />
            <img
              src="https://salt.tikicdn.com/cache/w400/ts/banner/64/4f/4a/b58dfceb83bbba5a710772d5e9fd14e9.png.webp"
              alt=""
            />
            <img
              src="https://salt.tikicdn.com/cache/w400/ts/banner/d0/09/63/2ae37cd70c15bbf073bddedb1b5b42d9.png.webp"
              alt=""
            />
          </Box>
        </Box>

        <Box id="section9">
          <Grid container>
            {products.map((item) => (
              <Grid key={`product-${item.id}`} item lg={2} md={4} sm={6} xs={6}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
          <Stack direction="row" justifyContent="center" mt={2}>
            <Button
              sx={{ width: "12rem", height: "2.5rem" }}
              color="primary"
              variant="outlined"
              onClick={handleLoadMore}
            >
              {loadingShowMore && <Loading />}
              Xem thêm
            </Button>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
