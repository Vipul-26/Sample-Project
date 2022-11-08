/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from 'react-redux';
import "./style.css";

interface Members {
    members: {
        memberList: Member[],
        activeList: string[],
        statusData: string,
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

const NewsList = () => {

    const { newsList } = useSelector((state: Members) => state.members);

    if (newsList && newsList.articles && newsList.articles.length > 0) {
        return (
            <div className="row">
                {newsList.articles.map((article, index) => {
                    return (
                        <article key={index}>
                            <div className="article-wrapper">
                                <h3 className="text-center">
                                    {article.title}
                                </h3>
                                <img src={article.urlToImage} alt="article" />
                                <p className="text-center">
                                    {article.description}
                                </p>
                                <a href={article.url} target="_blank" rel="noreferrer">
                                    Read more
                                </a>
                            </div>
                        </article>
                    );
                })}
            </div>
        );
    };
    return null;
};

export default NewsList;