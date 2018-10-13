import React from 'react';

import {Button, Level, LevelLeft, LevelRight} from 'bloomer'

import ReactLoading from 'react-loading';

const LoadingButton = ({isLoading, ...props})=>(
    <Level>
        <LevelLeft><Button {...props} /></LevelLeft>
        {isLoading && <LevelRight>
            <ReactLoading type="bars" color="green"/>
        </LevelRight>}
    </Level>
)

export default LoadingButton

