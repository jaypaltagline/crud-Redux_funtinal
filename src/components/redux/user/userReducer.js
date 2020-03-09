import { ONCHANGE, SUBMIT, USERS_LIST, DELETE, EDIT, UPDATE, RESET } from './constant'
const initialState = {
 userList: [],
    loginForm: {
       username: {
            name: 'username',
            label: 'username:',
            type: 'text',
            value: '',
            error: 'only string character allow',
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
            error: 'only character and number allow',
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
            const loginClone = { ...state.loginForm }
            loginClone[name].value = value;
            return {
                ...state,
                loginForm: loginClone
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
            default:
            return state;
    }
}
export default UserReducer;

