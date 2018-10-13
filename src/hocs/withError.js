import {withState, compose} from 'recompose'

const withError = compose(
  withState("error", "setError", undefined)
)

export default withError