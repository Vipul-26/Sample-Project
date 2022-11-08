import { takeEvery, call, put, select } from "redux-saga/effects";
import { setNews } from "../actions/index";

interface Members {
    members: {
        memberList: Member[],
        activeList: string[],
        userList: User[],
        newsList: NewsData,
        channelName: string;
    }
}

interface Member {
    name: string;
    company: string;
    status: string;
    lastupdated: string;
    note: string;
    id: number;
    index: number;
}

interface User {
    email: string;
    password: string;
    fname: string;
    lname: string;
    index: number;
}

interface NewsData {
    status: string;
    totalResults: number;
    articles: Article[];
}

interface Article {
    source: {
        id: string,
        name: string
    },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string,
}

const fetchPostsByChannelName = (channelName: string) => {
    return fetch(`https://newsapi.org/v1/articles?source=${channelName}&apiKey=c40d4dc492a8434a9b91a932f745989a`)
        .then(
            (response) => response.json(),
            (error) => console.log('An error occurred.', error),
        )
        .then((data) => data);
};

const selectAllState = (state: Members) => state;

function* fetchPosts() {
    try {
        const allState: Members = yield select(selectAllState);
        const posts: NewsData = yield call(fetchPostsByChannelName, allState.members.channelName);
        yield put(setNews(posts));
    } catch (e) {
        console.log(e);
    }
};

export function* waitForFetchPosts() {
    yield takeEvery("GET_NEWS", fetchPosts);
};