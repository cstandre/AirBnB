import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';


import './LoginForm.css';


function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled]= useState(true);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  useEffect(() => {
    if (credential.length < 5 || password.length < 6 ) {
      setIsButtonDisabled(true)
    } else {
      setIsButtonDisabled(false)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        if (res.status === 401) {
          const errorMsg = "The provided credentials were invalid."
          setErrors([errorMsg])
        }
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }



  const createDemo = () => {
    setCredential('DemoUser');
    setPassword('DemoUser123');
    return dispatch(sessionActions.login(credential, password)).then(closeModal)
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder='Username or Email'
            required
            className='credential'
          />
        </label>
        <br/>
        <label>
          <input
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br/>
        <button disabled={isButtonDisabled} type="submit">Log In</button>
        <br/>
        <button onClick={createDemo}>Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
