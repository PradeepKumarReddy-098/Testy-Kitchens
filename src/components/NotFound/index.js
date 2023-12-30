import {Link} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const gotoHomePage = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="Not-Found-container">
      <img
        src="https://res.cloudinary.com/dvhdil4k3/image/upload/v1696318770/erroring_1_r0zrrs.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found.
      </p>
      <p className="not-found-para">Please go back to homepage</p>
      <Link to="/" className="link">
        <button
          type="button"
          className="go-home-page-btn"
          onClick={gotoHomePage}
        >
          Home Page
        </button>
      </Link>
    </div>
  )
}

export default NotFound
