import React, { useState, useEffect } from "react";
import { HashRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import ErrorBoundry from "../components/ErrorBoundry";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";

const TITLE = "Robofriends | Razvan Chiriac";

function App() {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setRobots(users));
  }, []);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });
  return !robots.length ? (
    <h1 className="tc">Loading...</h1>
  ) : (
    <div className="tc">
      <Helmet>
        <title> {TITLE} </title>
      </Helmet>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </HashRouter>
    </div>
  );
}

export default App;
