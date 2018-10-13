import {withState, compose} from 'recompose'

const withLoading = compose(
  withState("isLoading", "setLoading", false)
)

export default withLoading