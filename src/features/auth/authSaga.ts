import { addressListActions } from './../address/addressSlice';
import { wishListActions } from 'features/wishList/wishListSlice';
import { useSelector } from 'react-redux';
import { selectUser, authActions } from './authSlice';
import { useAppSelector } from './../../app/hooks';
import { call, delay, fork, put, take } from 'redux-saga/effects';


export default function* authSaga(){
    yield take(authActions.logout.type)
    yield put(wishListActions.removeAll())
    yield put(addressListActions.removeAll())
}