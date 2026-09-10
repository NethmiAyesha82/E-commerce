import React, { useContext, useEffect, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Items/Item'

const ShopCategory = (props) => {
  const { all_product, fetchProducts } = useContext(ShopContext)
  const [sortOrder, setSortOrder] = useState("default")

  useEffect(() => {
    if (fetchProducts) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category]);

  let filteredProducts = all_product.filter(
    (item) => props.category === item.category
  )

  if (sortOrder === "lowToHigh") {
    filteredProducts.sort((a, b) => a.new_price - b.new_price)
  } else if (sortOrder === "highToLow") {
    filteredProducts.sort((a, b) => b.new_price - a.new_price)
  }

  const getBannerDetails = () => {
    switch(props.category) {
      case "men":
        return { title: "MEN'S COLLECTION", desc: "Upgrade your style with premium essentials" };
      case "women":
        return { title: "WOMEN'S TRENDS", desc: "Discover elegance in every single detail" };
      case "kids":
        return { title: "KIDS' FASHION", desc: "Comfortable and playful styles for little ones" };
      default:
        return { title: "EXCLUSIVE DESIGNS", desc: "Flat 50% OFF on all trending items" };
    }
  }

  const bannerInfo = getBannerDetails();

  return (
    <div className='shop-category'>
      
      <div className="shopcategory-banner">
        <div className="shopcategory-banner-text">
          <h2>{bannerInfo.title}</h2>
          <h1>FLAT <span>50% OFF</span></h1>
          <p>{bannerInfo.desc}</p>
          <button>SHOP THE SALE</button>
        </div>
        
        {props.banner && (
          <div className="shopcategory-banner-image">
            <img src={props.banner} alt={`${props.category} banner`} />
          </div>
        )}
      </div>

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{filteredProducts.length}</span> out of {filteredProducts.length} products
        </p>

        <select
          className="shopcategory-sort"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="default">Default</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
          <Item
            key={item._id || item.id || i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory