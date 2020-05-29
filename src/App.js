import React from 'react';
import {Router,Route} from "react-router-dom"
import history from "./history"
import Home from "./components/home/index";
import About from "./components/about/index";


function App() {
  return (
    <Router history={history}>
        <header className="App-header">
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/about' component={About}></Route>
        </header>
      </Router>
  );
}

export default App;
