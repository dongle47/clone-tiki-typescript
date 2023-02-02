import { useAppSelector } from "app/hooks";
import { selectUser } from "features/auth/authSlice";
import { useEffect, useState } from "react";

import { Typography, Button, Stack, Box, Dialog } from "@mui/material";
import { Link } from "react-router-dom";
import EmptyNotify from "components/Common/EmptyNotify";
import AddIcon from "@mui/icons-material/Add";

export interface IAddressProps {}

export default function Address(props: IAddressProps) {
  const user = useAppSelector(selectUser);

  const [itemDelete, setItemDelete] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [dialogDelete, setDialogDelete] = useState(false);

  //get addresses
  useEffect(() => {
    const getData = async () => {
      //   await apiAddress
      //     .getAddressByUser(user.accessToken, user.id)
      //     .then((res) => {
      //       setAddresses(res);
      //     })
      //     .catch((err) => console.log("error", err));
    };
    getData();
  }, [addresses]);

  const handleDelete = () => {
    // const newAddress = addresses.filter(
    //   (item: any) => item.id !== itemDelete.id
    // );
    // closeDialogDeleteAll();
    // apiAddress
    //   .deleteAddress(user.accessToken, itemDelete._id)
    //   .then((res) => {
    //     setAddresses(newAddress);
    //     toast.success("Xóa thành công");
    //   })
    //   .catch((error) => {
    //     toast.error("Xóa không thành công!");
    //   });
  };

  const openDialogDeleteAll = (itemDelete: any) => {
    setItemDelete(itemDelete);
    setDialogDelete(true);
  };
  const closeDialogDeleteAll = () => {
    setDialogDelete(false);
  };

  return (
    <Stack spacing={2} className="addresses">
      <Typography className="heading">Sổ địa chỉ</Typography>
      <Link to="/customer/address/create">
        <Button className="new" variant="outlined" startIcon={<AddIcon />}>
          Thêm địa chỉ mới
        </Button>
      </Link>
      <Stack spacing={5}>
        {addresses.length === 0 ? (
          <EmptyNotify title="Bạn chưa có địa chỉ" />
        ) : (
          addresses.map((item: any) => {
            return (
              <Stack
                key={item._id}
                direction="row"
                width="100%"
                className="items"
              >
                <Stack className="info">
                  <Typography className="name">{item.fullName}</Typography>
                  <Typography className="address">
                    Địa chỉ:{" "}
                    {`${item.detail}, ${item.ward.name}, ${item.district.name}, ${item.province.name}`}
                  </Typography>
                  <Typography className="number">
                    Điện thoại: {item.phone}
                  </Typography>
                </Stack>

                <Stack direction="row" className="action">
                  <Link to={`edit/${item._id}`}>
                    <Button className="Modify" variant="text">
                      Chỉnh sửa
                    </Button>
                  </Link>
                  <Button
                    className="Delete"
                    variant="text"
                    onClick={() => openDialogDeleteAll(item)}
                  >
                    Xóa
                  </Button>
                </Stack>
                {dialogDelete && (
                  <Dialog onClose={closeDialogDeleteAll} open={dialogDelete}>
                    <Box className="dialog-removecart">
                      <Box className="dialog-removecart__title">
                        <h4>Xoá địa chỉ</h4>
                      </Box>
                      <Box className="dialog-removecart__content">
                        Bạn có muốn xóa địa chỉ
                      </Box>
                      <Box className="dialog-removecart__choose">
                        <Button
                          variant="outlined"
                          onClick={handleDelete}
                          sx={{ width: "120px", height: "36px" }}
                        >
                          Xác nhận
                        </Button>
                        <Button
                          variant="contained"
                          onClick={closeDialogDeleteAll}
                          sx={{ width: "57px", height: "36px" }}
                        >
                          Huỷ
                        </Button>
                      </Box>
                    </Box>
                  </Dialog>
                )}
              </Stack>
            );
          })
        )}
      </Stack>
    </Stack>
  );
}
