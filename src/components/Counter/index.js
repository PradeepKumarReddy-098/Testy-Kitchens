import {Component} from 'react'

import './index.css'

class Counter extends Component {
  onDecrement = () => {
    const {currentPgNum, currentPage} = this.props
    if (currentPage > 1) {
      currentPgNum(currentPage - 1)
    }
  }

  onIncrement = () => {
    const {currentPgNum, currentPage} = this.props
    if (currentPage <= 3) {
      currentPgNum(currentPage + 1)
    }
  }

  render() {
    const {currentPage} = this.props
    // console.log(currentPage)
    return (
      <div className="counter-container">
        <button
          type="button"
          onClick={this.onDecrement}
          data-testid="pagination-left-button"
          className="page-change-btn"
        >
          -
        </button>
        <div>
          <span data-testid="active-page-number">{currentPage}</span> of 4
        </div>
        <button
          type="button"
          onClick={this.onIncrement}
          data-testid="pagination-right-button"
          className="page-change-btn"
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
