import React from 'react';
import Input from '../components/Input';

function Register(){
    return (
        <div className="container">
        <h1>Registration Page</h1>
        <form className="form" action="/register" method="POST">
          <Input type="text" name="regno" placeholder="Registration Number" required />
          <Input type="text" name="name" placeholder="Name" required />
          <Input type="date" name="dob" placeholder="Date of Birth" required />
          <Input type="email" name="email" placeholder="Email" required />
          <Input type="password" name="pass1" placeholder="Password" required />
          <Input type="password" name="pass2" placeholder="Confirm Password" required />

          <button type="submit">Register</button>
        </form>
        </div>
    );
}

export default Register;