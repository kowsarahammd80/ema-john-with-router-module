import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import app from '../../Firebase/firebase.config';

export let AuthContext = createContext();

 let auth = getAuth(app)

const Context = ({children}) => {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);

  let createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email,password)
  }

  let signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth , email, password)
  }

  let logOut = () => {
    setLoading(true)
    return signOut(auth);
  }

  useEffect(() => {
    let unSubscribe =  onAuthStateChanged(auth, currentUser => {
      console.log('current User inside state change', currentUser);
      setUser(currentUser);
      setLoading(false);
    })
    return () => unSubscribe ();
  },[])


  let authInfo = {user, loading, createUser, signIn, logOut}

  return (
    <AuthContext.Provider value={authInfo} >
      {children}
    </AuthContext.Provider>
  );
};

export default Context;