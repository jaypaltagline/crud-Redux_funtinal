import { ONCHANGE, SUBMIT, USERS_LIST, DELETE, EDIT, UPDATE, RESET } from './constant'
const initialState = {
    userList: [],
    isValid: false,
    valueChange: false,

    msg: 'email already taken',
    loginForm: {
        username: {
            type: 'text',
            value: '',
            error: 'only string character allow',
            showError: false
        },
        email: {
            type: 'text',
            value: 's@gmail.com',
            error: ' email is not valid',
            showError: false
        },
        password: {
            type: 'Password',
            value: 'Pjaypal@123',
            error: 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more',
            showError: false
        },
        conformPassword: {
            type: 'Password',
            value: 'Pjaypal@123',
            error: 'password is not match',
            showError: false
        }
    }
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

        return {
                ...state,
                loginForm: action.payload
            }
        case DELETE:

            return {
                ...state,
                userList: action.payload
            }
        case UPDATE:

            return {
                ...state,
                userList: action.payload,
               
            }
        case EDIT:

            return {
                ...state,
                loginForm: action.payload,
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

