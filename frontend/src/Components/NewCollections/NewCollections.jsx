import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import Item from '../Items/Item';

const BASE_URL = "https://e-commerce-five-snowy-66.vercel.app";

const NewCollections = () => {
  const [new_collections, setNew_collection] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/newcollections`)
      .then((response) => response.json())
      .then((data) => setNew_collection(data))
      .catch((error) => console.error("Error fetching new collections:", error));
  }, []);

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;