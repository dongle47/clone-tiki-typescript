import authSaga from 'features/auth/authSaga';
import wishListSaga from 'features/wishList/wishListSaga';
import {all} from 'redux-saga/effects';

export default function* rootSaga(){
    yield all([authSaga(), wishListSaga()])
}