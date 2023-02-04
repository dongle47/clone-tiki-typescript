/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import "./ReviewList.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import StoreIcon from "@mui/icons-material/Store";
import reviewsApi from "api/reviewApi";
import { useAppSelector } from "app/hooks";
import { selectUser } from "features/auth/authSlice";
import EmptyNotify from "components/Common/EmptyNotify";

export interface IReviewListProps {}

export default function ReviewList(props: IReviewListProps) {
  const [myReviews, setMyReviews] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const size = 5;

  const user = useAppSelector(selectUser);

  useEffect(() => {
    const getMyReviews = async () => {
      await reviewsApi
        .findReviews({ userId: user?.id })
        .then((res) => {
          setMyReviews(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getMyReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ margin: "20px 0px 15px" }}>
        Nhận xét của tôi
      </Typography>
      <Stack flex="1" sx={{ backgroundColor: "#fff", borderRadius: "10px" }}>
        {myReviews.length === 0 ? (
          <EmptyNotify title="Viết nhận xét với sản phẩm bạn đã sử dụng để cung cấp thông tin hữu ích cho mọi người" />
        ) : (
          myReviews.map((item: any) => (
            <Stack direction="row" spacing={2} bgcolor="#ffff" p={2}>
              <Stack spacing={2} mb={1} direction="row">
                <Stack
                  className="myreview__avt"
                  sx={{
                    backgroundImage: `url(${item.productImage})`,
                  }}
                ></Stack>
                <Stack>
                  <Typography
                    sx={{ fontSize: "14px", marginBottom: "6px" }}
                    width="240px"
                  >
                    {item.productName}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <StoreIcon sx={{ fontSize: "17px", color: "#808089" }} />
                    <Typography sx={{ fontSize: "13px", color: "#808089" }}>
                      Tiki
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Rating readOnly value={item.rating} />
                </Stack>

                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "400",
                    lineHeight: "20px",
                  }}
                >
                  {item.content}
                </Typography>
              </Stack>
            </Stack>
          ))
        )}
      </Stack>

      {totalPage > 1 ? (
        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
          <Pagination count={totalPage} page={page} onChange={handleChange} />
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  );
}
