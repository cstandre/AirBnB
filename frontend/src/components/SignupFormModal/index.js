import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionAction from '../../store/session';
import './SignupForm.css';


function SignupFormModal() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


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
            <h1>Sign Up</h1>
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
                    Password:
                    <input
                        type='text'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </label>
                <label>
                    Confirm Password:
                    <input
                        type='text'
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                    />
                </label>
                <button type='submit'>Sign Up!</button>
            </form>
        </>
    );
}

export default SignupFormModal;
