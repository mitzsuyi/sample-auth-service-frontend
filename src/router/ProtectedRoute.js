import React from 'react';
import { Route, Redirect} from "react-router-dom";
import {connect} from '../hocs/contextProvider'

const ProtectedRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default connect(ProtectedRoute)