import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ logoutUser, isUserLoggedIn, user }) => {
    if (isUserLoggedIn) {
        return (
            <div>
                <nav>

                </nav>
            </div>
        )
    }

    return (
        <nav>
            <Link to='/'>Home</Link>{" "}
            <Link to='/login'>Log-In</Link>{" "}
            <Link to='/signup'>Sign-Up</Link>{" "}
            <Link to='/about'>About</Link>
        </nav>
    )
}

export default NavBar