import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.css";
import { auth } from "./firebase";

import Nav from "./Components/Nav";
import Home from "./Components/Home";
import NavBarBottom from "./Components/NavBarBottom/"
import Search from "./Components/Search";
import Records from './Components/Records';
import Stats from "./Components/Stats";
import SignIn from "./Components/SignIn/";
import SignUp from "./Components/SignUp/";
import Settings from "./Components/Settings/";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      setUser(authUser ? authUser : null);
    })
  }, []);

  // console.log(user);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Switch>
            <Route path='/signup' component={SignUp} />
            <Route path={['/signin', '/']} component={SignIn} />
          </Switch>
        ) : (
          <>
            <Nav />

            <Route
              render={({ location }) => (
                <TransitionGroup>
                  <CSSTransition key={location.key} timeout={300} classNames="fade">
                    <Switch location={location}> 
                      
                      <Route path="/settings" component={Settings} />
                      <Route path="/search" component={Search} />
                      <Route path="/records" component={Records} />
                      <Route path="/stats" component={Stats} />
                      <Route path="/" component={Home} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              )}
            />

            <NavBarBottom />
        </>
        )}
      </Router>
    </div>
  );
}

export default App;
