import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import './index.css'

const RestaurantItem = props => {
  const {eachRestaurant} = props
  const {cuisine, id, imageUrl, name, userRating} = eachRestaurant
  return (
    <Link className="restaurant-link" to={`/restaurant/${id}`}>
      <li key={id} className="restaurant-item" data-testid="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="reastaurant-image" />
        <div className="restaurant-details">
          <h3 className="restaurant-name">{name}</h3>
          <p className="paragraph">{cuisine}</p>
          <div className="rating-details">
            <AiFillStar className="rating-star" />
            <p className="rating-value">{userRating.rating}</p>
            <p className="paragraph">({userRating.totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
