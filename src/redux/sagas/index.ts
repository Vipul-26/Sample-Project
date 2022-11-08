import { all } from "redux-saga/effects";
import { waitForFetchPosts } from "./newsSaga";

export default function* rootSaga() {
    yield all([waitForFetchPosts()]);
}