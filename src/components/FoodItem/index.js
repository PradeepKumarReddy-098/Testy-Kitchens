import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {FaRupeeSign} from 'react-icons/fa'
import './index.css'

class FoodItem extends Component {
  state = {
    addBtn: true,
    quantity: 0,
  }

  componentDidMount() {
    this.checkItemInLocalStorage()
  }

  checkItemInLocalStorage = () => {
    const {food} = this.props
    const cart = JSON.parse(localStorage.getItem('cartItems')) || []
    if (cart.length > 0) {
      const checkFoodItem = cart.find(each => each.id === food.id)
      if (checkFoodItem !== undefined) {
        if (checkFoodItem.quantity > 0) {
          this.setState({addBtn: false, quantity: checkFoodItem.quantity})
        } else {
          this.setState({addBtn: true})
        }
      } else {
        this.setState({addBtn: true})
      }
    } else {
      this.setState({addBtn: true})
    }
  }

  decreaseQuantity = () => {
    const {food} = this.props
    const cartList = JSON.parse(localStorage.getItem('cartItems'))
    const updatedList = cartList.map(eachItem => {
      if (eachItem.id === food.id) {
        const newQuantity = eachItem.quantity - 1
        return {...eachItem, quantity: newQuantity}
      }
      return eachItem
    })
    const data = updatedList.filter(eachItem => eachItem.quantity >= 1)
    localStorage.setItem('cartItems', JSON.stringify(data))
    this.checkItemInLocalStorage()
  }

  increaseQuantity = () => {
    const {food} = this.props
    const cartList = JSON.parse(localStorage.getItem('cartItems'))
    const updatedList = cartList.map(eachItem => {
      if (eachItem.id === food.id) {
        const newQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: newQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartItems', JSON.stringify(updatedList))
    this.checkItemInLocalStorage()
  }

  addToCart = () => {
    const {food, restaurantId} = this.props
    const cartList = JSON.parse(localStorage.getItem('cartItems')) || []
    const updatedFood = {...food, quantity: 1, restaurantId}
    const cartData = [...cartList, updatedFood]
    localStorage.setItem('cartItems', JSON.stringify(cartData))
    console.log(JSON.parse(localStorage.getItem('cartItems')))
    this.setState({addBtn: false, quantity: 1})
  }

  render() {
    const {food} = this.props
    const {addBtn, quantity} = this.state
    return (
      <li key={food.id} className="food" data-testid="foodItem">
        <div className="food-details">
          <img src={food.imageUrl} alt="restaurant" className="food-image" />
          <div className="details-container">
            <h3>{food.name}</h3>
            <p>
              <FaRupeeSign /> {food.cost}.00
            </p>
            <p>
              <AiFillStar color="#FFCC00" />
              {food.rating}
            </p>
            {addBtn ? (
              <button
                type="button"
                className="add-btn"
                onClick={this.addToCart}
              >
                Add
              </button>
            ) : (
              <div className="increase-decrease-btn-container">
                <button
                  type="button"
                  className="quantity-btn"
                  data-testid="decrement-count"
                  onClick={this.decreaseQuantity}
                >
                  -
                </button>
                <p className="quantity" data-testid="active-count">
                  {quantity}
                </p>
                <button
                  type="button"
                  className="quantity-btn"
                  data-testid="increment-count"
                  onClick={this.increaseQuantity}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </li>
    )
  }
}

export default FoodItem
