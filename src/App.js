import React from "react";

import "bulma/css/bulma.css";

import "./fontawesome";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProtectedRoute from "./router/ProtectedRoute";

import { Section, Container } from "bloomer";

import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Logout from "./components/Logout";

import { Provider } from "./hocs/contextProvider";
import Api from "./net/Api";
import Auth from "./auth/Auth";

const App = () => {
  const auth = new Auth();
  const apiNewInstance = () => {
    return new Api({ auth });
  };
  const WithProvider = Provider({ apiNewInstance, auth })(
    props => props.children
  );
  return (
    <WithProvider>
      <Router>
        <Container>
          <Section>
            <Header />
          </Section>
          <Section>
            <Switch>
              <ProtectedRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/logout" component={Logout} />
              <Route component={NotFound} />
            </Switch>
          </Section>
        </Container>
      </Router>
    </WithProvider>
  );
};

export default App;
