import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionAction from '../../store/session'


function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to='/' />

    const onSubmit = e => {
        e.preventDefualt();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionAction.signup({ username, firstName, lastName, email, password}))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
        }

        return setErrors(['Confirm Password field must be the same as the Password field']);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Username:
                    <input
                        type='text'
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                </label>
                <label>
                    First Name:
                    <input
                        type='text'
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        required
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type='text'
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type='text'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </label>
                <label>
                    password:
                    <input
                        type='text'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </label>
                <button type='submit'>Sign Up!</button>
            </form>
        </>
    );
}

export default SignupForm;
