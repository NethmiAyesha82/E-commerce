import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>ESTABLISHED 2026</h2>
        <div>
          <div className="hero-hand-icon">
            <p>NEW</p>
            <img src={hand_icon} alt="hand icon" />
          </div>
          <p>ARRIVALS</p>
          <p>FOR ALL</p>
        </div>
        <div className="hero-latest-btn">
          <Link to='/mens' style={{ textDecoration: 'none' }}>
            <button>
              SHOP NOW
              <img src={arrow_icon} alt="arrow" />
            </button>
          </Link>
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="model" />
      </div>
    </div>
  )
}

export default Hero