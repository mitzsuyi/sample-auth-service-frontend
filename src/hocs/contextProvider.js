import PropTypes from "prop-types";
import { getContext, withContext } from "recompose";

const Provider = ({apiNewInstance,auth}) => withContext(
    {apiNewInstance: PropTypes.func, auth: PropTypes.object},
   () => ({apiNewInstance, auth})
)
  
const connect = Component => getContext(
    { apiNewInstance: PropTypes.func, auth:PropTypes.object }
)(Component)


export { Provider, connect };
