import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaRupeeSign} from 'react-icons/fa'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class Cart extends Component {
  state = {
    cartList: JSON.parse(localStorage.getItem('cartItems')) || [],
    showPaymentView: false,
  }

  orderNow = () => {
    const {history} = this.props
    history.replace('/')
  }

  increaseQuantity = id => {
    const {cartList} = this.state
    const cartData = cartList.map(each => {
      if (each.id === id) {
        const updateQuantity = each.quantity + 1
        return {...each, quantity: updateQuantity}
      }
      return each
    })
    localStorage.setItem('cartItems', JSON.stringify(cartData))
    this.setState({cartList: JSON.parse(localStorage.getItem('cartItems'))})
  }

  decreaseQuantity = id => {
    const {cartList} = this.state
    const cartData = cartList.map(each => {
      if (each.id === id) {
        const updateQuantity = each.quantity - 1
        return {...each, quantity: updateQuantity}
      }
      return each
    })
    const cart = cartData.filter(each => each.quantity >= 1)
    localStorage.setItem('cartItems', JSON.stringify(cart))
    this.setState({cartList: JSON.parse(localStorage.getItem('cartItems'))})
  }

  paymentView = () => (
    <div className="payments-section">
      <img
        src="https://res.cloudinary.com/dvhdil4k3/image/upload/v1697696803/check-circle.1_1_nignfg.png"
        alt="order"
      />
      <h2>Payment Successful</h2>
      <p className="payment-para">Thank you for ordering</p>
      <p className="payment-para">Your payment is successfully completed.</p>
      <button type="button" onClick={this.orderNow} className="payment-btn">
        Go To Home
      </button>
    </div>
  )

  placeOrder = () => {
    this.setState({showPaymentView: true})
    localStorage.removeItem('cartItems')
  }

  cartView = () => {
    const {cartList} = this.state
    if (cartList.length !== 0) {
      const totalCost = cartList.map(each => each.cost * each.quantity)
      const totalAmount = totalCost.reduce((a, b) => a + b)
      return (
        <div className="cart-view-container">
          <ul className="cart-container">
            <li className="cart-headings-container">
              <p className="cart-line">Item</p>
              <p className="cart-line">Quantity</p>
              <p className="cart-line">Price</p>
            </li>
            {cartList.map(eachItem => (
              <li
                className="cart-items-list"
                key={eachItem.id}
                data-testid="cartItem"
              >
                <div className="cart-lg-container">
                  <div className="img-name-container">
                    <Link
                      to={`/restaurant/${eachItem.restaurantId}`}
                      className="to-restantent"
                    >
                      <img
                        src={eachItem.imageUrl}
                        alt="food"
                        className="cart-image"
                      />
                    </Link>
                    <p className="item-name-img">{eachItem.name}</p>
                  </div>
                  <div className="cart-btns-container">
                    <button
                      type="button"
                      className="decrease-btn"
                      onClick={() => this.decreaseQuantity(eachItem.id)}
                    >
                      -
                    </button>
                    <p className="cart-quantity">{eachItem.quantity}</p>
                    <button
                      type="button"
                      className="increase-btn"
                      onClick={() => this.increaseQuantity(eachItem.id)}
                    >
                      +
                    </button>
                  </div>
                  <p className="item-price">
                    <FaRupeeSign /> {eachItem.cost * eachItem.quantity}.00
                  </p>
                </div>
                <div className="cart-sm-container">
                  <img
                    src={eachItem.imageUrl}
                    alt="food"
                    className="cart-image"
                  />
                  <div className="cart-item-details">
                    <p>{eachItem.name}</p>
                    <div className="cart-btns-container">
                      <button
                        type="button"
                        className="decrease-btn"
                        onClick={() => this.decreaseQuantity(eachItem.id)}
                      >
                        -
                      </button>
                      <p className="cart-quentity" data-testid="item-quantity">
                        {eachItem.quantity}
                      </p>
                      <button
                        type="button"
                        className="increase-btn"
                        onClick={() => this.increaseQuantity(eachItem.id)}
                      >
                        +
                      </button>
                    </div>
                    <p className="item-price">
                      <FaRupeeSign /> {eachItem.cost * eachItem.quantity}.00
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <hr className="line" />
          <div className="total-amount-section">
            <div className="total-order-details">
              <p>Order Total</p>
              <div>
                <p>
                  <FaRupeeSign /> {totalAmount}.00
                </p>
                <button
                  type="button"
                  className="payment-btn"
                  onClick={this.placeOrder}
                  data-testid="total-price"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )
    }
    return (
      <div className="empty-cart-container">
        <img
          src="https://res.cloudinary.com/dvhdil4k3/image/upload/v1697520387/cooking_1_k3k1du.png"
          alt="empty cart"
        />
        <h1>No Orders Yet!</h1>
        <p>Your cart is empty. Add something from the menu.</p>
        <button type="button" className="order-now-btn" onClick={this.orderNow}>
          Order Now
        </button>
      </div>
    )
  }

  render() {
    const {showPaymentView} = this.state
    return (
      <div>
        <Header />
        {showPaymentView ? this.paymentView() : this.cartView()}
      </div>
    )
  }
}

export default Cart
