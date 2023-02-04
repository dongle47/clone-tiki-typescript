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
import { useAppSelector } from "app/hooks";
import { selectAccessToken, selectUser } from "features/auth/authSlice";
import orderApi from "api/orderApi";
import reviewsApi from "api/reviewApi";
import EmptyNotify from "components/Common/EmptyNotify";

export interface IReviewPurchasedProps {}

export default function ReviewPurchased(props: IReviewPurchasedProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const [chosenProduct, setChosenProduct] = useState<any>();

  const [myRevPurchaseds, setMyRevPurchaseds] = useState<any>([]);

  const [totalPage, setTotalPage] = useState(10);

  const [reviewedItems, setReviewedItems] = useState<any>([]);

  const [page, setPage] = useState(1);

  const size = 8;

  const user = useAppSelector(selectUser);

  const accessToken = useAppSelector(selectAccessToken);

  useEffect(() => {
    const getMyRevPurchaseds = async () => {
      if (user) {
        await orderApi.getOrders(accessToken, user.id).then((res) => {
          const resProduct = res.map((item: any) => item.products);
          setMyRevPurchaseds(resProduct.flat());
        });
      }
    };
    getMyRevPurchaseds();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const checkReviewed = async () => {
      await reviewsApi.findReviews({ userId: user?.id }).then((res) => {
        const reviewedId = res.map((item: any) => item.productId);
        setReviewedItems(reviewedId);
      });
    };
    checkReviewed();
  }, []);

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const handleChangeContent = (event: any) => {
    setContent(event.target.value);
  };

  const handleChangeRating = (event: any, value: any) => {
    setRating(value);
  };

  const handleClickOpen = (product: any) => {
    setChosenProduct(product);
    setOpen(true);
  };

  const handleClickReviewBtn = (item: any) => {
    if (reviewedItems.includes(item.id)) {
    } else {
      handleClickOpen(item);
    }
  };

  const handleSaveCmt = () => {
    if (!(rating > 0 || content)) {
      toast.warning("Vui lòng đánh giá sản phẩm !!");
      return;
    }

    const params = {
      userId: user?.id,
      productId: chosenProduct?.id,
      rating: rating,
      productName: chosenProduct?.name || "",
      productImage: chosenProduct.image,
      content: content,
      userName: user?.fullName,
      userAvatar: user?.avatar,
    };

    reviewsApi
      .postReview(params)
      .then((res) => {
        toast.success("Đã đánh giá");
        let index = myRevPurchaseds.findIndex(
          (item: any) => item.id === chosenProduct.id
          // && item.orderId === chosenProduct.orderId
        );

        if (index >= 0) {
          let newMyRev: any = [...myRevPurchaseds];
          newMyRev[index].isReviewed = true;
          setMyRevPurchaseds(newMyRev);
        }
        handleClose();
      })
      .catch((error) => {
        toast.error("Đánh giá thất bại!");
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "50rem",
      }}
    >
      <Typography gutterBottom variant="h6">
        Nhận xét sản phẩm đã mua
      </Typography>
      <Stack
        sx={{ padding: "1rem", backgroundColor: "#fff" }}
        direction="row"
        spacing={2}
      >
        <Grid container rowSpacing={1} columns={{ xs: 8, md: 12 }}>
          {/* <Stack sx={{ padding: "1rem", backgroundColor: "white" }} direction="row" spacing={2} > */}
          {myRevPurchaseds.length === 0 ? (
            <EmptyNotify title="Bạn chưa mua sản phẩm" />
          ) : (
            myRevPurchaseds
              .slice((page - 1) * size, page * size)
              .map((item: any, i: any) => (
                <Grid key={i} item xs={3}>
                  <Card sx={{ border: "0px solid black", maxWidth: "13rem" }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      height="200"
                    />

                    <CardContent sx={{ padding: "5px 0 0 0" }}>
                      <Link to={`/product/${item.slug}`}>
                        <Typography
                          className="reviewpurchased__name"
                          variant="caption"
                          color="text.secondary"
                        >
                          {item.name}
                        </Typography>
                      </Link>
                    </CardContent>

                    <CardActions>
                      <Button
                        sx={{ width: "100%" }}
                        variant="contained"
                        color={
                          reviewedItems.includes(item.id)
                            ? "warning"
                            : "primary"
                        }
                        onClick={() => handleClickReviewBtn(item)}
                      >
                        {reviewedItems.includes(item.id)
                          ? "Đã nhận xét"
                          : "Viết nhận xét"}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
          )}
          {/* </Stack> */}
        </Grid>
      </Stack>

      <Box>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            // id="customized-dialog-title"
            onClose={handleClose}
          >
            Đánh giá sản phẩm
          </BootstrapDialogTitle>
          <DialogContent sx={{ width: "100%" }} dividers>
            <Stack sx={{}} spacing={3}>
              <Stack
                sx={{ width: "35rem", border: "1px solid #c2c2c2" }}
                direction="row"
                spacing={3}
              >
                <Box
                  sx={{ height: 100, width: 100 }}
                  component="img"
                  alt=""
                  src={chosenProduct?.image}
                />

                <Stack>
                  <Typography sx={{ fontWeight: 600 }} variant="subtitle1">
                    {chosenProduct?.name}
                  </Typography>
                  {/* <Typography variant="subtitle2">Phân loại</Typography> */}
                </Stack>
              </Stack>
              <Stack
                sx={{ height: "9rem", width: "100%" }}
                alignItems="center"
                spacing={3}
              >
                <Rating
                  onChange={handleChangeRating}
                  sx={{}}
                  name="size-large"
                  defaultValue={5}
                  value={rating}
                  size="large"
                />

                <TextareaAutosize
                  onChange={handleChangeContent}
                  minRows={6}
                  maxRows={10}
                  aria-label="maximum height"
                  placeholder="Nhập bình luận"
                  style={{
                    width: "100%",
                    border: "1px solid #c2c2c2",
                    fontSize: "20px",
                    padding: "12px",
                  }}
                />
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Trở lại
            </Button>

            <Button variant="contained" onClick={handleSaveCmt}>
              Hoàn thành
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </Box>

      {totalPage > 1 ? (
        <Stack spacing={2}>
          <Pagination count={totalPage} page={page} onChange={handleChange} />
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props: any) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
