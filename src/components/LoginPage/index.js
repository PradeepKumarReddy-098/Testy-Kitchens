import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    error: false,
    errorMsg: '',
  }

  changeUserName = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = data => {
    const {history} = this.props
    Cookies.set('jwt_token', data.jwt_token, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = msg => {
    this.setState({error: true, errorMsg: msg})
  }

  submitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  userDetailsForm = () => {
    const {username, password, error, errorMsg} = this.state
    return (
      <form className="login-form">
        <div>
          <label htmlFor="username" className="input-label">
            USERNAME
          </label>
          <br />
          <input
            value={username}
            type="text"
            id="username"
            placeholder="Enter Your Username..."
            className="input-element"
            onChange={this.changeUserName}
          />
          <br />
        </div>
        <div>
          <label htmlFor="password" className="input-label">
            PASSWORD
          </label>
          <br />
          <input
            value={password}
            type="password"
            placeholder="Enter Your Password..."
            id="password"
            className="input-element"
            onChange={this.changePassword}
          />
          <br />
        </div>
        {error && <p className="error-msg">{errorMsg}</p>}
        <button type="button" className="login-btn" onClick={this.submitLogin}>
          Login
        </button>
      </form>
    )
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="login-sm-container">
          <img
            src="https://res.cloudinary.com/dvhdil4k3/image/upload/v1696256621/Rectangle_1457_1_nmaw8f.png"
            alt="website login"
            className="login-food-image"
          />
          <div className="login-container">
            <h1>Login</h1>
            {this.userDetailsForm()}
          </div>
        </div>
        <div className="login-lg-container">
          <div className="login-side">
            <div className="login-info-container">
              <div className="login-logo-heading">
                <img
                  src="https://res.cloudinary.com/dvhdil4k3/image/upload/v1696265328/Frame_274_kbcquw.png"
                  alt="website logo"
                />
                <h1 className="testy-kitchen-heading">Testy Kitchen</h1>
                <h1>Login</h1>
              </div>
              {this.userDetailsForm()}
            </div>
          </div>
          <img
            src="https://res.cloudinary.com/dvhdil4k3/image/upload/v1696304538/Rectangle_1456_tnfmge.png"
            alt="website login"
            className="side-image"
          />
        </div>
      </div>
    )
  }
}

export default LoginPage
