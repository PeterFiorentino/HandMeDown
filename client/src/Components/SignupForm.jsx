import React from 'react';

const SignupForm = ({
  username,
  password,
  handleChange,
  signupUser,
  avatar_url
}) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    signupUser()
  }

  return (
    <div className='form-container'>
      <h2> Sign-Up </h2>
      <form onSubmit={handleSubmit}>
        <i class="fas fa-user"></i>{"  "}
        <input
          className='signup-input'
          type="text"
          name="username"
          value={username}
          placeholder="username"
          onChange={handleChange}
        /><br/>
        <i class="fas fa-lock"></i>{"  "}
        <input
          className='signup-input'
          type="password"
          name="password"
          value={password}
          placeholder="••••••••"
          onChange={handleChange}
        /><br/>
        <i class="fas fa-image"></i>{"  "}
        <input
          className='signup-input'
          type="text"
          name="avatar_url"
          value={avatar_url}
          placeholder="Enter Avatar URL"
          onChange={handleChange}
        /><br/>
        <input className='submit-button' type="submit" value="Signup" />
      </form>
    </div>
  )
}

export default SignupForm;