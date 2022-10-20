import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/Context';
import './Signup.css'

const Signup = () => {
  let [error, setError] = useState(null)

  let {createUser} = useContext(AuthContext)

  let handleSubmit = (event) =>{
    event.preventDefault()
    let form = event.target;
    let email = form.email.value;
    let password = form.password.value;
    let confirm = form.confirm.value;
     
    if(password.length < 6){
       setError('Password should be 6 characters')
       return;
    }

    if(password !== confirm){
       setError('Your Password did not match')
       return;
    } 

    createUser(email, password)
      .then(result => {
        let user = result.user
        console.log(user);
        form.reset();
      })
      .catch(error => {
         console.log(error)
      })
         
  }
 
  return (
    <div className='form-container'>
    <h2 className='form-title'> Sign Up Please</h2>
    <form onSubmit={handleSubmit}>
       <div className='form-control'>
         <label htmlFor="email"  id="" >Email</label>
         <input type="email" name='email' id='' required />
       </div>
       <div className='form-control'>
         <label htmlFor="password"  id="" >Password</label>
         <input type="password" name='password' id='' required />
       </div>
       <div className='form-control'>
         <label htmlFor="confirm" id="" >Confirm Password</label>
         <input type="password" name='confirm' id='' required />
       </div>
       <input className='btn-submit' type="submit" value="Register" />
    </form>
    <p>Already have an account ? <Link to='/login'>Login</Link></p>
    <p className='text-error'>{error}</p>
 </div>
  );
};

export default Signup;