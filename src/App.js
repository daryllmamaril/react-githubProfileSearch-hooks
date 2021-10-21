import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import HeroHeader from "./components/HeroHeader";
import Users from "./components/Users";
import Search from "./components/Search";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Alert from "./components/Alert";
import User from "./components/User";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);

  // BEWARE OF NOT GOING INTO RECURSION HERE, THE [] PARAMETER IS VERY IMPT!
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get("https://api.github.com/users");
      // console.log(res.data);
      setUsers(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const searchUsers = async (username) => {
    setLoading(true);
    const response = await axios.get(
      `https://api.github.com/search/users?q=${username}`
    );
    setUsers(response.data.items);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
  };

  const showAlert = (alertMsg, alertType) => {
    setAlert({ alertMsg, alertType });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}`);
    setUser(res.data);
    setLoading(false);
    // console.log(res.data);
  };

  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
    setRepos(res.data);
    setLoading(false);
  };

  return (
    // All components need to be wrapped inside Router so it has access to all
    <Router basename="/githubhooks">
      <>
        <NavBar />

        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              // You have to wrap the components you wanna render in this path in a Fragment<></>
              <>
                <HeroHeader />
                <Alert alert={alert} />
                <Search
                  searchUsers={searchUsers}
                  clearUsers={clearUsers}
                  users={users}
                  showAlert={showAlert}
                />
                <Users users={users} loading={loading} />
              </>
            )}
          />

          <Route
            exact
            path="/user/:login"
            render={(props) => (
              <User
                {...props}
                getUser={getUser}
                user={user}
                loading={loading}
                getUserRepos={getUserRepos}
                repos={repos}
              />
            )}
          />

          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
        </Switch>

        <Footer />
      </>
    </Router>
  );
}

export default App;
