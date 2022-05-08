import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from "keycloak-js";
import ApplicationContainer from "./layouts/ApplicationContainer";
import Main from "./components/Main";
import History from "./components/History";
import Subscription from "./components/Subscription";
import Unfound from "./components/Unfound";

const config = {

}

const App = () => {
  return (
    <ReactKeycloakProvider
      initOptions={{ onLoad: 'login-required' }}
      authClient={Keycloak({
        "clientId": "marketing-front",
        "realm": "Marketing",
        "url": "http://localhost:8080/auth"
      })}>
      <Router>
        <ApplicationContainer>
          <Switch>
            <Route path="/subscription" component={Subscription}>
            </Route>
            <Route exact path="/">
              <Main />
            </Route>
          </Switch>
        </ApplicationContainer>
      </Router>
    </ReactKeycloakProvider>
  )
};

export default App;
