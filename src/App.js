// import logo from './logo.svg';
import {Switch, Route, Redirect} from 'react-router-dom'
import AuthorizationRoute from './components/AuthorizationRoute'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import NotFound from './components/NotFound'
import RestaurantFoodItems from './components/RestaurantFoodItems'
import Cart from './components/Cart'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <AuthorizationRoute exact path="/" component={Home} />
    <AuthorizationRoute
      exact
      path="/restaurant/:id"
      component={RestaurantFoodItems}
    />
    <AuthorizationRoute exact path="/cart" component={Cart} />
    <AuthorizationRoute exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
