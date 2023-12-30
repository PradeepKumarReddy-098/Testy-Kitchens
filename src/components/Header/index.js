import Popup from 'reactjs-popup'
import {Link, withRouter} from 'react-router-dom'
import {VscThreeBars} from 'react-icons/vsc'
import {RiCloseCircleFill} from 'react-icons/ri'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <div className="logo-website">
        <img
          src="https://res.cloudinary.com/dvhdil4k3/image/upload/v1696265328/Frame_274_kbcquw.png"
          alt="website logo"
        />
        <h1 className="website-heading">Testy Kitchen</h1>
      </div>
      <div className="menu-button-container">
        <Popup
          modal
          trigger={
            <button type="button" className="menu-button">
              <VscThreeBars fontSize={20} />.
            </button>
          }
        >
          {close => (
            <div className="menu-options-popup">
              <div className="menu-options">
                <Link to="/" className="link">
                  <p>Home</p>
                </Link>
                <Link className="color-text link" to="/cart">
                  Cart
                </Link>
                <button
                  className="logout-button"
                  type="button"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
              <button
                type="button"
                className="menu-button"
                onClick={() => close()}
              >
                <RiCloseCircleFill fontSize={20} />.
              </button>
            </div>
          )}
        </Popup>
      </div>
      <div className="nav-options">
        <Link to="/" className="link color-text">
          Home
        </Link>
        <Link to="/cart" className="link">
          Cart
        </Link>
        <button type="button" className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
