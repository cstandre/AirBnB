import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../assets/logo.png'
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <li>
        <NavLink exact to="/"><img className='logo' src={logo} alt="" /></NavLink>
        {sessionUser && (
          <div>
            <Link to="/spots/new">Create a New Spot</Link>
          </div>
        )}
      </li>
      {isLoaded && (
        <li>
          <ProfileButton className='menu' user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
