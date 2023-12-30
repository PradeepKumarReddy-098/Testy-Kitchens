import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const AuthorizationRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Route {...props} />
  }
  return <Redirect to="/login" />
}

export default AuthorizationRoute
