import React, { useEffect } from 'react'
//import Logininput from './resuablecomponent.js/inputform';
import { useSelector, useDispatch } from 'react-redux'
import { onChange } from './redux/user/userAction';
//import { submit } from './redux/user/userAction';
import { remove } from './redux/user/userAction';
import { edit } from './redux/user/userAction';
//import { update } from './redux/user/userAction';
//import { reset } from './redux/user/userAction';
import { useHistory } from 'react-router-dom';


export default function LoginForm(props) {

    const usersS = useSelector(state => state.Users.userList)
    let userDataList = JSON.parse(localStorage.getItem('userLists'))
    let users = useSelector(state => state.Users.userList = userDataList)
    const login = useSelector(state => state.Users.loginForm)
    //const updates = useSelector(state => state.Users.status)
    const history = useHistory();
    const dispatch = useDispatch()
    const id = props.match.params.id

    //const userEditsList = JSON.parse(localStorage.getItem('editDatas'))

    useEffect(() => {


        if (id !== undefined) {
            dispatch(edit({ id,history,isId: true }))
        }

    }, [id])

    const handleChange = (e) => {
        dispatch(onChange({ name: e.target.name, value: e.target.value }))
        if (e.target.name === 'email') {
            const validEmail = emailValidation(e.target.value);

            if (!validEmail === true) {
                checkErrors()
            } else {
                checkErrors1()
            }

        }
        if (e.target.name === 'username') {
            const validUser = UserValidation(e.target.value);

            if (!validUser === true) {
                checkErrorsUser()
            } else {
                checkErrorsUser1()
            }

        }
        if (e.target.name === 'password') {
            const validPassword = PasswordValidation(e.target.value);
            if (!validPassword === true) {
                checkErrorsPassword()
            } else {
                checkErrorsPassword1()
            }

        }

    }

    const checkErrors = () => {
        login.email.showError = true
    }
    const checkErrors1 = () => {
        login.email.showError = false
    }
    const checkErrorsUser = () => {
        login.username.showError = true
    }
    const checkErrorsUser1 = () => {
        login.username.showError = false
    }

    const checkErrorsPassword = () => {
        login.password.showError = true
    }
    const checkErrorsPassword1 = () => {
        login.password.showError = false
    }

    //     const OnSubmit = (e) => {
    //         dispatch(submit(e))
    // }
    const OnEdit = (id) => {
        history.push(`/edit/${id}`)
        dispatch(edit({ id, history, isId: true }))

    }
    // const OnUpdate = (index) => {
    //     dispatch(update(index))
    // }
    // const OnReset = () => {
    //     dispatch(reset())
    // }


    const emailValidation = value => (
        (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(value)
    );

    const UserValidation = value => (
        (/[a-zA-Z]/).test(value)


    );

    const PasswordValidation = value => (
        (/[a-zA-Z0-9]/).test(value.length < 0)

    );
    const OnDelete = (index) => {

        dispatch(remove(index))

    }
    const OnAdd = () => {
        history.push('/add')
    }

    return (
        <div>
            <h2>Redux Crud Demo Using Dynamic Form and Validation</h2>
            {/* {UserDAta} */}

            <br />

            <button type='button' onClick={OnAdd}>Add</button>





            <hr />
            <React.Fragment>
                <h2>UserList</h2>
                <center>
                    <table border='solid 10px'>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.length > 0 && users.map((user, index) => {

                                    return <tr key={index}>

                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td><button type='button' onClick={() => OnDelete(index)}>Delete</button>
                                            <button type='button' onClick={() => OnEdit(user.id)}>Edit</button>
                                        </td>

                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </center>
            </React.Fragment>
        </div>
    )
}
