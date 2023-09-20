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
        e.preventDefault();
        // console.log("onSubmit")
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionAction.signup({ username, firstName, lastName, email, password}))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
        }

        return setErrors(['Confirm Password field must be the same as the Password field']);
    }

    let isDisabled = true;
    if (username.length >= 4 && password.length >= 6 && confirmPassword.length >= 6 && password === confirmPassword) {
        isDisabled = false;
    } else {
        isDisabled = true;
    }

    return (
        <>
            <form className='signUp-form' onSubmit={onSubmit}>
            <div className='top-divider'>
                <div className='signup-header'>Sign Up</div>
            </div>
            <h1 className='signup-subheader'>Welcome to Vacation Spots</h1>
                <div className='errors'>
                    {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                </div>
                    <input
                        type='text'
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        placeholder="UserName"
                        className="first-input"
                        required
                    />
                    <input
                        type='text'
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder="First Name"
                        className="mid-input"
                        required
                    />
                    <input
                        type='text'
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        placeholder='Last Name'
                        className="mid-input"
                        required
                    />
                    <input
                        type='text'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        placeholder='Email'
                        className="mid-input"
                        required
                    />
                    <input
                        type='text'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder="Password"
                        className="mid-input"
                        required
                    />
                    <input
                        type='text'
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        placeholder='Confirm Password'
                        className='last-input'
                        required
                    />
                <button className='submit' disabled={isDisabled} type='submit'>Sign Up!</button>
            </form>
        </>
    );
}

export default SignupFormModal;
