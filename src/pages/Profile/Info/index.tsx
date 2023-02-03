import { useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./Info.scss";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import {
  Avatar,
  Typography,
  Stack,
  ListItemText,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
  Divider,
  Badge,
  ClickAwayListener,
  TextField,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  authActions,
  selectAccessToken,
  selectUser,
} from "features/auth/authSlice";
import userApi from "api/userApi";
import { Loading } from "components/Common";
import { User } from "models";

export interface IInfoProps {}

export default function Info(props: IInfoProps) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const accessToken = useAppSelector(selectAccessToken);

  const [fullName, setFullName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [sex, setSex] = useState(user?.sex);
  const [birthDay, setBirthDay] = useState(dayjs(user?.birthDay));

  const onChangeFullName = (event: any) => {
    setFullName(event.target.value);
  };

  const onChangeEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const onChangeSex = (event: any) => {
    setSex(event.target.value);
  };

  const onChangeBirthDay = (newValue: any) => {
    setBirthDay(newValue);
  };

  const [updating, setUpdating] = useState(false);

  const onSubmitUpdate = () => {
    const params: Partial<User> = {
      mobile: user?.mobile,
      fullName: fullName,
      birthDay: birthDay.format("YYYY-MM-DD"),
      sex: sex,
      email: email,
    };

    setUpdating(true);

    userApi
      .putUpdateInfo(accessToken, params)
      .then((res) => {
        toast.success("Thay đổi thành công");
        // getUser();
        if (user) {
          let newUser: User = {
            id: user.id,
            mobile: user.mobile,
            password: user.password,
            avatar: user.avatar,
            fullName: fullName,
            birthDay: params.birthDay,
            sex: params.sex,
            email: params.email,
          };

          let updateUser = {
            accessToken: accessToken,
            user: newUser,
          };

          // console.log(updateUser);
          dispatch(authActions.loginSuccess(updateUser));
        }
      })
      .catch((err) => {
        toast.error("Thay đổi không thành công");
      })
      .finally(() => setUpdating(false));
  };

  return (
    <Stack className="customer-info" spacing={3}>
      <Typography variant="h6">Thông tin tài khoản</Typography>
      <Stack direction="row" spacing={3}>
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <ClickAwayListener onClickAway={() => {}}>
              <Box sx={{ position: "relative" }} onClick={() => {}}>
                <Badge
                  badgeContent={
                    <EditRoundedIcon
                      sx={{ color: "white", fontSize: "1rem" }}
                    />
                  }
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  color="primary"
                >
                  <Avatar
                    sx={{
                      width: 110,
                      height: 110,
                      border: "3px solid aquamarine",
                    }}
                    src={user?.avatar}
                  />
                </Badge>
              </Box>
            </ClickAwayListener>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="start">
            <label>Họ & tên</label>
            <input
              id="input-name"
              placeholder="Thêm họ tên"
              type="text"
              value={fullName}
              onChange={onChangeFullName}
            />
          </Stack>

          <Stack direction="row" spacing={9} alignItems="center">
            <label>Ngày sinh</label>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                inputFormat="DD/MM/YYYY"
                value={birthDay}
                onChange={onChangeBirthDay}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>

          <Stack direction="row" spacing={5} alignItems="center">
            <label>Giới tính</label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={sex}
              onChange={onChangeSex}
            >
              <FormControlLabel value="male" control={<Radio />} label="Nam" />
              <FormControlLabel value="female" control={<Radio />} label="Nữ" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Khác"
              />
            </RadioGroup>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="start">
            <label>Email</label>
            <input
              id="input-name"
              placeholder="Nhập email"
              type="text"
              value={email}
              onChange={onChangeEmail}
            />
          </Stack>

          <Button
            variant="contained"
            sx={{ width: 200, alignSelf: "center" }}
            onClick={onSubmitUpdate}
          >
            {updating && <Loading color="#fff" />}Lưu thay đổi
          </Button>
        </Stack>

        <Divider orientation="vertical" flexItem />

        <Stack spacing={4}>
          <Typography>Bảo mật</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1}>
              <LockIcon color="disabled" />
              <ListItemText primary="Đổi mật khẩu" />
            </Stack>

            <Link to="/customer/account/edit/pass">
              <Button size="small" variant="outlined">
                Đổi mật khẩu
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
