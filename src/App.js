import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Forside from './components/forside/forside';
import Navbar from './components/navbar/navbar';
import Hoteller from './components/hoteller/hoteller';
import Login from './components/login/login';
import Ratings from './components/ratings/ratings';
import AddToCart from './components/addtocart/addtocart';
import Tilmelding from './components/tilmelding/tilmelding';


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
            <Forside/>    
          </Route>

        </Switch>
    </Router>
  )
}

export default App;
