import { ONCHANGE, SUBMIT, USERS_LIST, DELETE, UPDATE, EDIT, RESET, } from './constant'
import Validation from '../../resuablecomponent.js/validation'
export const onChange = (payload) => {

    return (dispatch, getState) => {
        const userState = getState()

        const { name, value } = payload;
        const loginClone = { ...userState.Users.loginForm }

        loginClone[name].value = value;

        const res = Validation(name, value)

        loginClone[name].showError = !res
        dispatch({
            type: ONCHANGE,
            payload: loginClone
        })

    };
}
export const reset = (history) => {
    return (dispatch, getState) => {
        const userList = getState()
        let userDatas = userList.Users.loginForm

        for (let index = 0; index < Object.values(userDatas).length; index++) {
            Object.values(userDatas)[index].value = ''
        }


        dispatch({
            type: RESET,
            payload: userDatas
        })

    }
}
export const submit = (payload, history) => {
    return (dispatch, getState) => {
        const state = getState()
        const login = { ...state.Users.loginForm }

        let valueState = state.Users.valueChange
        Object.values(login).forEach(({ value }, index) => {
            const name = Object.keys(login)[index]
            const tr = Validation(name, value)
            Object.values(login)[index].showError = !tr

        })

        const hasError = Object.values(login).some(({ showError }) => showError)
        console.log('hasError', hasError)

        let userSubmitData = state.Users.userList.slice()
        const emails = userSubmitData.find(({ email }) => email === login.email.value)

        if (emails) {
            state.Users.valueChange = true
        }
        if (!hasError && !emails) {

            userSubmitData = [
                ...userSubmitData,
                {
                    id: userSubmitData.length + 1,
                    username: login.username.value,
                    email: login.email.value,
                    password: login.password.value,
                }

            ]

            state.Users.valueChange = false
            localStorage.setItem('userLists', JSON.stringify(userSubmitData))
            history.push('/')
            for (let index = 0; index < Object.values(login).length; index++) {
                Object.values(login)[index].value = ''
            }
        }

        dispatch({
            type: SUBMIT,
            payload: userSubmitData,
            login
        })

    }
}
export const update = (payload) => {
    return (dispatch, getState) => {
        const userUpdate = getState()
        let userUpdateData = userUpdate.Users.userList
        const formUpdate = userUpdate.Users.loginForm
        let duplicateUserData = userUpdateData.slice();
        let cloneUserIndex = duplicateUserData.findIndex(({ id }) => id === Number(payload.id))

        duplicateUserData[cloneUserIndex].id = Number(payload.id)
        duplicateUserData[cloneUserIndex].username = formUpdate.username.value
        duplicateUserData[cloneUserIndex].email = formUpdate.email.value
        duplicateUserData[cloneUserIndex].password = formUpdate.password.value

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

export const remove = (payload, history) => {

    return (dispatch, getState) => {
        const userList = getState()
        let userDatas = userList.Users.userList.slice()

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