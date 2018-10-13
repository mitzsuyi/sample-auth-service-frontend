import React from 'react';
import {Box, Content, Icon} from 'bloomer'

import { Link } from "react-router-dom";

const NotFound = ()=>(
<Box>
    <Content>
        <h1>It sometimes happens we lose our way. <Icon icon="meh"></Icon></h1>
        <Content hasTextColor="success">Have no fear, follow {<Link to="/">me</Link>} to get back on your feet!<Icon icon="smile"></Icon></Content>
    </Content>
</Box>
)

export default NotFound 