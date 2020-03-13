import React, { useEffect } from 'react'
import Logininput from './resuablecomponent.js/inputform';
import { useSelector, useDispatch } from 'react-redux'
import { onChange } from './redux/user/userAction';
import { edit } from './redux/user/userAction';
import { update } from './redux/user/userAction';
import { reset } from './redux/user/userAction';
import { useHistory } from 'react-router-dom';

export default function EditForm(props) {

    const login = useSelector(state => state.Users.loginForm)
    const history = useHistory();
    const dispatch = useDispatch()
    const id = props.match.params.id

    useEffect(() => {
        if (id !== undefined) {
            dispatch(edit({ id, history, isId: true }))
        }
    }, [id])

    const handleChange = (e) => {
        dispatch(onChange({ name: e.target.name, value: e.target.value }))
        
    }

    
    const OnUpdate = (id) => {
        dispatch(update({id,history}))
    }
    const OnCancel = () => {
        history.push('/')
    }

    const OnReset = () => {
        dispatch(reset())
    }
    
const UserDAta = Object.values(login).map(({ label, type, value, error,msg ,showError }, index) => {
        const name = Object.keys(login)[index]
        return (
            <div key={index}>
                <form>
                    <Logininput  {...{ label, type, value, name, msg ,error, showError }} onChange={handleChange} label={name} />
                </form>
            </div>
        )
    })
    return (
        <div>
            <h2>Redux Edit Form</h2>
            {UserDAta}
            <br />
            <button type='button' onClick={() => OnUpdate(id)}>update</button>
            |
            <button type='button' onClick={OnReset}>Reset</button>
            |
            <button type='button' onClick={OnCancel}>Cancel</button>
        </div>
    )
}
