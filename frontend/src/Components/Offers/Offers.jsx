import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Offers.css';

const Offers = () => {
  const navigate = useNavigate();

  return (
    <section className="offer-section">
      <div className="offer-card">

        <div className="offer-left">
          <h2>Special Fashion Offer</h2>

          <p>
            Upgrade your wardrobe with premium quality fashion items.
            Limited-time discounts available now.
          </p>

          <div className="offer-buttons">
            <button onClick={() => navigate('/womens')}>
              Shop Women
            </button>

            <button onClick={() => navigate('/mens')}>
              Shop Men
            </button>
          </div>
        </div>

        <div className="offer-right">
          <h1>
            UP TO <span>50%</span> OFF
          </h1>
          <p>Hurry! Limited Time Only</p>
        </div>

      </div>
    </section>
  );
};

export default Offers;