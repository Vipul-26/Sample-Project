/* eslint-disable array-callback-return */
import {
    ADD_MEMBER,
    DELETE_MEMBER,
    UPDATE_MEMBER,
    ADD_ACTIVE_LIST,
    ADD_USER,
    GET_NEWS,
    SET_NEWS,
    SET_CHANNEL,
} from '../action-types/constant';

const uList = localStorage.getItem('user-list')
let usersList: User[] = []
if (usersList && uList) {
    usersList = JSON.parse(uList)
}

const initialState = {
    memberList: [],
    activeList: [],
    userList: usersList,
    newsList: {},
    channelName: '',
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

interface MemberAction {
    type: string;
    data: Member | number | string | User;
}

let updateMemberIndex = (memberList: Member[]) => {
    for (let i = 0; i < memberList.length; i++) {
        memberList[i].index = i
    }
    return memberList;
};

export const memberReducer = (state = initialState, action: MemberAction) => {
    switch (action.type) {
        case ADD_MEMBER: {
            return {
                ...state,
                memberList: [...state.memberList, action.data]
            }
        }
        case DELETE_MEMBER: {
            const updatedMemberList = state.memberList.filter(
                (item: Member) => item.id !== action.data
            );
            return {
                ...state,
                memberList: updatedMemberList
            }
        }
        case UPDATE_MEMBER: {
            return {
                ...state,
                memberList: updateMemberIndex(state.memberList)
            }
        }
        case ADD_ACTIVE_LIST: {
            return {
                ...state,
                activeList: action.data
            }
        }
        case ADD_USER: {
            localStorage.setItem(
                'user-list',
                JSON.stringify([...state.userList, action.data])
            )
            return {
                ...state,
                userList: [...state.userList, action.data]
            }
        }
        case GET_NEWS: {
            return {
                ...state
            }
        }
        case SET_NEWS: {
            return {
                ...state,
                newsList: action.data
            }
        }
        case SET_CHANNEL: {
            return {
                ...state,
                channelName: action.data
            }
        }
        default:
            return {
                ...state
            }
    }
}
