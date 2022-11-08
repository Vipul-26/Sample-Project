/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../../components/Dropdown';
import Modal from '../../components/Modal';
import NewsList from '../../components/NewsList';
import Table from '../../components/Table';
import { addMember, getNews, setChannel } from '../../redux/actions';
import './style.css';

const Home = () => {

    const [isOpen, setOpen] = useState(false);
    const [isNewsOpen, setNewsOpen] = useState(false);
    const [isStatus, setIsStatus] = useState(false);
    const [isError, setError] = useState(false);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('');
    const [note, setNote] = useState('');

    const { memberList } = useSelector((state: Members) => state.members);

    const dispatch = useDispatch();

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

    const companyList = memberList.map((member) => {
        return member.company
    });

    const handleClose = () => {
        setOpen(!isOpen);
        setError(false);
    };

    const handleMember = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name !== '' && company !== '' && status !== '' && note !== '') {
            const memberData = {
                name: name,
                company: company,
                status: status,
                lastupdated: new Date().toJSON().slice(0, 10).split('-').reverse().join('/'),
                note: note,
                id: Math.random(),
                index: memberList.length + 1
            };
            dispatch(addMember(memberData));
            handleClose();
        } else {
            setError(true);
        }
    };

    const handleStatus = (e: any) => {
        e.preventDefault();
        setIsStatus(!isStatus);
    };

    const handleBtnClick = () => {
        dispatch(getNews());
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        if (e.target.value) {
            setNewsOpen(true);
            dispatch(setChannel(e.target.value));
        }
    }

    return (
        <div className='main-div'>
            <div className='team-div'>
                <p>
                    Team Members
                </p>
                <button onClick={handleClose} type="button" className='secondary-btn'>
                    Add Members +
                </button>
            </div>
            {companyList.length > 0 &&
                <div className='dropdown'>
                    <Dropdown title='Company' mapData={Array.from(new Set(companyList))} />
                </div>
            }
            <Table />
            {isOpen &&
                <Modal isOpen={isOpen} onCloseModal={handleClose}>
                    <h4>
                        Add Members
                    </h4>
                    <form onSubmit={handleMember}>
                        <label htmlFor="name">
                            Name
                        </label><br />
                        <input type="text" name='name' onChange={(e) => { setName(e.target.value) }} value={name} id="name" /><br />
                        <label htmlFor="company">
                            Company
                        </label><br />
                        <input type="text" name='company' onChange={(e) => { setCompany(e.target.value) }} value={company} id="company" /><br />
                        <label>
                            Status
                        </label><br />
                        <div className='status-div'>
                            <button onClick={handleStatus} className={isStatus ? 'btn-open' : ''}>
                                {status}
                            </button>
                            {isStatus &&
                                <div className='status-open-div'>
                                    <div onClick={(e) => { setStatus('Active'); setIsStatus(false) }} >
                                        Active
                                    </div>
                                    <div onClick={(e) => { setStatus('Closed'); setIsStatus(false) }}>
                                        Closed
                                    </div>
                                </div>
                            }
                        </div>
                        <label htmlFor="note">
                            Note
                        </label><br />
                        <input type="text" name='note' onChange={(e) => { setNote(e.target.value) }} value={note} id="note" /><br />
                        {isError &&
                            <span className='error'>
                                Please provide all datas
                            </span>
                        }
                        <div className='btn-div'>
                            <button type="button" className='primary-btn' onClick={handleClose}>
                                Cancel
                            </button>
                            <input type="submit" value="Save" className='primary-btn' />
                        </div>
                    </form>
                </Modal>
            }
            <div className="select">
                <select onChange={handleSelect}>
                    <option disabled selected>
                        Select Channel
                    </option>
                    <option value="bbc-news">
                        BBC
                    </option>
                    <option value="cnn">
                        CNN
                    </option>
                    <option value="financial-times">
                        FT
                    </option>
                    <option value="espn">
                        ESPN
                    </option>
                    <option value="time">
                        TIME
                    </option>
                </select>
            </div>
            {isNewsOpen &&
                <button onClick={handleBtnClick} className='secondary-btn my-btn'>
                    Get News
                </button>
            }
            <NewsList />
        </div>
    );
}

export default Home;
