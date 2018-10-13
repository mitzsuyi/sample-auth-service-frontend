import {withState, compose} from 'recompose'

const withMessage = compose(
  withState("message", "setMessage", null)
)

export default withMessage