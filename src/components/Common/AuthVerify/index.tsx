import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  authActions,
  selectAccessToken,
  selectUser,
} from "features/auth/authSlice";
import * as React from "react";

import jwt_decode from "jwt-decode";
import { TokenDecode } from "models";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export interface IAuthVerifyProps {}

export function AuthVerify(props: IAuthVerifyProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const accessToken = useAppSelector(selectAccessToken);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      const tokenDecode: TokenDecode = jwt_decode(accessToken);
      let date = new Date();

      if (tokenDecode.exp < date.getTime() / 1000) {
        toast.warning("Phiên làm việc của bạn đã hết. Vui lòng đăng nhập lại");
        dispatch(authActions.logout());
        navigate("/");
      }
    }
  }, [user]);

  return <div></div>;
}
