import React from 'react';
import {Route,Switch,Redirect} from "react-router-dom";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import NavBar from "./components/NavBar";
import LoginForm from './components/LoginForm';



function App() {
  return (
    <React.Fragment>
    <NavBar />
    <main>
    <Switch>
    <Route path="/login" exact component={LoginForm}></Route>
    <Route path="/movies" component={Movies}></Route>
    <Route path="/customers" component={Customers}></Route>
    <Route path="/rentals" component={Rentals}></Route>
    <Route path="/not-found" component={NotFound}></Route>
    <Redirect from="/" exact to="movies"/>
    <Redirect to="/not-found"/>
    </Switch>
    </main>
    </React.Fragment>
  );
}

export default App;
