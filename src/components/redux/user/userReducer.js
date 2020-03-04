import { ONCHANGE, SUBMIT, USERS_LIST, DELETE, EDIT, UPDATE, RESET } from './constant'
const initialState = {

    userList: [],
    clonedUsers: [],
    login: {
        id: {
            name: 'id',
            type: 'hidden',
            value: ''
        },
        username: {
            name: 'username',
            label: 'username:',
            type: 'text',
            value: '',
            error: 'enter username',
            showError: false
        },
        email: {
            name: 'email',
            label: 'email:',
            type: 'text',
            value: '',
            error: ' email is not valid',
            showError: false,
        },
        password: {
            password: 'password',
            label: 'Password:',
            type: 'Password',
            value: '',
            error: 'enter password',
            showError: false
        },
        conformPassword: {
            label: 'conformPassword:',
            type: 'Password',
            value: '',
            error: 'enter conform password',
            showError: false

        }
    },
    status: false,
    editHardReset: false
}
const UserReducer = (state = initialState, action) => {


    switch (action.type) {
        case ONCHANGE:
            const { name, value } = action.payload;
            const loginClone = { ...state.login }
            loginClone[name].value = value;
            return {
                ...state,
                login: loginClone
            }
        case USERS_LIST:
            return {
                ...state
            }
        case RESET:
            const login2 = { ...state.login }

            const clean1 = () => {
                return (
                    login2.username.value = '',
                    login2.email.value = '',
                    login2.password.value = '',
                    login2.conformPassword.value = ''
                )
            }

            localStorage.setItem('editHardReset', state.editHardReset = false);
            clean1();
            return {
                ...state,
            }
        case DELETE:
            const u = [...state.userList]
            u.splice(action.payload, 1)
            localStorage.setItem('userLists', JSON.stringify(u))
            return {
                ...state,
                userList: u
            }
        case UPDATE:
            const login3 = { ...state.login }
            const cleanUpdate = () => {
                return (
                    login3.username.value = '',
                    login3.email.value = '',
                    login3.password.value = '',
                    login3.conformPassword.value = ''
                )
            }
            let duplicateUserData = state.userList.slice();
            let cloneUserIndex = duplicateUserData.find(({ id }) => id === login3.id.value)
            cloneUserIndex = [

                {
                    id: login3.id.value,
                    username: login3.username.value,
                    email: login3.email.value,
                    password: login3.password.value,
                }
            ]
            localStorage.setItem('userLists', JSON.stringify(cloneUserIndex))
            state.status = false;
            cleanUpdate();
            return {
                ...state,
                userList: cloneUserIndex
            }
        case EDIT:
            localStorage.setItem('editHardReset', state.editHardReset = true)
            const login33 = JSON.parse(localStorage.getItem('userLists'))
            state.userList = login33
            let login1 = { ...state.login };
            state.status = true;
            const copyUser = state.userList[action.payload];
            login1 = {
                ...state.login,
                id: { ...state.login.id, value: copyUser.id },
                username: { ...state.login.username, value: copyUser.username },
                email: { ...state.login.email, value: copyUser.email },
                password: { ...state.login.password, value: copyUser.password },
                conformPassword: { ...state.login.conformPassword, value: copyUser.password }
            }
            localStorage.setItem('editDatas', JSON.stringify(login1))
            return {
                ...state,
                login: login1
            }
        case SUBMIT:

            const clean = () => {
                return (
                    login.username.value = '',
                    login.email.value = '',
                    login.password.value = '',
                    login.conformPassword.value = ''
                )
            }
            const login = { ...state.login }
            let userList = state.userList.slice()
            console.log('object', userList)
            const emails = userList.find(({ email }) => email === login.email.value)
            let hasError = true
            hasError = Object.values(login).some(({ showError }) => showError)
            if (!hasError && !emails && !login.email.showError && login.password.value === login.conformPassword.value) {
                userList = [
                    ...userList,
                    {
                        id: userList.length + 1,
                        username: login.username.value,
                        email: login.email.value,
                        password: login.password.value,
                    }
                ]
                localStorage.setItem('userLists', JSON.stringify(userList))
                clean();
            }
            else {
                alert('enter proper email or email is already exist or your password and conform password not match')
            }


            return {
                ...state,
                userList
            }


        default:
            return state;
    }
}
export default UserReducer;

