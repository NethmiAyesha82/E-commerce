import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className="benefits-container">
      <div className="benefits">
        <div className="benefit-card">
          <span>🚚</span>
          <h3>Free Shipping</h3>
          <p>Enjoy free delivery on all orders above $50.</p>
        </div>

        <div className="benefit-card">
          <span>💳</span>
          <h3>Secure Payment</h3>
          <p>100% safe and trusted payment methods.</p>
        </div>

        <div className="benefit-card">
          <span>🔄</span>
          <h3>Easy Returns</h3>
          <p>Hassle-free returns within 30 days.</p>
        </div>

        <div className="benefit-card">
          <span>🎁</span>
          <h3>Special Offers</h3>
          <p>Get exclusive deals and member discounts.</p>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter