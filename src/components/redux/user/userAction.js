import {ONCHANGE , SUBMIT , USERS_LIST , DELETE ,UPDATE, EDIT,RESET} from './constant'

export const onChange = (payload) => {
    return {
        type: ONCHANGE,
        payload
    };
};
export const reset = () =>{
    return {
        type:RESET
    }
}
export const submit = (payload) => {
    return {
        type: SUBMIT,
        payload     
    }
}
export const update = (index) =>{
    return{
        type:UPDATE , 
        payload:index
    }
}

export const userListData = () =>{
    return{
        type:USERS_LIST,
        
    }
}

export const remove = (payload) =>{
    return{
        type:DELETE,
        payload
    }
}
export const edit = (payload) =>{
    return{
        type:EDIT,
        payload
    }
}