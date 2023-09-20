import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';


import './LoginForm.css';


function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state=>state.session.user);
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
  }, [credential, password])

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
      },);
  }



  const createDemo = () => {
    setCredential('DemoUser');
    setPassword('DemoUser123');
    // return dispatch(sessionActions.login(credential, password)).then(closeModal)
  }

  return (
    <>
      <form className="logIn-form" onSubmit={handleSubmit}>
          <div className='top-divider'>
            <div className='login-header'>Log in</div>
          </div>
          <h1 className='login-subheader'>Welcome to Vacation Spots</h1>
          <div className='login-errors'>
            {errors.map((error, idx) => <div key={idx}>{error}</div>)}
          </div>
                <input
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  placeholder='Username or Email'
                  required
                  className='first-input'
                />
              <input
                type="password"
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                required
                className='last-input'
              />
          <button className='submit' disabled={isButtonDisabled} type="submit">Log In</button>
          <button className='demoUser' onClick={createDemo}>Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
