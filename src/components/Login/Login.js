import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/Context';
import './Login.css'

const Login = () => {

  let {signIn} = useContext(AuthContext);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/'
   
  let handleSubmit = (event) => {
    event.preventDefault()
    let form = event.target;
    let email = form.email.value;
    let password = form.password.value;
      
    signIn(email, password)
     .then(result => {
       let user = result.user
       console.log(user)
       form.reset();
       navigate(from, {replace: true})
     })
     .catch(error => {
       console.log(error)
     })

  }

  return (
    <div className='form-container'>
       <h2 className='form-title'> Login Please</h2>
       <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor="email" name='name' id="" >Email</label>
            <input type="email" name='email' id='' required />
          </div>
          <div className='form-control'>
            <label htmlFor="password" name='password' id="" >Password</label>
            <input type="password" name='password' id='' required />
          </div>
          <input className='btn-submit' type="submit" value="Login" />
       </form>
       <p>New to ema john <Link to='/signup'>Create a new account</Link></p>
    </div>
  );
};

export default Login;