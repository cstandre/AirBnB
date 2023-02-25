// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupForm from './components/SignupFormPage';
// import * as sessionAction from './store/session';

function App() {
  // const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   dispatch(sessionAction.restoreUser()).then(() => setIsLoaded(true));
  // }, [dispatch]);

  return /*isLoaded &&*/ (
    <Switch>
      <Route path='/api/login'>
        <LoginFormPage />
      </Route>
      <Route path='/api/signup'>
        <SignupForm />
      </Route>
    </Switch>
  );
}

export default App;
