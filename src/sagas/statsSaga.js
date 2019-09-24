import { take, call, fork, put } from 'redux-saga/effects';
 
import { IMAGES } from '../constants';
import { fetchImageStats } from '../api';
import { loadImageStats, setImageStats, setErrorStats } from '../actions';

// worker saga
function* handleStatsRequest(id) {
    for (let i = 0; i < 3; i++){
        try {
            yield put(loadImageStats(id));
            const res = yield call(fetchImageStats, id);
            yield put(setImageStats(id, res.downloads.total))
            return true;
        } catch (error) {
            console.log(error)
        }
    }
    yield put(setErrorStats(id));
}

// watcher saga
export default function* watchStatsRequest() {
    while(true){
        const { images } = yield take(IMAGES.LOAD_SUCCESS);
        for (let i = 0; i < images.length; i++){
            yield fork(handleStatsRequest, images[i].id);
        }
    }
}
