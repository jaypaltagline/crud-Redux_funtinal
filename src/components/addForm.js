import React, { useEffect } from 'react'
import Logininput from './resuablecomponent.js/inputform';
import { useSelector, useDispatch } from 'react-redux'
import { onChange } from './redux/user/userAction';
import { submit } from './redux/user/userAction';
import { edit } from './redux/user/userAction';
import { reset } from './redux/user/userAction';
import { useHistory } from 'react-router-dom';
export default function AddForm(props) {
    const history = useHistory();
    const login = useSelector(state => state.Users.loginForm)
    const updates = useSelector(state => state.Users.status)
     const dispatch = useDispatch()
    const id = props.match.params.id
   useEffect(() => {
           if (id !== undefined) {
         dispatch(edit({ id, isId: true }))
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

    const OnSubmit = (e) => {
        dispatch(submit(e, history))

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
        (/[a-zA-Z0-9]/).test(value.length < 0)

    );
   
    const submitButtons = <button type='button' onClick={OnSubmit}>Submit</button>
    const Buttons = () => {
        if (!updates) {
            return submitButtons
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
            <h2>Redux Add Form</h2>
            {UserDAta}

            <br />

            {Buttons()}
            |
            <button type='button' onClick={OnReset}>Reset</button>

            </div>
    )
}
