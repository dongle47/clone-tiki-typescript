import locationApi from "api/locationApi";
import { useAppSelector } from "app/hooks";
import { selectAccessToken, selectUser } from "features/auth/authSlice";
import React from "react";
import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";

import {
  Box,
  Typography,
  Stack,
  Button,
  InputBase,
  FormControl,
  Select,
  Input,
  InputLabel,
  MenuItem,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import addressApi from "api/addressApi";
import { Address, Location } from "models/address";

export interface ICreateAddressProps {
  edit: boolean;
}

export default function CreateAddress(props: ICreateAddressProps) {
  const user = useAppSelector(selectUser);
  const accessToken = useAppSelector(selectAccessToken);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [provinceCode, setProvinceCode] = React.useState("");
  const [districtCode, setDistrictCode] = React.useState("");
  const [wardCode, setWardCode] = React.useState("");

  const [listProvinces, setListProvinces] = useState<Location[]>([]);
  const [listDistricts, setListDistricts] = useState<Location[]>([]);
  const [listWards, setListWards] = useState<Location[]>([]);

  const navigate = useNavigate();

  const { addressId } = useParams();

  // get data province
  useEffect(() => {
    const getProvinces = async () => {
      await locationApi
        .getListProvinces()
        .then((res) => {
          setListProvinces(res);
        })
        .catch((err) => console.log(err));
    };
    getProvinces();
  }, []);

  //get data district
  useEffect(() => {
    const getDistricts = async () => {
      locationApi.getProvince(provinceCode).then((res) => {
        setListDistricts(res.districts);
      });
    };

    if (provinceCode) getDistricts();
  }, [provinceCode]);

  //get data ward
  useEffect(() => {
    const getWards = async () => {
      locationApi.getDistrict(districtCode).then((res) => {
        setListWards(res.wards);
      });
    };

    if (districtCode) getWards();
  }, [districtCode]);

  useEffect(() => {
    const loadDataUpdate = () => {
      if (props.edit && addressId) {
        addressApi.getAddressById(accessToken, addressId).then((res) => {
          const address = res;

          if (address) {
            setFullName(address.fullName);
            setPhone(address.phone);
            setAddressDetail(address.detail);
            setProvinceCode(address.province.code);
            setDistrictCode(address.district.code);
            setWardCode(address.ward.code);
          } else {
            navigate("/profile/address/create");
            toast.error("Địa chỉ này không tồn tại!");
          }
        });
      }
    };

    loadDataUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.edit]);

  const onChangeProvince = (e: any) => {
    setProvinceCode(e.target.value);
  };
  const onChangeDistrict = (e: any) => {
    setDistrictCode(e.target.value);
  };
  const onChangeWard = (e: any) => {
    setWardCode(e.target.value);
  };

  const handleCreate = () => {
    const params: any = {
      fullName: fullName,
      phone: phone,
      province: {
        code: provinceCode,
        name: listProvinces.find((item: any) => item.code === provinceCode)
          ?.name,
      },
      district: {
        code: districtCode,
        name: listDistricts.find((item: any) => item.code === districtCode)
          ?.name,
      },
      ward: {
        code: wardCode,
        name: listWards.find((item: any) => item.code === wardCode)?.name,
      },

      detail: addressDetail,
      userId: user?.id,
    };

    if (
      !(
        fullName &&
        phone &&
        provinceCode &&
        districtCode &&
        wardCode &&
        addressDetail
      )
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    } else {
      addressApi
        .postAddress(accessToken, params)
        .then((res) => {
          toast.success("Thêm địa chỉ thành công");
          setFullName("");
          setPhone("");
          setProvinceCode("");
          setDistrictCode("");
          setWardCode("");
          setAddressDetail("");
        })
        .catch((error) => {
          toast.error("Thêm địa chỉ thất bại!");
        });
    }
  };

  const handleUpdate = () => {
    const params: any = {
      id: addressId,
      fullName: fullName,
      phone: phone,
      province: {
        code: provinceCode,
        name: listProvinces.find((item) => item.code === provinceCode)?.name,
      },
      district: {
        code: districtCode,
        name: listDistricts.find((item) => item.code === districtCode)?.name,
      },
      ward: {
        code: wardCode,
        name: listWards.find((item) => item.code === wardCode)?.name,
      },
      detail: addressDetail,
    };
    if (
      !(
        addressDetail &&
        wardCode &&
        districtCode &&
        fullName &&
        phone &&
        provinceCode
      )
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    }
    addressApi
      .putAddress(accessToken, params)
      .then((res) => {
        toast.success("Cập nhật thành công");
      })
      .catch((error) => {
        toast.error("Cập nhật thất bại!");
        console.log("error", error);
      });
  };

  return (
    <Box className="create-address" p={2} m={2}>
      <Typography variant="h6">Tạo sổ địa chỉ</Typography>

      <Stack p="2rem" spacing={1.875} width="80%">
        <Stack direction="row">
          <Typography className="create-address__label">Họ và tên:</Typography>
          <Stack className="create-address__input">
            <InputCustom
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
              }}
              placeholder="Nhập họ và tên"
              size="small"
            ></InputCustom>
          </Stack>
        </Stack>

        <Stack direction="row">
          <Typography className="create-address__label">
            Số điện thoại:
          </Typography>
          <Stack className="create-address__input">
            <InputCustom
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              size="small"
              placeholder="Nhập số điện thoại"
            ></InputCustom>
          </Stack>
        </Stack>

        <>
          <Stack direction="row">
            <Typography className="create-address__label">
              Tỉnh/Thành phố:
            </Typography>
            <FormControl className="create-address__input" sx={{ flex: "1" }}>
              <Select
                value={provinceCode}
                onChange={onChangeProvince}
                input={<Input placeholder="Chọn Tỉnh/Thành phố" />}
              >
                {listProvinces.map((item) => (
                  <MenuItem value={item.code}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row">
            <Typography className="create-address__label">
              Quận huyện:
            </Typography>
            <FormControl className="create-address__input" sx={{ flex: "1" }}>
              <InputLabel id="demo-simple-select-helper-label"></InputLabel>
              <Select
                sx={{ flex: 0.65 }}
                value={districtCode}
                onChange={onChangeDistrict}
                input={<Input placeholder="Chọn Quận/Huyện" />}
              >
                {listDistricts.map((item) => (
                  <MenuItem value={item.code}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row">
            <Typography className="create-address__label">
              Phường xã:
            </Typography>
            <FormControl className="create-address__input" sx={{ flex: "1" }}>
              <Select
                value={wardCode}
                onChange={onChangeWard}
                input={<Input placeholder="Chọn Xã/Thị trấn" />}
              >
                {listWards.map((item) => (
                  <MenuItem value={item.code}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </>

        <Stack direction="row">
          <Typography className="create-address__label">Địa chỉ</Typography>
          <Stack className="create-address__input">
            <InputCustom
              value={addressDetail}
              onChange={(event) => {
                setAddressDetail(event.target.value);
              }}
              multiline
              rows={4}
              placeholder="Nhập địa chỉ"
            ></InputCustom>
          </Stack>
        </Stack>

        <Stack direction="row">
          <Typography className="create-address__label"></Typography>
          <Button
            onClick={props.edit ? handleUpdate : handleCreate}
            className="btn__Update"
            variant="contained"
          >
            Cập nhật
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

const InputCustom = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    boxSizing: "border-box",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    display: "flex",
    height: "40px !important",
    padding: "0px 26px 0px 12px",
    alignItems: "center",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#1890ff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));
