import React, {useState, useEffect} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from './components/Partials/Header/Header';
import Navbar from './components/Partials/Nav/Nav';
import Main from './components/Partials/Main/Main';
import Footer from './components/Partials/Footer/Footer';

import Home from './components/Home/Home';
import Hoteller from './components/Overlook/Overlook';
import Login from './components/Login/Login';
import Ratings from './components/Ratings/Ratings';
import AddToCart from './components/Addtocart/Addtocart';
import Tilmelding from './components/Subscribe/Subscribe';


function App() {

  // state til at gemme login data
  const [loginData, setLoginData] = useState([])
  
  // useEffect der gemmer logindata fra sessionStorage
  useEffect(() => {
    if (sessionStorage.getItem("token")){
      setLoginData(JSON.parse(sessionStorage.getItem("token")))
    }
  }, [setLoginData])

  // Funktion til at lave fetch - sendes med ind i de komponenter der skal fetche
  async function doFetch(url){
    try {
      const response = await fetch(url)
      const data = await response.json()
      return data
    }
    catch (error){
       console.log(error)
    }
  }

  // Router med routes der renderer vores componenter
  return (
    <Router>
        <Header />
        <Navbar/>
        <Switch>

          <Route path="/login">
            <Login loginData={loginData} setLoginData={setLoginData}/>
          </Route>

          <Route path="/hoteller">
            <Hoteller doFetch={doFetch}/>
          </Route>

          <Route path="/ratings">
            <Ratings loginData={loginData} doFetch={doFetch}/>
          </Route>

          <Route path="/addtocard">
            <AddToCart loginData={loginData} doFetch={doFetch}/>
          </Route>
          
          <Route path="/tilmelding">
            <Tilmelding loginData={loginData} doFetch={doFetch}/>
          </Route>
          
          <Route path="/">
            <Home/>    
          </Route>

          <Main />
          <Footer />

        </Switch>

    </Router>
  )
}

export default App;
