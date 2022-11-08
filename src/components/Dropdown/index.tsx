/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addActiveList } from "../../redux/actions";
import "./style.css";

interface DropdownProps {
    title: string;
    mapData: string[];
}

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

const Dropdown = (props: DropdownProps) => {

    const [isDropDown, setDropDown] = useState(false);

    const { activeList, memberList } = useSelector((state: Members) => state.members);

    const dispatch = useDispatch();

    const node = useRef() as React.MutableRefObject<HTMLDivElement>;

    const handleClick = (e: any) => {
        if (node.current.contains(e.target)) {
            setDropDown(true);
        }
        else {
            setDropDown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [isDropDown]);

    const handleCheckBox = (filter: string) => {
        if (filter === "All") {
            if (activeList.length === memberList.length) {
                dispatch(addActiveList([]));
            } else {
                dispatch(addActiveList(memberList.map(filter => filter.company)));
            }
        } else {
            if (activeList.includes(filter)) {
                const filterIndex = activeList.indexOf(filter);
                const newFilter = [...activeList];
                newFilter.splice(filterIndex, 1);
                dispatch(addActiveList(newFilter));
            } else {
                dispatch(addActiveList([...activeList, filter]))
            }
        }
    }

    return (
        <div className="dropdown-check-list" ref={node}>
            <span className={`anchor ${isDropDown ? 'dropdown-check-list-active' : ''}`} onClick={() => setDropDown(!isDropDown)}>
                {`${props.title} (${activeList.length})`}
            </span>
            {isDropDown &&
                <>
                    <ul className="items-first">
                        <li>
                            <input type="checkbox" onClick={() => handleCheckBox('All')} checked={activeList.length === memberList.length} />
                            Select all
                        </li>
                    </ul><ul className="items">
                        {props.mapData.map((data: string, index) => {
                            return (
                                <li key={index}>
                                    <input type="checkbox" onClick={() => handleCheckBox(data)} checked={activeList.includes(data)} />
                                    {data}
                                </li>
                            );
                        })}
                    </ul>
                </>
            }
        </div >
    );
};

export default Dropdown;