import React, { useEffect } from 'react'
import Logininput from './resuablecomponent.js/inputform';
import { useSelector, useDispatch } from 'react-redux'
import { onChange } from './redux/user/userAction';
import { submit } from './redux/user/userAction';
import { remove } from './redux/user/userAction';
import { edit } from './redux/user/userAction';
import { update } from './redux/user/userAction';
import { reset } from './redux/user/userAction';

export default function LoginForm() {

    const users = useSelector(state => state.Users.userList)
    const login = useSelector(state => state.Users.login)
    const updates = useSelector(state => state.Users.status)

    const userDataList = JSON.parse(localStorage.getItem('userLists'))

    const userEditsList = JSON.parse(localStorage.getItem('editDatas'))
    const dispatch = useDispatch()
    const handleChange = (e) => {
        dispatch(onChange({ name: e.target.name, value: e.target.value }))
        if (e.target.name === 'email') {
            const validEmail = emailValidation(e.target.value);
            //console.log('validEmail', validEmail);
            //const error = 'enter correct email'
            if (!validEmail === true) {
                checkErrors()
            } else {
                checkErrors1()
            }

        }
        if (e.target.name === 'username') {
            const validUser = UserValidation(e.target.value);
            // console.log('validEmail', validUser);
            // const error = 'enter username'
            if (!validUser === true) {
                checkErrorsUser()
            } else {
                checkErrorsUser1()
            }

        }
        if (e.target.name === 'password') {
            const validPassword = PasswordValidation(e.target.value);
            // console.log('validPassword', validPassword);
            // const error = 'enter correct email'
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

    const OnSubmit = (e) => {
        dispatch(submit(e))

    }
    const OnEdit = (index) => {

        dispatch(edit(index))
    }
    const OnUpdate = (index) => {
        dispatch(update(index))
    }
    const OnReset = () => {
        dispatch(reset())
    }


    const emailValidation = value => (
        (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(value)
    );

    const UserValidation = value => (
        (/[a-zA-Z]/).test(value)

    );

    const PasswordValidation = value => (
        (/[a-zA-Z0-9]/).test(value)
    );
    const OnDelete = (index) => {
        // console.log("Delete call ", index)
        dispatch(remove(index))

    }
    const submitButtons = <button type='button' onClick={OnSubmit}>Submit</button>
    const updateButtons = <button type='button' onClick={(index) => OnUpdate(index)}>update</button>
    const Buttons = () => {
        if (!updates) {
            return submitButtons
        } else {
            return updateButtons
        }
    }


    const UserDAta = Object.values(login).map(({ label, type, value, error, showError }, index) => {
        const name = Object.keys(login)[index]
        return (
            <div key={index}>
                <form>
                    <Logininput  {...{ label, type, value, name, error, showError }} onChange={handleChange} />
                </form>
            </div>
        )
    })

    return (
        <div>
            <h2>Redux Crud Demo Using Dynamic Form and Validation</h2>
            {UserDAta}

            <br />
            {/* 
            <button type='button' onClick={OnSubmit}>Submit</button>
            |
            <button type='button' onClick={(index) => OnUpdate(index)}>update</button> */}
            {Buttons()}
            |
            <button type='button' onClick={OnReset}>Reset</button>





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
                                userDataList.length >0 && userDataList.map((user, index) => {

                                    return <tr key={index}>

                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td><button type='button' onClick={() => OnDelete(index)}>Delete</button>
                                            <button type='button' onClick={() => OnEdit(index)}>Edit</button>
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

