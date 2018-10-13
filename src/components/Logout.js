import React from 'react';

import {Redirect} from "react-router-dom";
import {lifecycle, compose} from 'recompose'
import {connect} from '../hocs/contextProvider'

const Logout = ()=> <Redirect push to="/"/>

const enhance= compose(
  lifecycle({
   componentWillMount(){
     this.props.auth.logout()
   }
  })
)
export default connect(enhance(Logout))