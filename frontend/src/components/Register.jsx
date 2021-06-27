import React from 'react';
import Input from '../components/Input';

function Register(){
    return (
        <div className="container">
        <h1>Registration Page</h1>
        <form className="form">
          <Input type="text" placeholder="Registration Number" />
          <Input type="text" placeholder="Name" />
          <Input type="text" placeholder="Date of Birth" />
          <Input type="text" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm Password" />

          <button type="submit">Register</button>
        </form>
        </div>
    );
}

export default Register;