import { ONCHANGE, SUBMIT, USERS_LIST, DELETE, UPDATE, EDIT, RESET } from './constant'
export const onChange = (payload) => {
    return {
        type: ONCHANGE,
        payload
    };
};
export const reset = () => {
    return (dispatch, getState) => {
        const userList = getState()
        let userDatas = userList.Users.loginForm

        userDatas = {

            
            username: { ...userList.Users.loginForm.username, value: '' },
            email: { ...userList.Users.loginForm.email, value: '' },
            password: { ...userList.Users.loginForm.password, value: '' },
            conformPassword: { ...userList.Users.loginForm.conformPassword, value: '' }
        }

        dispatch({
            type: RESET,
            payload: userDatas
        })

    }
}
export const submit = (payload, history) => {
    return (dispatch, getState) => {

        const userSubmitList = getState()
        const login = userSubmitList.Users.loginForm
        let userSubmitData = userSubmitList.Users.userList.slice()
        const emails = userSubmitData.find(({ email }) => email === login.email.value)
        let hasError = true
        hasError = Object.values(login).some(({ showError }) => showError)
        if (!hasError && !emails && !login.email.showError && login.password.value === login.conformPassword.value && login.username.value !== '' && login.email.value !== '' && login.password.value !== '') {
            userSubmitData = [
                ...userSubmitData,
                {
                    id: userSubmitData.length + 1,
                    username: login.username.value,
                    email: login.email.value,
                    password: login.password.value,
                }
            ]
            localStorage.setItem('userLists', JSON.stringify(userSubmitData))
            history.push('/')
        }
        else {
            if(login.username.value === '' && login.email.value === '' && login.password.value === '' &&login.conformPassword.value === ''){
                alert('please first fill all form information')
                return;
            }
            if (emails) {
                alert('email already exist please enter different email')
            }
            if (login.password.value === !login.conformPassword.value) {
                alert('password not match , please insert same password')
            }
            if (login.email.showError) {
                alert('please insert valid email')
            } if (login.username.value === '') {
                alert('please insert username')
            }
            if (login.email.value === '') {
                alert('please insert email')
            }
            if (login.password.value === '') {
                alert('please insert password')
            }
            return;
        }

        dispatch({
            type: SUBMIT,
            payload: userSubmitData
        })
    }
}
export const update = (payload) => {
    return (dispatch, getState) => {
        const userUpdate = getState()
        let userUpdateData = userUpdate.Users.userList
        const formUpdate = userUpdate.Users.loginForm
        let duplicateUserData = userUpdateData.slice();
        let cloneUserIndex = duplicateUserData.findIndex(({ id }) => id ===Number(payload.id) )
        
        duplicateUserData[cloneUserIndex].id=Number(payload.id)
        duplicateUserData[cloneUserIndex].username=formUpdate.username.value
        duplicateUserData[cloneUserIndex].email=formUpdate.email.value
        duplicateUserData[cloneUserIndex].password=formUpdate.password.value
        
        localStorage.setItem('userLists', JSON.stringify(duplicateUserData))
        payload.history.push('/')
        dispatch({
            type: UPDATE,
            payload: duplicateUserData,
        })

    }

}

export const userListData = () => {
    return {
        type: USERS_LIST,

    }
}

export const remove = (payload , history) => {

    return (dispatch, getState) => {
        const userList = getState()
        let userDatas = userList.Users.userList

        userDatas.splice(payload, 1)
        localStorage.setItem('userLists', JSON.stringify(userDatas))
        history.push('/')
        dispatch({
            type: DELETE,
            payload: userDatas
        })

    }
}

export const edit = (payload) => {
    return (dispatch, getState) => {
        const userList = getState()
        const userEditsList = JSON.parse(localStorage.getItem('userLists'))

        userList.Users.userList = userEditsList
        let login1 = userList.Users.loginForm
        let copyUser = {}
        if (payload.isId === true) {
            copyUser = userList.Users.userList.find(({ id }) => id === Number(payload.id))
            if (copyUser === undefined) {
                alert('record not available')
                return payload.history.push('/');
            }
        }
        login1 = {
            ...userList.Users.loginForm,
           
            username: { ...userList.Users.loginForm.username, value: copyUser.username },
            email: { ...userList.Users.loginForm.email, value: copyUser.email },
            password: { ...userList.Users.loginForm.password, value: copyUser.password },
            conformPassword: { ...userList.Users.loginForm.conformPassword, value: copyUser.password }
        }

        dispatch({
            type: EDIT,
            payload: login1
        })
    }
}