import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './component/homePage/Home.js';
import selectedItem from './component/selecteditem/selectedItem';
import updateItem from './component/updateitem/updateItem';

function App() {
  return (
    <Router>
        <div className="main-div">
          <Route exact path="/" component={Home}/>
          <Route exact path="/items/:itno" component={selectedItem}/>
          <Route exact path="/items/:itno/update" component={updateItem}/>
        </div>

      </Router>
  );
}

export default App;
