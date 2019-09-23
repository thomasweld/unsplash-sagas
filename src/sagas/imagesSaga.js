import { put, call, takeEvery, select } from 'redux-saga/effects';
 
import { setImages, setError } from '../actions';
import { IMAGES } from '../constants';
import { fetchImages } from '../api';

// selector function
const getPage = state => state.nextPage;

// worker saga
function* handleLoadImages() {
    try {
        const page = yield select(getPage);
        const images = yield call(fetchImages, page);
        yield put(setImages(images));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

// watcher saga
export default function* watchImagesLoad() {
    yield takeEvery(IMAGES.LOAD, handleLoadImages);
}
