import { useState, useEffect } from "react";
import { Box, Stack, Typography, Pagination, Grid } from "@mui/material";
import { useAppSelector } from "app/hooks";
import { selectWishList } from "features/wishList/wishListSlice";
import productApi from "api/productApi";
import { CardProduct } from "components/Common";
import { Product } from "models";

// import CardProduct from "../../components/CardProduct";

export interface IWishListProps {}

export default function WishList(props: IWishListProps) {
  //   const user = useSelector((state) => state.auth.user);

  const wishList = useAppSelector(selectWishList);

  const [myFavorites, setMyFavorites] = useState<any>([]);

  //get wish list
  useEffect(() => {
    const getMyFavorites = async () => {
      for (const item of wishList) {
        productApi.getBySlug(item.productSlug).then((res) => {
          setMyFavorites((prev: any) => [...prev, res]);
        });
      }
    };

    getMyFavorites();
  }, []);

  return (
    <Box>
      <Typography variant="h6">Danh sách yêu thích</Typography>

      <Grid container sx={{ backgroundColor: "white", padding: "1rem" }}>
        {myFavorites.map((item: Product) => {
          let data = {
            image: item.image,
            name: item.name,
            rate: item.rate,
            sold: item.sold,
            discount: item.discount,
            price: item.price,
            slug: item.slug,
          };
          return (
            <Grid key={item.id} item lg={2} md={4} sm={4} xs={4}>
              <CardProduct data={item} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
