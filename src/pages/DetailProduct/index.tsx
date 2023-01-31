import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import imgDefault from "../../assets/img/img_default.jpg";
// import ReviewProduct from "./ReviewProduct";

import {
  Rating,
  Button,
  Box,
  Stack,
  Modal,
  IconButton,
  Tooltip,
  Skeleton,
} from "@mui/material";

import "./DetailProduct.scss";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import productApi from "../../api/productApi";
// import { addItem } from "../../slices/cartSlice";

import { numWithCommas, roundPrice } from "../../constraints/Util";

import { toast } from "react-toastify";
import { Product } from "models";

import SliderImage from "./SliderImage";

// import apiUser from "../../apis/apiUser";

export interface IDetailProductProps {}

export default function DetailProduct(props: IDetailProductProps) {
  //   const user = useSelector((state) => state.auth.user);

  const [wishList, setWishList] = useState([]);

  const [product, setProduct] = useState<Product | null>(null);

  const { slug } = useParams();

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      if (slug) {
        await productApi
          .getBySlug(slug)
          .then((res) => {
            setProduct(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    getProduct();
  }, [slug]);

  console.log(product);

  //   useEffect(() => {
  //     const checkFavorite = async () => {
  //       await apiUser
  //         .getWishListByUser(user.id)
  //         .then((res) => {
  //           setWishList(res);

  //           const resSlug = res.map((item) => item.productSlug);
  //           if (resSlug.includes(slug)) {
  //             setIsFavorite(true);
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     };

  //     checkFavorite();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const handleClickFavorite = async () => {
    // if (user === null) {
    //   toast.warning("Vui lòng đăng nhập để thực hiện chức năng này");
    // } else {
    //   let param = {
    //     userId: user.id,
    //     productSlug: slug,
    //   };
    //   if (isFavorite === false) {
    //     await apiUser
    //       .postWishList(param)
    //       .then((res) => {
    //         setIsFavorite((prev) => !prev);
    //         toast.success("Đã thêm vào danh sách yêu thích");
    //       })
    //       .catch((err) => toast.error(err));
    //   } else {
    //     const itemId = wishList.find((item) => item.productSlug === slug)._id;
    //     await apiUser
    //       .deleteWishList(itemId)
    //       .then((res) => {
    //         toast.info("Đã xóa khỏi danh sách yêu thích");
    //         setIsFavorite(false);
    //       })
    //       .catch((err) => console.log(err));
    //   }
    // }
  };

  const [expandContent, setExpandContent] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const descriptionRef = useRef(null);

  const [modalSlider, setModelSlider] = useState(false);

  const [loading, setLoading] = React.useState(true);
  const [choose, setChoose] = useState<any>({});
  const [indexImg, setIndexImg] = useState(0);
  const dispatch = useDispatch();

  const openModalSlider = () => setModelSlider(true);

  const closeModalSlider = () => {
    setModelSlider(false);
  };

  const handleClickBuy = () => {
    // dispatch(
    //   addItem({
    //     choose: false,
    //     id: product.id,
    //     name: product.name,
    //     slug: product.slug,
    //     image: product.image,
    //     price: product.price,
    //     quantity,
    //   })
    // );
    // toast.success("Đã thêm vào giỏ hàng");
  };

  const onChangeQuantity = (e: any) => {
    setQuantity(e.target.value);
    if (e.target.value === "") return;
    let quantity = Number(e.target.value);
    if (Number.isInteger(quantity)) {
      setQuantity(quantity);
    } else {
      setQuantity(1);
    }
  };

  const handleExpandContent = () => {
    setExpandContent((pre) => !pre);
  };

  const onChangeOption = (optionId: string, itemId: string) => {
    let optionSelect = product?.details.options.find(
      (item: Product) => item.id === optionId
    );
    let newChoose = { ...choose };
    newChoose[optionSelect.name] = itemId;
    setChoose(newChoose);
  };

  const onChangeimg = (index: number) => {
    setIndexImg(index);
  };

  // useEffect(() => {
  //   //xử lý hiển thị nội dung mô tả sản phẩm
  //   descriptionRef.current?.innerHTML = product?.details?.description || "";
  //   document.title =
  //     product?.name ||
  //     "Tiki - Mua hàng online, giá tốt, hàng chuẩn, ship nhanh";

  //   if (product) {
  //     let newChoose = {};
  //     product.details.options.forEach((item: any) => {
  //       newChoose[item.name] = item.values[0].id;
  //     });
  //     setChoose(newChoose);
  //   }
  // }, [product]);

  return (
    <>
      <Box className="container">
        <Box className="detailProduct">
          <Box className="detailProduct__img">
            <Box
              className="detailProduct__primary-img"
              onClick={openModalSlider}
            >
              {loading && (
                <Skeleton variant="rectangular" width="100%" height="100%" />
              )}
              <img
                onLoad={() => setLoading(false)}
                src={product?.details.images[indexImg]}
                alt=""
                onError={(err: any) => (err.target.src = imgDefault)}
              />
            </Box>{" "}
            <Stack
              direction="row"
              justifyContent="flex-start"
              mt={3}
              spacing={1}
            >
              {product?.details?.images ? (
                <>
                  {product.details.images.slice(0, 6).map((imgs, index) => (
                    <>
                      {index < 5 ? (
                        <Box
                          onClick={() => onChangeimg(index)}
                          className={`detailProduct__item-img ${
                            indexImg === index ? "selected" : ""
                          }`}
                        >
                          <img
                            src={imgs}
                            alt=""
                            onError={(err: any) =>
                              (err.target.src = imgDefault)
                            }
                          />
                        </Box>
                      ) : (
                        <Box
                          className={`detailProduct__item-img ${
                            indexImg === index ? "selected" : ""
                          }`}
                        >
                          {product.details.images.length > 6 && (
                            <Box
                              onClick={openModalSlider}
                              className="lastimage"
                            >
                              +{product.details.images.length - 6}
                            </Box>
                          )}

                          <img src={imgs} alt="" />
                        </Box>
                      )}
                    </>
                  ))}
                </>
              ) : (
                <>
                  <Skeleton animation="wave" width="100%" />
                </>
              )}{" "}
            </Stack>
          </Box>

          <Box flex={1}>
            <Box className="detailProduct__title">
              {product?.name ? (
                <h2>{product.name}</h2>
              ) : (
                <>
                  <Skeleton animation="wave" height={40} />
                  <Skeleton animation="wave" height={40} />
                </>
              )}
            </Box>
            <Box className="detailProduct__rating">
              {product?.sold ? (
                <>
                  <Rating
                    name="simple-controlled"
                    value={product.rate || 0}
                    readOnly
                    sx={{ fontSize: "18px" }}
                  />
                  <span>Xem 19 đánh giá | Đã bán {product?.sold} </span>
                </>
              ) : (
                <Skeleton animation="wave" height={40} width="100%" />
              )}
            </Box>

            <Box className="detailProduct__price">
              {product?.price ? (
                <>
                  <span>{numWithCommas(roundPrice(product?.price || 0))}₫</span>
                  {/* <span>{numWithCommas(product?.price || 0)} ₫</span> */}
                  {/* <span className="detailProduct__discount">
                {product?.discount}%
              </span> */}
                </>
              ) : (
                <Skeleton animation="wave" height={40} width="100%" />
              )}
            </Box>
            {product?.details.options.map((itemOpt: any) => {
              let select = itemOpt.values.find(
                (item: any) => choose[itemOpt.name] === item.id
              );
              return (
                <Box className="product-option">
                  <Box className="product-option__title">
                    {itemOpt.name} : <span>{select && select.name}</span>
                  </Box>
                  <Box className="product-option__list">
                    {itemOpt.values.map((item: any) => {
                      let selected = choose[itemOpt.name] === item.id;
                      return (
                        <Box
                          key={item.id}
                          onClick={() => onChangeOption(itemOpt.id, item.id)}
                          className={`product-option__item ${
                            itemOpt.name === "Màu sắc"
                              ? "product-option__item--color"
                              : "product-option__item--size"
                          } ${selected ? "selected" : ""}`}
                        >
                          {item.value}
                          <span>
                            <CheckIcon
                              sx={{ fontSize: "12px", color: "#fff" }}
                            />
                          </span>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              );
            })}

            <Box className="product-quanlity">
              <Box className="product-quanlity__title">Số lượng</Box>
              <Box className="product-quanlity__groupInput">
                <button
                  onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}
                >
                  <RemoveIcon />
                </button>
                <input
                  onChange={onChangeQuantity}
                  type="text"
                  value={quantity}
                />
                <button onClick={() => setQuantity(quantity + 1)}>
                  <AddIcon />
                </button>
              </Box>
            </Box>

            <Stack
              sx={{ marginTop: "2rem" }}
              direction="row"
              alignItems="center"
              spacing={3}
            >
              <Box>
                <Button
                  variant="contained"
                  onClick={handleClickBuy}
                  sx={{
                    width: "400px",
                    height: "48px",
                    backgroundColor: "#ff3945",
                    "&:hover": { opacity: 0.8, backgroundColor: "#ff3945" },
                  }}
                >
                  Chọn mua
                </Button>
              </Box>

              <IconButton
                sx={{ border: "1px solid silver" }}
                color="error"
                size="large"
                onClick={handleClickFavorite}
              >
                {isFavorite ? (
                  <Tooltip title="Xóa khỏi danh sách yêu thích">
                    <FavoriteIcon />
                  </Tooltip>
                ) : (
                  <Tooltip title="Thêm vào danh sách yêu thích">
                    <FavoriteBorderIcon />
                  </Tooltip>
                )}
              </IconButton>
            </Stack>
          </Box>
        </Box>

        <Box
          className="productSpecification"
          bgcolor="white"
          p={2}
          borderRadius="4px"
          mb={1}
        >
          <Box className="productSpecification__title">Thông Tin Chi Tiết</Box>
          <Box className="productSpecification__table">
            <table>
              <tbody>
                {product?.details.specifications.map((spec: any) => (
                  <tr>
                    <td>{spec.name}</td>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>

        <Box
          className="descriptionProduct"
          bgcolor="white"
          p={2}
          borderRadius="4px"
        >
          <Box className="productSpecification__title">Mô Tả Sản phẩm</Box>

          {/* <Box>{product?.details.description}</Box> */}

          <div
            className="descriptionProduct__content"
            dangerouslySetInnerHTML={{ __html: product?.details.description }}
          />
          {/* <Box
            className={`descriptionProduct__content ${
              expandContent ? "" : "collapse"
            }`}
          >
            <Box p={2} ref={descriptionRef} width="100%"></Box>
            {expandContent ? "" : <Box className="bg-gradient"></Box>}
          </Box>
          <Box className="descriptionProduct__showmore">
            <Button onClick={handleExpandContent} variant="outlined">
              {expandContent ? "Thu gọn nội dung" : "Xem thêm"}
            </Button>
          </Box> */}
        </Box>
      </Box>

      {/* Modal slider image */}
      <Modal open={modalSlider} onClose={closeModalSlider}>
        <Box className="modal-images" sx={{ width: "100%" }}>
          <SliderImage
            images={product?.details.images}
            onClose={closeModalSlider}
          ></SliderImage>
        </Box>
      </Modal>

      {/* <ReviewProduct product={product} /> */}
    </>
  );
}
