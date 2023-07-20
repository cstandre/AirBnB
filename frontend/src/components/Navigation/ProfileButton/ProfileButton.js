import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

  const handelClick = (e) => {
    e.preventDefault();
    history.push('/spots/current')
    closeMenu();
  }


  const ulClassName = "profile-dropdown" + (showMenu ? " showing" : " hidden");

  return (
    <>
      <button onClick={openMenu}>
      <i className="fa-solid fa-bars" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>
              <p className="user-menu">
                Hello, {user.firstName}
              </p>
            </div>
            <div>
              <p className="user-menu">
                {user.username}
              </p>
            </div>
            <p className="user-menu">
              {user.email}
            </p>
            <p className="manage-spots" onClick={handelClick}>
              Manage Spots
            </p>
            <button className="log-out" onClick={logout}>
              Log Out
            </button>
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
      </div>
    </>
  );
}

export default ProfileButton;
