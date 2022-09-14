import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/header";
// import MySwitch from './components/switch.tsx';
// import Switch from "react-switch";
import NewsList from "./components/NewsList";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* <NewsList /> */}
      <Switch>
        <Route path="/" component={NewsList} exact></Route>
        <Route path="/world" component={NewsList}></Route>
        <Route path="/business" component={NewsList}></Route>
        <Route path="/politics" component={NewsList}></Route>
        <Route path="/technology" component={NewsList}></Route>
        <Route path="/sport" component={NewsList}></Route>
        <Route path="/style" component={NewsList}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
