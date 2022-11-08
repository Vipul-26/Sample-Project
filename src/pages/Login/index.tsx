/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import './style.css';

const Login = () => {

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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const { userList } = useSelector((state: Members) => state.members);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email !== '' && password !== '') {
            const loginUserData = {
                email: email,
                password: password,
            };
            const newArray = userList.map(({ email, password }) => ({ email, password }));
            for (let i = 0; i < newArray.length; i++) {
                if (JSON.stringify(newArray[i]) === JSON.stringify(loginUserData)) {
                    setError(false);
                    window.location.assign('/');
                }
            }
            setError(true);
        }
    };

    return (
        <div>
            <div className="center">
                <h1>
                    Member Login
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="txt_field">
                        <input type="text" required onChange={(e) => { setEmail(e.target.value) }} />
                        <span></span>
                        <label>
                            Email
                        </label>
                    </div>
                    <div className="txt_field pwd_field">
                        <input type="password" required onChange={(e) => { setPassword(e.target.value) }} />
                        <span></span>
                        <label>
                            Password
                        </label>
                    </div>
                    <div className="pass">
                        Forgot Password?
                    </div>
                    <input type="submit" value="Login" />
                    {error && <span className="error-cred">Wrong Credentials!</span>}
                    <div className="singup_link">
                        Not a member? <a href="/signup">Signup</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;