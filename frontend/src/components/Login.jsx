import React from 'react';
import Input from '../components/Input';

function Login(){
    return (
        <div className="container">
        <h1>Login Page</h1>
        <form className="form">
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        </div>
    );
}

export default Login;