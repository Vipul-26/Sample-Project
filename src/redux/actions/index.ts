import {
    ADD_MEMBER,
    DELETE_MEMBER,
    UPDATE_MEMBER,
    ADD_ACTIVE_LIST,
    ADD_USER,
    GET_NEWS,
    SET_NEWS,
    SET_CHANNEL
} from '../action-types/constant';

interface Member {
    name: string;
    company: string;
    status: string;
    lastupdated: string;
    note: string;
    id: number;
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

export const addMember = (data: Member) => ({ type: ADD_MEMBER, data });

export const deleteMember = (key: number) => ({ type: DELETE_MEMBER, data: key });

export const updateMember = () => ({ type: UPDATE_MEMBER });

export const addActiveList = (data: string[]) => ({ type: ADD_ACTIVE_LIST, data });

export const addUser = (data: User) => ({ type: ADD_USER, data });

export const getNews = () => ({ type: GET_NEWS });

export const setNews = (data: NewsData) => ({ type: SET_NEWS, data });

export const setChannel = (data: string) => ({type: SET_CHANNEL, data});

