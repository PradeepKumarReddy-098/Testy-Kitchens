import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdOutlineSort} from 'react-icons/md'
import {FcSearch} from 'react-icons/fc'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Header from '../Header'
import RestaurantItem from '../RestaurantItem'
import Counter from '../Counter'
import Footer from '../Footer'
import './index.css'

const restaurantsViewProgress = {
  initial: 'Initial',
  inprogress: 'Inprogress',
  success: 'Success',
  failure: 'Failure',
}
const sliderViewProgress = {
  initial: 'Initial',
  inprogress: 'Inprogress',
  success: 'Success',
  failure: 'Failure',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    sliderView: sliderViewProgress.initial,
    restaurants: restaurantsViewProgress.initial,
    currentPage: 1,
    sliderData: [],
    restaurantsData: [],
    sortBy: '',
    searchInput: '',
    errorMsg: '',
  }

  componentDidMount() {
    this.getSliderData()
    this.getRestaurantsData()
  }

  changeSortOption = event => {
    this.setState({sortBy: event.target.value}, this.getRestaurantsData)
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  search = () => {
    this.getRestaurantsData()
  }

  getRestaurantsData = async () => {
    const {currentPage, sortBy, searchInput} = this.state
    this.setState({restaurants: restaurantsViewProgress.inprogress})
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const LIMIT = 9
    const offset = (currentPage - 1) * LIMIT
    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${LIMIT}&sort_by_rating=${sortBy}`,
      options,
    )
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.restaurants.map(eachItem => ({
        costForTwo: eachItem.cost_for_two,
        cuisine: eachItem.cuisine,
        groupByTime: eachItem.group_by_time,
        hasOnlineDelivery: eachItem.has_online_delivery,
        hasTableBooking: eachItem.has_table_booking,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        isDeliveringNow: eachItem.is_delivering_now,
        location: eachItem.location,
        menuType: eachItem.menu_type,
        name: eachItem.name,
        opensAt: eachItem.opens_at,
        userRating: {
          rating: eachItem.user_rating.rating,
          ratingColor: eachItem.user_rating.rating_color,
          ratingText: eachItem.user_rating.rating_text,
          totalReviews: eachItem.user_rating.total_reviews,
        },
      }))
      this.setState({
        restaurants: restaurantsViewProgress.success,
        restaurantsData: updatedData,
      })
    } else {
      this.setState({
        restaurants: restaurantsViewProgress.failure,
        errorMsg: data.error_message,
      })
    }
  }

  changeActivePage = pgNum => {
    this.setState({currentPage: pgNum}, this.getRestaurantsData)
  }

  getSliderData = async () => {
    this.setState({sliderView: sliderViewProgress.inprogress})
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.offers.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
      }))
      this.setState({
        sliderView: sliderViewProgress.success,
        sliderData: updatedData,
      })
    }
  }

  sliderView = () => {
    const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    const {sliderData} = this.state
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {sliderData.map(eachItem => (
            <div key={eachItem.id} className="offer-image-container">
              <img
                src={eachItem.imageUrl}
                alt="offer"
                className="offer-image"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  sliderDisplayLoading = () => (
    <div className="slider-loader" data-testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#f5f2e4" height="50" width="50" />
    </div>
  )

  loaderView = () => (
    <div className="spinner" data-testid="restaurants-list-loader">
      <Loader type="TailSpin" color="#ffcc00" height={60} width={60} />
    </div>
  )

  restaurantsView = () => {
    const {searchInput, restaurantsData, sortBy} = this.state
    return (
      <div>
        <h2 className="popular-restaurants-heading">Popular Restaurants</h2>
        <div className="sort-options-container">
          <p className="popular-restaurants-para">
            Select your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="sort-container">
            <MdOutlineSort className="sort-icon" />
            <span>sort by</span>
            <select
              className="select-sortby"
              value={sortBy}
              onChange={this.changeSortOption}
            >
              {sortByOptions.map(each => (
                <option value={each.value} id={each.id} key={each.id}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr className="hr" />
        <div className="search-container">
          <input
            type="search"
            value={searchInput}
            placeholder="Search Restaurant..."
            onChange={this.changeSearchInput}
            className="search"
          />
          <button type="button" onClick={this.search} className="search-btn">
            <FcSearch />.
          </button>
        </div>
        <div className="restaurants-container">
          <ul className="restaurants-list">
            {restaurantsData.map(eachRestaurant => (
              <RestaurantItem
                eachRestaurant={eachRestaurant}
                key={eachRestaurant.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  refresh = () => {
    this.setState({searchInput: '', currentPage: 1}, this.getRestaurantsData)
  }

  failureView = () => {
    const {errorMsg} = this.state
    return (
      <div className="failure-view">
        <h1>{errorMsg}...</h1>
        <button type="button" className="retry-btn" onClick={this.refresh}>
          Refresh
        </button>
      </div>
    )
  }

  getSliderView = () => {
    const {sliderView} = this.state
    switch (sliderView) {
      case sliderViewProgress.inprogress:
        return this.sliderDisplayLoading()
      case sliderViewProgress.success:
        return this.sliderView()
      default:
        return null
    }
  }

  getRestaurantsView = () => {
    const {restaurants} = this.state
    switch (restaurants) {
      case restaurantsViewProgress.inprogress:
        return this.loaderView()
      case restaurantsViewProgress.success:
        return this.restaurantsView()
      case restaurantsViewProgress.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {restaurants, currentPage} = this.state
    return (
      <div className="con">
        <Header />
        <div className="home-container">
          {this.getSliderView()}
          {this.getRestaurantsView()}
          {restaurants === restaurantsViewProgress.success && (
            <Counter
              currentPgNum={this.changeActivePage}
              currentPage={currentPage}
            />
          )}
        </div>
        {restaurants === restaurantsViewProgress.success && <Footer />}
      </div>
    )
  }
}

export default Home
