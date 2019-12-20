import React, { useState } from "react";
import { BrowserRouter as Router,  Link, Route, Switch } from "react-router-dom";
import BubblePage from './components/BubblePage'; 
import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        
        <div style={{display: `flex`, width: `10%`, height: `100px`}}>
          <Link to="/login">Login</Link>
          <Link to="/BubblePage">Home</Link>
        </div>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route exact path="/BubblePage" component={BubblePage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
