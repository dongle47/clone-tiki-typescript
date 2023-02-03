import { addressListActions } from './../address/addressSlice';
import { wishListActions } from 'features/wishList/wishListSlice';
import { useSelector } from 'react-redux';
import { selectUser, authActions } from './authSlice';
import { useAppSelector } from './../../app/hooks';
import { call, delay, fork, put, take } from 'redux-saga/effects';


function* handle(){
    yield take(authActions.logout.type)
    yield put(wishListActions.removeAll())
    yield put(addressListActions.removeAll())
}

export default function* authSaga(){
    yield fork(handle)
}