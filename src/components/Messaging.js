import React from 'react';
import {Notification, Delete} from 'bloomer'

import {compose, withState, withProps, withHandlers, lifecycle} from 'recompose'

const MESSAGE_DURATION = 9000
const HIDE="hide"

const resetTimeout = function(){
    if(!this.props.autoHide) return
    clearTimeout(this.timeoutHandler)
    this.timeoutHandler = setTimeout(()=>{
       if (this._mounted) {
        this.hide = true
        this.props.setHidden(true)
        }  
    }, MESSAGE_DURATION)
}

const Message = compose(
    withState("isHidden", "setHidden", false),
    withHandlers({
        hide: props => () => {
            props.setHidden(HIDE)
        }
    }),
    lifecycle({
      componentDidMount(){
        this._mounted = true
        resetTimeout.call(this)
      },
      componentWillReceiveProps(nextProps){
        if(nextProps.isHidden === HIDE){
            this.setState({isHidden:true})
        } else if (this.hide===false){
            resetTimeout.call(this)
            this.setState({isHidden:false})
       }
      },
      componentDidUpdate(){
        this.hide = false
      },
      componentWillUnmount(){
        this._mounted = false
        clearTimeout(this.timeoutHandler)
      }
    }),
)(({message, color, isHidden, hide})=>(
   <Notification isColor={color} isHidden={isHidden}>
    <Delete onClick={hide}/>
    {message}
   </Notification>
))

const ColoredMessage = (color,autoHide) => props => <Message autoHide={autoHide} {...props} color={color}/>
const Danger = ColoredMessage("danger")
const Success = ColoredMessage("success", false)

const Messaging = ({isError, isMessage, message, error})=>{
   if(isError) return <Danger message={error}/>
   if(isMessage) return <Success message={message}/>
   return null
}
    
const enhance = compose(
 withProps(({message, error})=>{
   const isError = error ? true : false 
   return  {
    isError: isError,
    isMessage: !isError  && message && (message.length > 0||Object.keys(message).length)
   }  
 })
)

export default enhance(Messaging)
export {
    Danger
}