import { ONCHANGE, SUBMIT, USERS_LIST, DELETE, EDIT, UPDATE, RESET } from './constant'
const initialState = {
    userList: [],
    isValid: false,
    valueChange: false,

    msg: 'fillUp all required fields',
    loginForm: {
        username: {
            type: 'text',
            value: '',
            error: 'only string character allow',
            showError: false
        },
        email: {
            type: 'text',
            value: '',
            error: ' email is not valid',
            showError: false
        },
        password: {
            type: 'Password',
            value: '',
            error: 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more',
            showError: false
        },
        conformPassword: {
            type: 'Password',
            value: '',
            error: 'password is not match',
            showError: false
        }
    },
    status: false,
    editHardReset: false



}
const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ONCHANGE:

            return {
                ...state,
                loginForm: action.payload,
                valueChange: false
            }
        case USERS_LIST:
            return {
                ...state
            }
        case RESET:
            let active = state.status = false;

            return {
                ...state,
                active,
                loginForm: action.payload

            }
        case DELETE:

            return {
                ...state,
                userList: action.payload
            }
        case UPDATE:

            const s = state.status = false;

            return {
                ...state,
                userList: action.payload,
                s,
                loginForm: {
                    username: {
                        ...state.loginForm.username,
                        value: ''
                    },
                    email: {
                        ...state.loginForm.email,
                        value: ''
                    },
                    password: {
                        ...state.loginForm.password,
                        value: ''
                    },
                    conformPassword: {
                        ...state.loginForm.conformPassword,
                        value: ''
                    }
                }

            }
        case EDIT:
            let actives = state.status = true;

            return {
                ...state,
                loginForm: action.payload,
                actives
            }
        case SUBMIT:

            return {
                ...state,
                userList: action.payload,
                loginForm:action.login
            }
        default:
            return state;
    }
}
export default UserReducer;

