import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';
import Logo from '../Assets/Hand-Me-Down-Logo-Color.svg'

class Home extends Component {

    render() {
        return (
            <div className='main'>
                <img src={Logo} className='main-logo'/>
                <h1> Welcome to HandMeDown! </h1>
                <h2>Add stories to your clothing! </h2>
                <div className='redirect-buttons'>
                    <Link to='/login'>
                        <button className='submit-button'> Log In </button>
                    </Link> 
                    <Link to='/signup'>
                        <button className='submit-button'> Sign Up </button>
                    </Link>
                </div>
            </div>   
        )
    }
}

export default Home