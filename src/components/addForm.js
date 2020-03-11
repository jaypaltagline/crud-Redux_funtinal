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
    }  
    const OnSubmit = (e) => {
        e.preventDefault()
        dispatch(submit(e, history))

    }
    const OnCancel = () => {
        history.push('/')
    }

    const OnReset = () => {
        dispatch(reset())
    }
   
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
                {/* <form> */}
                <Logininput  {...{ label, type, value, name, error, showError }} onChange={handleChange} />
                {/* </form> */}
            </div>
        )
    })


    return (
        <div>
            <h2>Redux Add Form</h2>
            <form onSubmit={OnSubmit}>
                {UserDAta}
                <br />
                {Buttons()}
            <button type='button' onClick={OnReset}>Reset</button>
            <button type='button' onClick={OnCancel}>Cancel</button>
            </form>
        </div>
    )
}
