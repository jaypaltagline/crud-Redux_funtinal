import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { remove } from './redux/user/userAction';
import { edit } from './redux/user/userAction';
import { useHistory } from 'react-router-dom';
export default function LoginForm(props) {

    let userDataList = JSON.parse(localStorage.getItem('userLists'))
    let users = useSelector(state => state.Users.userList)
    //users = userDataList;
    const history = useHistory();
    const dispatch = useDispatch()
    const id = props.match.params.id

    useEffect(() => {


        if (id !== undefined) {
            dispatch(edit({ id, history, isId: true }))
        }

    }, [id])

    const OnEdit = (id) => {
        history.push(`/edit/${id}`)
        dispatch(edit({ id, history, isId: true }))

    }

    const OnDelete = (index) => {

        dispatch(remove(index, history))

    }
    const OnAdd = () => {
        history.push('/add')
    }
    return (
        <div>
            <h2>Redux Crud Demo Using Dynamic Form and Validation</h2>
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
};
