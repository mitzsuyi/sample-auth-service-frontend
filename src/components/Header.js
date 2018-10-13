import React from 'react';

import {Navbar, NavbarBrand, NavbarItem, NavbarEnd} from 'bloomer'
import { Link} from "react-router-dom";
import {connect} from '../hocs/contextProvider'

const TITLE="Sample Auth Service Frontend"

const Header = ({auth})=>(
<Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }}>
    <NavbarBrand>
      <NavbarItem>
        <Link to="/">
            {TITLE}
         </Link>   
        </NavbarItem>  
    </NavbarBrand>
    {auth.isAuthenticated &&
     <NavbarEnd>
         <NavbarItem>
            <Link to="/logout">Logout</Link>
         </NavbarItem>
     </NavbarEnd>
    }
  </Navbar>
)
export default connect(Header)

