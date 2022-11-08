import React, { useState } from "react";
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/actions';

const Signup = () => {

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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');

    const { userList } = useSelector((state: Members) => state.members);

    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email !== '' && password !== '' && fname !== '' && lname !== '') {
            const userData = {
                email: email,
                password: password,
                fname: fname,
                lname: lname,
                index: userList.length + 1
            };
            dispatch(addUser(userData));
            window.location.assign('/login');
        }
    };

    return (
        <div>
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container">
                        <h2>
                            Signup Form
                        </h2>
                    </div>
                    <div className="row clearfix">
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="input_field"> <span><i className="fa fa-envelope"></i></span>
                                    <input type="text" value={email} name="email" placeholder="Email" required onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div className="input_field"> <span className="pass_span"><i className="fa fa-lock"></i></span>
                                    <input type="password" value={password} name="password" placeholder="Password" required onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                                <div className="input_field"> <span><i className="fa fa-user"></i></span>
                                    <input type="text" value={fname} name="name" placeholder="First Name" onChange={(e) => { setFname(e.target.value) }} />
                                </div>
                                <div className="input_field"> <span><i className="fa fa-user"></i></span>
                                    <input type="text" value={lname} name="name" placeholder="Last Name" required onChange={(e) => { setLname(e.target.value) }} />
                                </div>
                                <input className="button" type="submit" value="Register" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;