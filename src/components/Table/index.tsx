import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { deleteMember, updateMember } from '../../redux/actions';
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

const Table = () => {

    const { memberList, activeList } = useSelector((state: Members) => state.members);

    let filteredList;
    if (activeList.length === 0 || activeList.length === memberList.length) {
        filteredList = memberList;
    } else {
        filteredList = memberList.filter(item =>
            activeList.includes(item.company)
        );
    }

    const dispatch = useDispatch();

    const handleDelete = (key: number, index: number) => {
        dispatch(deleteMember(key));
        dispatch(updateMember());
    };

    return (
        filteredList.length > 0 ?
            (
                <div className="tableWrapper">
                    <table>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                />
                            </th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Last Updated</th>
                            <th>Notes</th>
                        </tr>
                        {filteredList.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>
                                        <input
                                            type="checkbox"
                                        />
                                    </td>
                                    <td>{val.name}</td>
                                    <td>{val.company}</td>
                                    <td>{val.status}</td>
                                    <td>{val.lastupdated}</td>
                                    <td>{val.note}</td>
                                    <td className="delete-div"><MdDelete className="delect-icon" onClick={() => { handleDelete(val.id, val.index) }} /></td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            ) :
            null
    );
};

export default Table;