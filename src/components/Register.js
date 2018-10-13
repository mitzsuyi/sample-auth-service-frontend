import React from "react";
import {
  Control,
  Level,
  LevelLeft,
  CardContent,
  CardHeader,
  Card,
  CardHeaderTitle,
  Field,
  Icon,
  Label,
  Help,
  Content,
  LevelRight
} from "bloomer";

import { Link } from "react-router-dom";

import LoadingButton from './form/LoadingButton'

import withForm from '../hocs/withForm'
import {validatePassword, validateEmail, validateName} from './form/helpers'
import {withState, compose,  withHandlers} from 'recompose'
import {connect} from '../hocs/contextProvider'
import FormInput from './form/FormInput'
import FormError from './form/FormError'
import Messaging from "./Messaging";

const SuccessulMessage = props => <Content>
You have successfully registered.  Proceed to <Link to="/login">Login</Link>
</Content>

const Register = ({setEmail, setPassword, isLoading, setName,email, password, name, error, message, errors={}, isValid=false, submitForm}) => (
  <Card>
    <CardHeader>
      <CardHeaderTitle>Register Form</CardHeaderTitle>
    </CardHeader>
    <CardContent>
        <form autoComplete="auto complete">
      <Messaging error={error} message={message} />
      <Field>
        <Label>Name</Label>
        <Control hasIcons>
          <FormInput type="name" errors={errors.name} value={name} onChange={setName} />
        </Control>
        <FormError error={errors.name}/>
      </Field>
     <Field>
        <Label>Email</Label>
        <Control hasIcons>
          <FormInput type="email" autoComplete="off" errors={errors.email} value={email} onChange={setEmail} />
          <Icon isSize="small" isAlign="left">
            <span className="fa fa-envelope" aria-hidden="true" />
          </Icon>
        </Control>
        <FormError error={errors.email}/>

      </Field>

      <Field>
        <Label>Password</Label>
        <Control hasIcons>
          <FormInput type="password" autoComplete="off" errors={errors.password} value={password} onChange={setPassword} />
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
              <LoadingButton isLoading={isLoading} onClick={submitForm}  isColor="primary" isStatic={!isValid || (isValid &&isLoading)}>Submit</LoadingButton>
            </Control>
          </LevelLeft>
          <LevelRight>
            <Help>
              <Link to="/login">Login</Link>
            </Help>
          </LevelRight>
        </Level>
      </Field>
  </form>
    </CardContent>
  </Card>
);

const enhance = compose(
    withState("password","setPassword", ""),
    withState("email","setEmail", ""),
    withState("name","setName", ""),
     withHandlers({
      getValidations: ({email, password, name}) => () => [validateEmail(email), validatePassword(password), validateName(name)]
    }), 
    withForm,
    withHandlers({
      submitForm: ({api, email, name, password, setSuccess}) => (event) => {
        event.preventDefault(); 
        api.createUser({email, name, password}).then((authorization)=>{
            setSuccess(<SuccessulMessage />)
        }) 
      }
    }),
)

export default connect(enhance(Register));