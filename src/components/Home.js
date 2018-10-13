import React from 'react';
import {Card, CardHeaderTitle, 
   Title, MediaLeft, Media, MediaContent, CardContent, Image,
    CardHeader} from 'bloomer'
import {lifecycle, compose, withProps, withState} from 'recompose'
import withError from '../hocs/withError'
import {connect} from '../hocs/contextProvider'
import showUntilReady from '../hocs/showUntilReady'
import Messaging from "./Messaging";

import {isPresent} from '../utils'

const Home = ({user, hasUser, error, hasError})=>{
 if(hasError) return <Messaging error={error}/>   
 return <Card>
    <CardHeader>
        <CardHeaderTitle>
            Welcome {user.name}
        </CardHeaderTitle>
    </CardHeader>
    <CardContent>
      <Media>
         <MediaLeft>
                <Image isSize='48x48' src={user.avatar_url} />
            </MediaLeft>
          <MediaContent>
              <Title isSize={3}>{user.email}</Title>
          </MediaContent>
      </Media>       
    </CardContent>
</Card> 
} 

const enhance = compose(
    withState("user","setUser", undefined),
    withError, 
    lifecycle({
        componentWillMount(){
          const {setError} = this.props  
          this.api = this.props.apiNewInstance().configure({setError})
        },
        componentDidMount(){
         this.api.getMe().then((me)=>this.props.setUser(me))
        }
   }),
  withProps(({user, error})=>({hasError: isPresent(error), hasUser: isPresent(user) })),  
  showUntilReady(props=>props.hasUser || props.hasError)
)
export default connect(enhance(Home))