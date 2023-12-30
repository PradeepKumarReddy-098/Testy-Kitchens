import {
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaPinterestSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-logo-name-conteiner">
      <img
        src="https://res.cloudinary.com/dvhdil4k3/image/upload/v1696570679/Frame_275_h0vp8m.png"
        alt="website-footer-logo"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="footer-para">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="footer-icons-container">
      <FaPinterestSquare
        className="social-icon"
        data-testid="pintrest-social-icon"
      />
      <FaInstagram
        className="social-icon"
        data-testid="instagram-social-icon"
      />
      <FaTwitter className="social-icon" testid="twitter-social-icon" />
      <FaFacebookSquare className="social-icon" testid="facebook-social-icon" />
    </div>
  </div>
)

export default Footer
