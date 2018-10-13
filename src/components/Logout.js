import React from 'react';

import { withRouter, Redirect} from "react-router-dom";
import {lifecycle, compose} from 'recompose'
import {connect} from '../hocs/contextProvider'

const Logout = ()=> <Redirect push to="/"/>

const enhance= compose(
  lifecycle({
   componentWillMount(){
     this.props.auth.logout()
   }
  }),
  withRouter
)
export default connect(enhance(Logout))