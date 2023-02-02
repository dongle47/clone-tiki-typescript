import { useSelector } from 'react-redux';
import { selectUser } from './authSlice';
import { useAppSelector } from './../../app/hooks';
import { call, delay, fork, put, take } from 'redux-saga/effects';


function* watchLoginFlow(){
    console.log('login flow')
}

export default function* authSaga(){
    yield fork(watchLoginFlow)
}