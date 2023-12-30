import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {FaRupeeSign} from 'react-icons/fa'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'
import './index.css'

const restaurantFoodItemsView = {
  initial: 'Initial',
  inprogress: 'InProgress',
  success: 'Success',
  failure: 'Failure',
}

class RestaurantFoodItems extends Component {
  state = {
    viewStatus: restaurantFoodItemsView.initial,
    menuDetails: [],
  }

  componentDidMount() {
    this.getFoodItemsData()
  }

  getFoodItemsData = async () => {
    const {match} = this.props
    const {id} = match.params
    this.setState({
      viewStatus: restaurantFoodItemsView.inprogress,
    })
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list/${id}`,
      options,
    )
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        foodItems: data.food_items.map(each => ({
          cost: each.cost,
          foodType: each.food_type,
          id: each.id,
          imageUrl: each.image_url,
          name: each.name,
          rating: each.rating,
        })),
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }
      this.setState({
        menuDetails: updatedData,
        viewStatus: restaurantFoodItemsView.success,
      })
    }
  }

  loaderView = () => (
    <div className="menu-spinner" data-testid="restaurant-details-loader">
      <Loader type="TailSpin" color="#ffcc00" height="50" width="50" />
    </div>
  )

  restaurantFoodDetailView = () => {
    const {menuDetails} = this.state
    const {
      costForTwo,
      cuisine,
      foodItems,
      id,
      imageUrl,
      location,
      name,
      rating,
      reviewsCount,
    } = menuDetails
    return (
      <div className="container">
        <div className="food-details-container">
          <div className="restaurant-banner">
            <img src={imageUrl} alt="restaurant" className="restaurant-image" />
            <div>
              <h2>{name}</h2>
              <p>{cuisine}</p>
              <p>{location}</p>
              <div className="reviews-cost-container">
                <div>
                  <p>
                    <AiFillStar /> {rating}
                  </p>
                  <p>{reviewsCount} Ratings</p>
                </div>
                <hr className="vertical-line" />
                <div>
                  <p>
                    <FaRupeeSign />
                    {costForTwo}
                  </p>
                  <p>Cost For Two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="food-items-container">
          <ul className="food-items">
            {foodItems.map(food => (
              <FoodItem restaurantId={id} food={food} key={food.id} />
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  foodDetailView = () => {
    const {viewStatus} = this.state
    switch (viewStatus) {
      case restaurantFoodItemsView.inprogress:
        return this.loaderView()
      case restaurantFoodItemsView.success:
        return this.restaurantFoodDetailView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="restaurant-food-Items">
        <Header />
        {this.foodDetailView()}
      </div>
    )
  }
}

export default RestaurantFoodItems
