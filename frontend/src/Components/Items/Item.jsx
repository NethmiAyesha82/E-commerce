import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const getSecureImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }
    return url;
  };

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
        <img 
          onClick={() => window.scrollTo(0, 0)} 
          src={getSecureImageUrl(props.image)} 
          alt={props.name} 
        />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          ${props.new_price}
        </div>
        <div className="item-price-old">
          ${props.old_price}
        </div>
      </div>
    </div>
  );
};

export default Item;