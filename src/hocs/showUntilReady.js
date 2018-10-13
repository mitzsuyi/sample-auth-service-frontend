import React from 'react';
import {branch, renderComponent} from 'recompose'
import ReactLoading from 'react-loading';
import {Container} from 'bloomer'

const Loader = props =>(<Container> 
    <ReactLoading type="bars" color="green"/>
 </Container>
)

const showWhenUserAvailable = test => branch(
  props=>!test(props),
  renderComponent(Loader),
)

export default showWhenUserAvailable