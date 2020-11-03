/**
 * Created by Yash Goel on 08 - sept - 2020
 * 
 */

import {getUsersListApi} from "../Api"
import { SET_LIST, REMOVE_AT, FETCH_DATA,RESET,SET_SELECTION,SET_COMMENT ,ASE_DEC_TOGGLE} from "../Actions"

export const setList = (list) => {
    return {
        type: SET_LIST,
        list: list
    }
}

export const setCommentAt = (index,text) => {
    return {
        type: REMOVE_AT,
        index:index,
        text: text
    }
}

export const removeAT = (id) => {
    return {
        type: REMOVE_AT,
        id: id
    }
}

export const getData = () => {
    return {
        type: FETCH_DATA
    }
}

export const resetAll = () => {
    return {
        type: RESET
    }
}

export const setSelection = (which,key,index,value) => {
    return {
        type: SET_SELECTION,
        which:which,
        key:key,
        index:index,
        value:value
    }
}
export const setComment = (which,key,index,value) => {
    return {
        type: SET_COMMENT,
        which:which,
        key:key,
        index:index,
        value:value
    }
}
export const AseDecToggle = () => {
    return {
        type: ASE_DEC_TOGGLE
    }
}




export async function fetchData(dispatch) {
        dispatch(getData())
        await getUsersListApi()
        .then((result) => {
            dispatch(setList(result.response))
          })
          .catch((err) => console.log('err:', err))
}