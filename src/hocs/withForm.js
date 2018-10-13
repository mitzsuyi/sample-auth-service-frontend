import withFormValidation from '../hocs/withFormValidation'
import {compose, withState, withHandlers, lifecycle} from 'recompose'
import withLoading from '../hocs/withLoading'
import withError from '../hocs/withError'
import withMessage from '../hocs/withMessage'

const withForm = compose(
    withLoading,
    withMessage,
    withError,
    withState("api","setApi", undefined),
    withHandlers({
      setDanger: ({ setError, setMessage }) => error => {
       if(setMessage) setMessage(undefined);
       setError(error);
      },
      setSuccess: ({ setError, setMessage }) => message => {
        if(setError) setError(null);
        setMessage(message);
     }
    }),
    lifecycle({
        componentWillReceiveProps(prevProps, prevState) {
           if (!this.props.api) {
             this.props.setApi(this.api)
           }
        }, 
        componentWillMount(){
          const {setError, setLoading} = this.props  
          this.api = this.props.apiNewInstance().configure({setError, setLoading})
        }
    }),  
    withFormValidation
)

export default withForm