import React from 'react';
import Input from '../components/Input';

function Register(){
    return (
        <div className="container">
        <h1>Registration Page</h1>
        <form className="form" action="/register" method="POST">
          <Input type="text" name="regno" placeholder="Registration Number" />
          <Input type="text" name="name" placeholder="Name" />
          <Input type="date" name="dob" placeholder="Date of Birth" />
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="pass1" placeholder="Password" />
          <Input type="password" name="pass2" placeholder="Confirm Password" />

          <button type="submit">Register</button>
        </form>
        </div>
    );
}

export default Register;