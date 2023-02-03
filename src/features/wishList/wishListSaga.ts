import { AxiosResponse } from 'axios';
import { RootState } from './../../app/store';
import { selectUser } from 'features/auth/authSlice';
import { useAppSelector } from 'app/hooks';
import userApi from "api/userApi"
import { authActions } from 'features/auth/authSlice';
import { wishListActions } from './wishListSlice';
import { select, all, fork, take, call, put } from 'redux-saga/effects';
import { User, WishItem } from 'models';

function* fetchWishListData(){
    yield put(wishListActions.removeAll())
}

export default function* wishListSaga(){
    yield take(authActions.logout.type)
    yield fork(fetchWishListData)
}