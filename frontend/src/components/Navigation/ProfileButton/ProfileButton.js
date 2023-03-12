import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import * as sessionActions from '../../../store/session';
import OpenModalMenuItem from '../OpenModalMenuItems/OpenModalMenuItems';
import LoginFormModal from '../../LoginFormModal';
import SignupFormModal from '../../SignupFormModal';


import './ProfileButton.css'

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    history.push('/');
    dispatch(sessionActions.logout());
    closeMenu();
  };


  const ulClassName = "profile-dropdown" + (showMenu ? " showing" : " hidden");

  return (
    <>
      <button onClick={openMenu}>
      <i className="fa-solid fa-bars" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.firstName}</li>
            <li>{user.username}</li>
            <li>{user.email}</li>
              <button className="log-out" onClick={logout}>Log Out</button>
            <li>
              <Link className="manage-spots" to='/spots/current'>Manage Spots</Link>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              className="log-in"
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              className="sign-up"
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
