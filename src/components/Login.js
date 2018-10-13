import React from "react";
import {
  Control,
  Level,
  LevelLeft,
  Help,
  LevelRight,
  CardContent,
  CardHeader,
  Card,
  CardHeaderTitle,
  Field,
  Icon,
  Label,
} from "bloomer";

import {withState, compose, withHandlers} from 'recompose'
import { Link, withRouter } from "react-router-dom";
import FormInput from './form/FormInput'

import {validatePassword, validateEmail} from './form/helpers'
import {connect} from '../hocs/contextProvider'
import FormError from './form/FormError'
import withForm from '../hocs/withForm'
import SubmitButton from './form/SubmitButton'
import Messaging from "./Messaging";

const Login = ({setEmail, isLoading, error, message, setPassword, errors={}, isValid, submitForm}) => (
  <Card>
    <CardHeader>
      <CardHeaderTitle>Login Form</CardHeaderTitle>
    </CardHeader>
    <CardContent>
      <Messaging error={error} message={message} /> 
      <Field>
        <Label>Email</Label>
        <Control hasIcons>
          <FormInput  type="email" errors={errors.email} onChange={setEmail} />
          <Icon isSize="small" isAlign="left">
            <span className="fa fa-envelope" aria-hidden="true" />
          </Icon>
        </Control>
        <FormError error={errors.email}/>
      </Field>

      <Field>
        <Label>Password</Label>
        <Control hasIcons>
          <FormInput type="password" errors={errors.password} onChange={setPassword} />
          <Icon isSize="small" isAlign="left">
            <span className="fa fa-lock" aria-hidden="true" />
          </Icon>
        </Control>
        <FormError error={errors.password}/>
      </Field>

      <Field>
        <Level>
          <LevelLeft>
            <Control> 
              <SubmitButton isLoading={isLoading} isValid={isValid} onClick={submitForm}  isColor="primary">Submit</SubmitButton>                
            </Control>
          </LevelLeft>
          <LevelRight>
            <Help>
              <Link to="/register">
               <span className="is-italic">
                   Don't have an account?
               </span> Register</Link>
            </Help>
          </LevelRight>
        </Level>
      </Field>
    </CardContent>
  </Card>
);

const enhance = compose(
    withState("password","setPassword", "Test12345"),
    withState("email","setEmail", "admin555@example.com"),
    withHandlers({
      getValidations: ({email, password}) => () => [validateEmail(email), validatePassword(password)],  
   }), 
    withForm, 
    withHandlers({
      submitForm: ({api, email, location, history, password, auth}) => (event) => {
        event.preventDefault()
        const { from } = location.state || { from: { pathname: "/" } };
        api.login({email, password})
        .then((authorization)=>auth.setAuthorization(authorization))
        .then(()=> history.push(from))
      }  
    }),
    withRouter
)

export default connect(enhance(Login));
