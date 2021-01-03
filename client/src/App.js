import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Orders from "./components/Orders";
import Order from "./components/Order";
import AddOrder from "./components/AddOrder";
import EditOrder from "./components/EditOrder";

function App() {
  //using a hook posts is acting as state/ set posts is set state
  //empty post array
  //axios getting request from backend
  //catch will catch an error
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
    //moved http://localhost:4000 to "proxy" in package.json so we dont have to keep typing http://..
      .get("/orders")
      .then(res => setPosts(res.data))
      .catch(error => console.log(error));
  });

  //passed the state into the orders component
  //route for individual order made with parameter id 
  //and grabbed props from order.js
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Route exact path="/" render={() => <Orders posts={posts} />} />
      
      <Route
       path="/order/:id"
       render={props => <Order {...props} posts={posts} />} />

      <Route
       path="/update/:id"
       render={props => <EditOrder {...props} posts={posts} />} />

      <Route path="/add-order" component={AddOrder} />
      <Footer />
    </div>
  );
}

export default App;
