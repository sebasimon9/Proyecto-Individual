import React from 'react';
import './App.css';
import Home from './03_components/Home/Home';
import LandingPage from './03_components/LandingPage/LandingPage';
import ActivityCreate from './03_components/ActivityCreate/ActivityCreate';
import Detail from './03_components/Detail/Detail';
import ActivitiesList from './03_components/ActivitiesList/ActivitiesList';
import About from './03_components/About/About';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path ='/' component ={LandingPage}/>
            <Route exact path ='/home' component ={Home}/>
            <Route exact path ='/activity' component ={ActivityCreate}/>
            <Route exact path ='/activities' component = {ActivitiesList}/>
            <Route exact path ='/detail/:id' component ={Detail}/>
            <Route exact path = '/about' component ={About}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  
  export default App;